"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  { name: "Starter", price: "$9", features: ["5 projects", "Basic analytics", "48h support"], popular: false },
  { name: "Pro", price: "$29", features: ["Unlimited projects", "Advanced analytics", "Priority support", "API access", "Custom domains"], popular: true },
  { name: "Enterprise", price: "$99", features: ["Everything in Pro", "Unlimited members", "SSO", "SLA guarantee"], popular: false },
];

export function PreviewPricing() {
  return (
    <div className="p-5 space-y-6">
      <div className="text-center mb-4"><h2 className="text-lg font-bold">Simple Pricing</h2><p className="text-[11px] text-[var(--muted-foreground)]">Choose the plan that fits you.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
        {PLANS.map((p,i)=>(
          <motion.div key={p.name} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className={`rounded-xl border p-5 flex flex-col ${p.popular?"border-[var(--primary)] bg-[var(--primary)]/5 shadow-lg shadow-[var(--primary)]/10":"border-[var(--border)] bg-[var(--card)]"}`}>
            {p.popular&&<span className="self-start px-2 py-0.5 rounded-full text-[9px] font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] mb-2">POPULAR</span>}
            <h3 className="text-sm font-bold">{p.name}</h3><div className="mt-2 mb-3"><span className="text-2xl font-bold">{p.price}</span><span className="text-[11px] text-[var(--muted-foreground)]">/mo</span></div>
            <ul className="space-y-1.5 mb-4 flex-1 text-[11px]">{p.features.map(f=><li key={f} className="flex items-center gap-1.5"><Check className="h-3 w-3 text-[var(--success)]" />{f}</li>)}</ul>
            <button className={`w-full rounded-lg py-1.5 text-[11px] font-medium ${p.popular?"bg-[var(--primary)] text-[var(--primary-foreground)]":"border border-[var(--border)] hover:bg-[var(--muted)]"}`}>Get Started</button>
          </motion.div>
        ))}
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 max-w-3xl"><h3 className="text-xs font-semibold mb-2">Feature Comparison</h3><table className="w-full text-[10px]"><thead><tr className="border-b border-[var(--border)]"><th className="text-left py-1.5">Feature</th><th className="text-center py-1.5">Starter</th><th className="text-center py-1.5 text-[var(--primary)]">Pro</th><th className="text-center py-1.5">Enterprise</th></tr></thead><tbody>{["Projects","Members","Analytics","Support","API"].map(f=><tr key={f} className="border-b border-[var(--border)]/50"><td className="py-1.5">{f}</td><td className="text-center">✓</td><td className="text-center font-medium text-[var(--primary)]">✓</td><td className="text-center">✓</td></tr>)}</tbody></table></div>
    </div>
  );
}
