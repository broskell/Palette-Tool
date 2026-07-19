"use client";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Users } from "lucide-react";

export function PreviewLanding() {
  return (
    <div>
      <section className="py-12 px-5 text-center max-w-xl mx-auto">
        <motion.span initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-[var(--border)] text-[var(--muted-foreground)] mb-3">v2.0 is live</motion.span>
        <motion.h1 initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.05}} className="text-2xl font-bold"><span className="text-[var(--primary)]">Beautiful</span> by default.</motion.h1>
        <motion.p initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="mt-2 text-xs text-[var(--muted-foreground)]">A complete design system for shipping faster.</motion.p>
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.15}} className="mt-5 flex gap-2 justify-center">
          <button className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-1.5 text-xs font-medium">Get Started <ArrowRight className="h-3 w-3"/></button>
          <button className="rounded-lg border border-[var(--border)] px-4 py-1.5 text-xs font-medium hover:bg-[var(--muted)]">Docs</button>
        </motion.div>
      </section>
      <section className="px-5 max-w-3xl mx-auto pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[{i:Zap,t:"Fast",d:"Sub-100ms loads."},{i:Star,t:"Beautiful",d:"Crafted with care."},{i:Users,t:"Team Ready",d:"Built to scale."}].map((f,i)=>(
            <motion.div key={f.t} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="h-8 w-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-2"><f.i className="h-4 w-4 text-[var(--primary)]"/></div>
              <h3 className="text-xs font-semibold">{f.t}</h3><p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="px-5 py-8 max-w-xl mx-auto text-center">
        <h2 className="text-base font-bold">Ready to start?</h2>
        <div className="mt-3 flex gap-2 justify-center">
          <input className="w-40 rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-1.5 text-[11px] focus:outline-none focus:border-[var(--ring)]" placeholder="you@example.com" />
          <button className="rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-1.5 text-[11px] font-medium">Subscribe</button>
        </div>
      </section>
    </div>
  );
}
