import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function BillingPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Card>
          <h2 className="text-xl font-semibold">账单记录</h2>
          <p className="mt-2 text-sm text-zinc-400">充值 / 消耗流水，支持链上 TxHash 查询。</p>
          <div className="mt-4 rounded-xl bg-zinc-900/70 p-4 text-sm text-zinc-400">表格位</div>
        </Card>
      </div>
      <Card>
        <p className="text-sm text-zinc-400">Credits 余额</p>
        <p className="mt-2 text-3xl font-bold text-amber-300">128,400</p>
        <p className="text-sm text-zinc-400">≈ $128.40 / ¥918</p>
        <div className="mt-4 flex flex-col gap-2">
          <Button>立即充值</Button>
          <Button variant="secondary">查看套餐</Button>
        </div>
      </Card>
    </div>
  );
}
