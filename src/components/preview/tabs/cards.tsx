"use client";
import { motion } from "framer-motion";
import { Bell, Settings, User, Users, CreditCard, Layout, MoreHorizontal, TrendingUp } from "lucide-react";

export function PreviewCards() {
  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xs font-semibold text-[var(--muted-foreground)]">STATS CARDS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {[
          { title: "Total Users", value: "12,345", sub: "+12% this month", icon: Users, color: "var(--primary)" },
          { title: "Revenue", value: "$45,230", sub: "+8.2% vs last month", icon: CreditCard, color: "var(--success)" },
          { title: "Active Now", value: "1,429", sub: "32% of total", icon: Layout, color: "var(--warning)" },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="flex items-start justify-between">
              <div className="rounded-lg p-2" style={{ backgroundColor: card.color + "20" }}><card.icon className="h-4 w-4" style={{ color: card.color }} /></div>
              <button className="p-1 rounded hover:bg-[var(--muted)]"><MoreHorizontal className="h-3.5 w-3.5 text-[var(--muted-foreground)]" /></button>
            </div>
            <p className="mt-3 text-xl font-bold text-[var(--foreground)]">{card.value}</p>
            <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{card.title} <span className="text-[var(--success)]">{card.sub}</span></p>
          </motion.div>
        ))}
      </div>

      <h2 className="text-xs font-semibold text-[var(--muted-foreground)]">CONTENT CARDS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {["Getting Started Guide", "API Reference", "Community Showcase", "Best Practices"].map((title, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 hover:border-[var(--ring)]/50 cursor-pointer transition-colors">
            <span className="inline-block px-2 py-0.5 rounded text-[9px] font-medium bg-[var(--primary)]/10 text-[var(--primary)] mb-2">Doc</span>
            <h3 className="text-xs font-semibold text-[var(--foreground)]">{title}</h3>
            <p className="text-[10px] text-[var(--muted-foreground)] mt-1">Learn how to get the most out of this platform.</p>
          </motion.div>
        ))}
      </div>

      <h2 className="text-xs font-semibold text-[var(--muted-foreground)]">PROFILE CARDS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {["AJ", "SW", "JL"].map((initials, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mb-2"><span className="text-sm font-semibold text-[var(--primary)]">{initials}</span></div>
            <h3 className="text-xs font-semibold text-[var(--foreground)]">{["Alex", "Sam", "Jordan"][i]}</h3>
            <p className="text-[10px] text-[var(--muted-foreground)]">{["Designer", "Engineer", "PM"][i]}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
