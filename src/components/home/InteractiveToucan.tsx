"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const SIZE = 200;
const PADDING = 16;
const CLICK_SPEED = 480;
const PATROL_SPEED = 90;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

async function removeWhiteBackgroundFromLottie(rawData: Record<string, unknown>) {
  const data = structuredClone(rawData) as {
    assets?: Array<{ p?: string; e?: number }>;
  };
  const assets = data.assets ?? [];

  const tasks = assets
    .filter((asset) => typeof asset.p === "string" && asset.p.startsWith("data:image"))
    .map(
      (asset) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            try {
              const canvas = document.createElement("canvas");
              canvas.width = img.naturalWidth || img.width;
              canvas.height = img.naturalHeight || img.height;
              const ctx = canvas.getContext("2d");
              if (!ctx) return resolve();

              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const pixels = imageData.data;

              for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3];

                const isNearWhite = r > 238 && g > 238 && b > 238;
                if (isNearWhite) {
                  pixels[i + 3] = 0;
                } else if (r > 220 && g > 220 && b > 220) {
                  // 半透明过渡，避免鸟边缘发白锯齿。
                  pixels[i + 3] = Math.round(a * 0.25);
                }
              }

              ctx.putImageData(imageData, 0, 0);
              asset.p = canvas.toDataURL("image/png");
              asset.e = 1;
            } catch {
              // ignore and keep original asset
            } finally {
              resolve();
            }
          };
          img.onerror = () => resolve();
          img.src = asset.p!;
        }),
    );

  await Promise.all(tasks);
  return data;
}

export function InteractiveToucan() {
  const [position, setPosition] = useState({ x: 0, y: 0, tilt: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [facing, setFacing] = useState<1 | -1>(1);
  const [moving, setMoving] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [flightDuration, setFlightDuration] = useState(2.2);
  const latestTargetRef = useRef({ x: 0, y: 0 });
  const latestPosRef = useRef({ x: 0, y: 0 });
  const mountedRef = useRef(false);

  const getBoundedPoint = (x: number, y: number) => {
    if (typeof window === "undefined") return { x, y };
    const maxX = window.innerWidth - SIZE - PADDING;
    const maxY = window.innerHeight - SIZE - PADDING;
    return {
      x: clamp(x, PADDING, maxX),
      y: clamp(y, PADDING, maxY),
    };
  };

  const pickPatrolTarget = () => {
    if (typeof window === "undefined") return latestTargetRef.current;
    const spanX = window.innerWidth - SIZE - PADDING * 2;
    const spanY = window.innerHeight - SIZE - PADDING * 2;
    const from = latestPosRef.current;

    for (let i = 0; i < 10; i += 1) {
      const candidate = {
        x: Math.random() * spanX + PADDING,
        y: Math.random() * spanY + PADDING,
      };
      if (distance(from, candidate) > 220) return candidate;
    }
    return {
      x: Math.random() * spanX + PADDING,
      y: Math.random() * spanY + PADDING,
    };
  };

  const moveTo = (x: number, y: number, speed = PATROL_SPEED) => {
    const bounded = getBoundedPoint(x, y);
    const from = latestPosRef.current;
    const dx = bounded.x - from.x;
    const duration = clamp(distance(from, bounded) / speed, 1.4, 5.2);
    if (Math.abs(dx) > 10) {
      setFacing(dx >= 0 ? 1 : -1);
    }
    latestTargetRef.current = bounded;
    setFlightDuration(duration);
    setTarget(bounded);
    setMoving(true);
  };

  useEffect(() => {
    let cancelled = false;
    fetch("/lottie/toucan.json")
      .then((res) => res.json())
      .then(async (json) => {
        const cleaned = await removeWhiteBackgroundFromLottie(json);
        if (!cancelled) setAnimationData(cleaned);
      })
      .catch(() => null);
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const init = getBoundedPoint(window.innerWidth * 0.72, window.innerHeight * 0.32);
    latestTargetRef.current = init;
    latestPosRef.current = init;
    setPosition({ x: init.x, y: init.y, tilt: 0 });
    setTarget(init);

    const onClick = (event: MouseEvent) => {
      moveTo(event.clientX - SIZE * 0.5, event.clientY - SIZE * 0.5, CLICK_SPEED);
    };
    const onResize = () => {
      const current = getBoundedPoint(latestPosRef.current.x, latestPosRef.current.y);
      const currentTarget = getBoundedPoint(latestTargetRef.current.x, latestTargetRef.current.y);
      latestPosRef.current = current;
      latestTargetRef.current = currentTarget;
      setPosition((prev) => ({ ...prev, x: current.x, y: current.y }));
      setTarget(currentTarget);
    };

    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    mountedRef.current = true;
    const firstPatrol = pickPatrolTarget();
    moveTo(firstPatrol.x, firstPatrol.y, PATROL_SPEED);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute z-[1] h-[170px] w-[170px] md:h-[200px] md:w-[200px]"
        animate={{
          x: target.x,
          y: target.y,
          rotate: 0,
        }}
        transition={{
          type: "tween",
          duration: flightDuration,
          ease: "linear",
        }}
        onUpdate={(latest) => {
          const x = typeof latest.x === "number" ? latest.x : latestPosRef.current.x;
          const y = typeof latest.y === "number" ? latest.y : latestPosRef.current.y;
          latestPosRef.current = { x, y };
          setPosition({ x, y, tilt: 0 });
        }}
        onAnimationComplete={() => {
          setMoving(false);
          if (!mountedRef.current) return;
          const next = pickPatrolTarget();
          moveTo(next.x, next.y, PATROL_SPEED);
        }}
        style={{ transformStyle: "flat" }}
      >
        <motion.div
          animate={{ scaleX: facing }}
          transition={{ type: "tween", duration: 0.12, ease: "easeOut" }}
          className="h-full w-full"
        >
          {animationData ? (
            <div className="h-full w-full opacity-90">
              <Lottie animationData={animationData} loop autoplay />
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </div>
  );
}
