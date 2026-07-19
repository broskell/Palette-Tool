"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PreviewCalendarInner() {
  const [m,sm] = useState(new Date().getMonth());
  const [y,sy] = useState(new Date().getFullYear());
  const days = new Date(y,m+1,0).getDate();
  const first = new Date(y,m,1).getDay();
  const today = new Date().getDate();
  const isCurrent = m===new Date().getMonth()&&y===new Date().getFullYear();

  const events:Record<number,string[]> = {5:["Team standup"],12:["Review"],18:["Planning"],25:["Retro"]};

  return (
    <div className="p-5">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">{new Date(y,m).toLocaleString("default",{month:"long"})} {y}</h3>
          <div className="flex gap-0.5">
            <button onClick={()=>{if(m===0){sm(11);sy(y-1)}else sm(m-1)}} className="p-1 rounded hover:bg-[var(--muted)]"><ChevronLeft className="h-3.5 w-3.5"/></button>
            <button onClick={()=>{if(m===11){sm(0);sy(y+1)}else sm(m+1)}} className="p-1 rounded hover:bg-[var(--muted)]"><ChevronRight className="h-3.5 w-3.5"/></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} className="text-center text-[10px] font-medium text-[var(--muted-foreground)] py-0.5">{d}</div>)}
          {Array.from({length:first}).map((_,i)=><div key={`e${i}`} className="h-7"/>)}
          {Array.from({length:days}).map((_,i)=>{const d=i+1;const ev=events[d]||[];return <button key={d} className={`h-7 rounded text-[10px] font-medium transition-colors relative ${isCurrent&&d===today?"bg-[var(--primary)] text-[var(--primary-foreground)]":ev.length>0?"bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20":"text-[var(--foreground)] hover:bg-[var(--muted)]"}`}>{d}</button>})}
        </div>
      </div>
    </div>
  );
}
