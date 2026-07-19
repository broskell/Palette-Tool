"use client";
import { motion } from "framer-motion";
import { ArrowUpDown, Filter, Download, MoreHorizontal, Search } from "lucide-react";

const ROWS = [
  { id: "INV-001", name: "Alex Johnson", email: "alex@example.com", status: "Paid", amount: "$250" },
  { id: "INV-002", name: "Sam Williams", email: "sam@example.com", status: "Pending", amount: "$150" },
  { id: "INV-003", name: "Jordan Lee", email: "jordan@example.com", status: "Paid", amount: "$890" },
  { id: "INV-004", name: "Taylor Chen", email: "taylor@example.com", status: "Overdue", amount: "$45" },
  { id: "INV-005", name: "Morgan Riley", email: "morgan@example.com", status: "Canceled", amount: "$320" },
];

export function PreviewTable() {
  return (
    <div className="p-5">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        <div className="flex items-center gap-2 p-2.5 border-b border-[var(--border)]">
          <div className="relative flex-1 max-w-xs"><Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--muted-foreground)]" /><input className="w-full rounded-md border border-[var(--border)] bg-[var(--input)] pl-7 pr-2 py-1 text-[10px] focus:outline-none focus:border-[var(--ring)]" placeholder="Filter..." /></div>
          <button className="flex items-center gap-1 px-2 py-1 rounded border border-[var(--border)] text-[10px] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"><Filter className="h-3 w-3" /> Filter</button>
          <button className="flex items-center gap-1 px-2 py-1 rounded border border-[var(--border)] text-[10px] text-[var(--muted-foreground)] hover:bg-[var(--muted)]"><Download className="h-3 w-3" /> Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead><tr className="border-b border-[var(--border)]"><th className="text-left py-2 px-3 font-medium text-[var(--muted-foreground)]"><div className="flex items-center gap-1">ID <ArrowUpDown className="h-3 w-3" /></div></th><th className="text-left py-2 px-3 font-medium text-[var(--muted-foreground)]">Name</th><th className="text-left py-2 px-3 font-medium text-[var(--muted-foreground)]">Email</th><th className="text-left py-2 px-3 font-medium text-[var(--muted-foreground)]">Status</th><th className="text-right py-2 px-3 font-medium text-[var(--muted-foreground)]">Amount</th></tr></thead>
            <tbody>{ROWS.map((r,i)=>(<motion.tr key={r.id} initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="border-b border-[var(--border)]/50 hover:bg-[var(--muted)]/20"><td className="py-1.5 px-3 font-medium text-[var(--foreground)]">{r.id}</td><td className="py-1.5 px-3 text-[var(--foreground)]">{r.name}</td><td className="py-1.5 px-3 text-[var(--muted-foreground)]">{r.email}</td><td className="py-1.5 px-3"><span className={`px-1.5 py-0.5 rounded-full text-[9px] font-medium ${r.status==="Paid"?"bg-[var(--success)]/10 text-[var(--success)]":r.status==="Pending"?"bg-[var(--warning)]/10 text-[var(--warning)]":r.status==="Overdue"?"bg-[var(--destructive)]/10 text-[var(--destructive)]":"bg-[var(--muted)] text-[var(--muted-foreground)]"}`}>{r.status}</span></td><td className="py-1.5 px-3 text-right font-mono text-[var(--foreground)]">{r.amount}</td></motion.tr>))}</tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-2.5 border-t border-[var(--border)] text-[10px] text-[var(--muted-foreground)]"><span>5 results</span><div className="flex gap-0.5"><button className="px-1.5 py-0.5 rounded border border-[var(--border)] hover:bg-[var(--muted)]">Prev</button><button className="px-1.5 py-0.5 rounded bg-[var(--primary)] text-[var(--primary-foreground)]">1</button><button className="px-1.5 py-0.5 rounded border border-[var(--border)] hover:bg-[var(--muted)]">Next</button></div></div>
      </div>
    </div>
  );
}
