"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Eye, EyeOff, Upload, Trash2, Search, ChevronDown } from "lucide-react";

export function PreviewForms() {
  const [showPw, setShowPw] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="p-5 space-y-6">
      <div>
        <h2 className="text-xs font-semibold text-[var(--muted-foreground)] mb-3">SIGN IN</h2>
        <div className="max-w-xs rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          {submitted ? (
            <div className="text-center py-4">
              <div className="mx-auto h-10 w-10 rounded-full bg-[var(--success)]/10 flex items-center justify-center mb-2"><Check className="h-5 w-5 text-[var(--success)]" /></div>
              <p className="text-xs font-semibold">Signed in!</p>
              <button onClick={() => setSubmitted(false)} className="text-[10px] text-[var(--primary)] mt-2 hover:underline">Try again</button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
              <div><label className="block text-[10px] font-medium text-[var(--foreground)] mb-1">Email</label><input type="email" placeholder="you@example.com" className="w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-1.5 text-[11px] focus:border-[var(--ring)] focus:outline-none" /></div>
              <div><label className="block text-[10px] font-medium text-[var(--foreground)] mb-1">Password</label><div className="relative"><input type={showPw ? "text" : "password"} placeholder="••••••" className="w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-1.5 text-[11px] pr-10 focus:border-[var(--ring)] focus:outline-none" /><button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2">{showPw ? <EyeOff className="h-3.5 w-3.5 text-[var(--muted-foreground)]" /> : <Eye className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />}</button></div></div>
              <button type="submit" className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-1.5 text-[11px] font-medium hover:opacity-90">Sign In</button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
          <h3 className="text-[10px] font-semibold text-[var(--muted-foreground)]">INPUTS</h3>
          <div><label className="text-[10px] text-[var(--foreground)]">Text Input</label><input type="text" placeholder="Enter text..." className="mt-0.5 w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-1.5 text-[11px] focus:border-[var(--ring)] focus:outline-none" /></div>
          <div><label className="text-[10px] text-[var(--foreground)]">With Error</label><input type="text" defaultValue="invalid" className="mt-0.5 w-full rounded-lg border border-[var(--destructive)] bg-[var(--input)] px-3 py-1.5 text-[11px] focus:border-[var(--destructive)] focus:outline-none" /><p className="text-[9px] text-[var(--destructive)] mt-0.5">Invalid value</p></div>
          <div><label className="text-[10px] text-[var(--foreground)]">Disabled</label><input type="text" disabled placeholder="Disabled" className="mt-0.5 w-full rounded-lg border border-[var(--border)] bg-[var(--muted)] px-3 py-1.5 text-[11px] opacity-50 cursor-not-allowed" /></div>
          <div><label className="text-[10px] text-[var(--foreground)]">Select</label><div className="relative mt-0.5"><select className="w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-3 py-1.5 text-[11px] focus:border-[var(--ring)] focus:outline-none appearance-none"><option>Option 1</option><option>Option 2</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none" /></div></div>
          <div className="space-y-1"><label className="text-[10px] text-[var(--foreground)]">Checkbox</label>{["Option A","Option B"].map(o=><label key={o} className="flex items-center gap-1.5 text-[11px]"><input type="checkbox" defaultChecked={o==="Option A"} className="rounded border-[var(--border)] text-[var(--primary)]" />{o}</label>)}</div>
          <div className="space-y-1"><label className="text-[10px] text-[var(--foreground)]">Radio</label>{["Radio 1","Radio 2"].map(r=><label key={r} className="flex items-center gap-1.5 text-[11px]"><input type="radio" name="r" defaultChecked={r==="Radio 1"} className="border-[var(--border)] text-[var(--primary)]" />{r}</label>)}</div>
          <div><label className="text-[10px] text-[var(--foreground)]">File Upload</label><label className="mt-0.5 flex flex-col items-center rounded-lg border border-dashed border-[var(--border)] p-4 cursor-pointer hover:border-[var(--ring)]"><Upload className="h-4 w-4 text-[var(--muted-foreground)] mb-1" /><span className="text-[10px] text-[var(--muted-foreground)]">Click to upload</span></label></div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-2">
            <h3 className="text-[10px] font-semibold text-[var(--muted-foreground)]">BUTTONS</h3>
            <button className="w-full rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] py-1.5 text-[11px] font-medium">Primary</button>
            <button className="w-full rounded-lg border border-[var(--border)] text-[var(--foreground)] py-1.5 text-[11px] font-medium hover:bg-[var(--muted)]">Secondary</button>
            <button className="w-full rounded-lg bg-[var(--destructive)] text-[var(--destructive-foreground)] py-1.5 text-[11px] font-medium">Destructive</button>
            <button className="w-full rounded-lg text-[var(--foreground)] py-1.5 text-[11px] font-medium hover:bg-[var(--muted)]">Ghost</button>
            <button disabled className="w-full rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)] py-1.5 text-[11px] font-medium opacity-50 cursor-not-allowed">Disabled</button>
            <div className="flex gap-1.5 pt-1">
              <button className="rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-1.5 py-1 text-[10px]">SM</button>
              <button className="rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-2 py-1 text-[11px]">MD</button>
              <button className="rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] px-3 py-1.5 text-xs">LG</button>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-2">
            <h3 className="text-[10px] font-semibold text-[var(--muted-foreground)]">BADGES</h3>
            <div className="flex flex-wrap gap-1.5">{[{l:"Default",c:"bg-[var(--primary)]/10 text-[var(--primary)]"},{l:"Success",c:"bg-[var(--success)]/10 text-[var(--success)]"},{l:"Warning",c:"bg-[var(--warning)]/10 text-[var(--warning)]"},{l:"Error",c:"bg-[var(--destructive)]/10 text-[var(--destructive)]"},{l:"Muted",c:"bg-[var(--muted)] text-[var(--muted-foreground)]"}].map(b=><span key={b.l} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${b.c}`}>{b.l}</span>)}</div>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-2">
            <h3 className="text-[10px] font-semibold text-[var(--muted-foreground)]">PROGRESS</h3>
            {[75,50,25].map(v=><div key={v} className="rounded-full bg-[var(--muted)] h-1.5 overflow-hidden"><motion.div initial={{width:0}} whileInView={{width:`${v}%`}} viewport={{once:true}} className="h-full rounded-full" style={{backgroundColor:v>=50?"var(--success)":v>=25?"var(--warning)":"var(--destructive)"}} /></div>)}
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-1.5">
            <h3 className="text-[10px] font-semibold text-[var(--muted-foreground)]">ALERTS</h3>
            {[{t:"success",m:"Saved successfully!",c:"border-[var(--success)]/30 text-[var(--success)]"},{t:"warning",m:"Storage almost full.",c:"border-[var(--warning)]/30 text-[var(--warning)]"},{t:"error",m:"Failed to save.",c:"border-[var(--destructive)]/30 text-[var(--destructive)]"}].map(a=><div key={a.t} className={`rounded-lg border px-3 py-2 text-[11px] ${a.c} bg-transparent`}>{a.m}</div>)}
          </div>
        </div>
      </div>

      <div className="max-w-md flex gap-2">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" /><input placeholder="Search..." className="w-full rounded-lg border border-[var(--border)] bg-[var(--input)] pl-9 pr-3 py-2 text-[11px] focus:border-[var(--ring)] focus:outline-none" /></div>
        <button className="px-4 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] font-medium">Search</button>
      </div>
    </div>
  );
}
