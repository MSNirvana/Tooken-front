import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-5 text-2xl font-semibold">登录 Tooken</h1>
        <div className="space-y-3">
          <Input placeholder="邮箱" type="email" />
          <Input placeholder="密码" type="password" />
          <Button className="w-full">邮箱登录</Button>
          <Button variant="secondary" className="w-full">
            钱包登录
          </Button>
        </div>
        <p className="mt-4 text-sm text-zinc-400">
          登录后进入{" "}
          <Link className="text-amber-300" href="/dashboard">
            控制台
          </Link>
        </p>
      </Card>
    </main>
  );
}
