"use client";
import { motion } from "framer-motion";

export function PreviewCharts() {
  return (
    <div className="p-5 space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
        <h3 className="text-xs font-semibold text-[var(--foreground)] mb-4">Bar Chart</h3>
        <div className="flex items-end gap-1.5 h-36">
          {[35,45,30,60,50,70,55,75,65,85,72,90].map((v,i)=>(
            <motion.div key={i} initial={{height:0}} whileInView={{height:`${v}%`}} viewport={{once:true}} transition={{delay:i*0.03}} className="flex-1 rounded-t-md bg-[var(--primary)] opacity-60 min-h-[3px]" />
          ))}
        </div>
        <div className="flex justify-between mt-2">{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m=><span key={m} className="text-[9px] text-[var(--muted-foreground)]">{m}</span>)}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h3 className="text-xs font-semibold text-[var(--foreground)] mb-3">Line Chart</h3>
          <svg viewBox="0 0 200 60" className="w-full h-20"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"/><stop offset="100%" stopColor="var(--primary)" stopOpacity="0"/></linearGradient></defs><path d="M0,45 L28,35 L56,42 L84,22 L112,15 L140,18 L168,6 L200,2" fill="none" stroke="var(--primary)" strokeWidth="2"/></svg>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90"><circle cx="50" cy="50" r="38" fill="none" stroke="var(--muted)" strokeWidth="8"/><motion.circle cx="50" cy="50" r="38" fill="none" stroke="var(--primary)" strokeWidth="8" strokeLinecap="round" strokeDasharray="238.76" initial={{strokeDashoffset:238.76}} whileInView={{strokeDashoffset:238.76*0.35}} viewport={{once:true}} transition={{duration:1.2}}/></svg>
        </div>
      </div>
    </div>
  );
}
