"use client";
import { Mail, MapPin, Calendar, Link2, Edit3 } from "lucide-react";

export function PreviewProfile() {
  return (
    <div className="p-5 space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden max-w-lg">
        <div className="h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
        <div className="px-5 pb-5">
          <div className="flex items-end gap-3 -mt-6">
            <div className="h-16 w-16 rounded-full border-4 border-[var(--card)] bg-[var(--primary)]/20 flex items-center justify-center"><span className="text-lg font-bold text-[var(--primary)]">AJ</span></div>
            <div className="flex-1">
              <h3 className="text-sm font-bold">Alex Johnson</h3><p className="text-[10px] text-[var(--muted-foreground)]">@alexjohnson</p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1 rounded-lg border border-[var(--border)] text-[11px] hover:bg-[var(--muted)]"><Edit3 className="h-3 w-3" /> Edit</button>
          </div>
          <p className="mt-3 text-[11px] text-[var(--foreground)]">Senior Product Designer crafting beautiful interfaces.</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {[{i:Mail,t:"alex@company.com"},{i:MapPin,t:"San Francisco, CA"},{i:Calendar,t:"Joined March 2020"},{i:Link2,t:"alexjohnson.design"}].map(x=><div key={x.t} className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)]"><x.i className="h-3 w-3"/>{x.t}</div>)}
          </div>
          <div className="flex gap-3 mt-3 pt-3 border-t border-[var(--border)]">
            {[{l:"Projects",v:42},{l:"Followers",v:"2.4K"},{l:"Following",v:186}].map(s=><div key={s.l}><span className="text-sm font-bold">{s.v}</span><span className="text-[10px] text-[var(--muted-foreground)] ml-1">{s.l}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
