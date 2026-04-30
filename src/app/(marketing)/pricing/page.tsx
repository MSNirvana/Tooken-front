import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const plans = [
  { name: "入门版", price: "¥199/月", credits: "50,000", discount: "9折" },
  { name: "专业版", price: "¥999/月", credits: "300,000", discount: "8折", popular: true },
  { name: "企业版", price: "¥4,999/月", credits: "2,000,000", discount: "7折" },
];

export default function PricingPage() {
  return (
    <main className="container-shell py-16">
      <h1 className="mb-8 font-['Syne'] text-4xl font-bold">Pricing Plans</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-amber-300/40" : ""}>
            {plan.popular && <p className="mb-2 text-xs text-amber-300">Most Popular</p>}
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-3xl font-bold text-amber-300">{plan.price}</p>
            <p className="mt-1 text-sm text-zinc-400">{plan.credits} Credits · {plan.discount}</p>
            <Button className="mt-6 w-full">立即选择</Button>
          </Card>
        ))}
      </div>
    </main>
  );
}
