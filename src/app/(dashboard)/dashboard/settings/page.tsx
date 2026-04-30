import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  return (
    <Card className="max-w-2xl">
      <h2 className="mb-4 text-2xl font-semibold">账户设置</h2>
      <div className="space-y-3">
        <Input placeholder="团队名称" defaultValue="Tooken Team" />
        <Input placeholder="账单邮箱" defaultValue="ops@tooken.ai" />
        <Button>保存设置</Button>
      </div>
    </Card>
  );
}
