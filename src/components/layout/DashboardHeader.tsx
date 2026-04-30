import { Bell, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#09090f]/90 px-6 backdrop-blur">
      <div>
        <p className="text-sm text-zinc-400">Welcome back</p>
        <h1 className="text-base font-semibold text-zinc-100">Tooken Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" className="h-9">
          <Wallet className="mr-2 h-4 w-4" />
          128,400 Credits
        </Button>
        <Button variant="ghost" className="h-9 w-9 p-0">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
