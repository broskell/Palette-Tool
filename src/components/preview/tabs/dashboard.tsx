"use client";
import { motion } from "framer-motion";
import { Users, ShoppingCart, DollarSign, TrendingUp, Bell, Settings, Search, Plus, ArrowUp, ArrowDown } from "lucide-react";

export function PreviewDashboard() {
  return (
    <div className="p-5 space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-base font-bold text-[var(--foreground)]">Dashboard</h1><p className="text-[10px] text-[var(--muted-foreground)]">Welcome back.</p></div>
        <button className="px-3 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] font-medium hover:opacity-90"><Plus className="h-3 w-3 inline mr-1" />New</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Revenue", value: "$45,231", change: "+20.1%", up: true, icon: DollarSign, color: "var(--primary)" },
          { label: "Sales", value: "2,350", change: "+12.4%", up: true, icon: ShoppingCart, color: "var(--success)" },
          { label: "Users", value: "18.2K", change: "-2.1%", up: false, icon: Users, color: "var(--warning)" },
          { label: "Conversion", value: "3.2%", change: "+0.8%", up: true, icon: TrendingUp, color: "var(--accent)" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-start justify-between"><div className="rounded-lg p-1.5" style={{ backgroundColor: s.color + "20" }}><s.icon className="h-3.5 w-3.5" style={{ color: s.color }} /></div><span className={`text-[10px] font-medium ${s.up ? "text-[var(--success)]" : "text-[var(--destructive)]"}`}>{s.up ? <ArrowUp className="h-3 w-3 inline" /> : <ArrowDown className="h-3 w-3 inline" />}{s.change}</span></div>
            <p className="mt-2 text-lg font-bold text-[var(--foreground)]">{s.value}</p><p className="text-[10px] text-[var(--muted-foreground)]">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h3 className="text-xs font-semibold text-[var(--foreground)] mb-3">Revenue Trend</h3>
          <div className="flex items-end gap-1.5 h-28">{[35, 45, 30, 60, 50, 70, 55, 75, 65, 85, 72, 90].map((v, i) => (
            <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${v}%` }} viewport={{ once: true }} className="flex-1 rounded-t-sm bg-[var(--primary)] opacity-70 min-h-[3px]" />
          ))}</div>
          <div className="flex justify-between mt-1">{["J","F","M","A","M","J","J","A","S","O","N","D"].map(m=><span key={m} className="text-[9px] text-[var(--muted-foreground)]">{m}</span>)}</div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h3 className="text-xs font-semibold text-[var(--foreground)] mb-3">Activity</h3>
          {["Alex created a project","Sam updated billing","Jordan invited a member","Taylor completed onboarding"].map((a,i)=>(
            <div key={i} className="flex gap-2 py-1.5"><div className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] mt-1.5 flex-shrink-0" /><p className="text-[10px] text-[var(--foreground)]">{a}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}
