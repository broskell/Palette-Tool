"use client";
import { useState } from "react";
import { Home, Star, Mail, Calendar, Users, Settings, Bell, Search, Menu, X, ChevronRight } from "lucide-react";

export function PreviewNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-5 space-y-6">
      <div><h2 className="text-xs font-semibold text-[var(--muted-foreground)] mb-2">NAVBAR</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center gap-3 px-3 h-10">
            <div className="flex items-center gap-1.5"><div className="h-5 w-5 rounded bg-[var(--primary)] flex items-center justify-center"><Home className="h-3 w-3 text-[var(--primary-foreground)]" /></div><span className="text-[10px] font-semibold">App</span></div>
            <div className="flex gap-0.5 ml-4">{["Dashboard","Products","Settings"].map(l=><button key={l} className="px-2 py-0.5 rounded text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]">{l}</button>)}</div>
            <div className="flex-1" />
            <div className="relative w-32"><Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-[var(--muted-foreground)]" /><input className="w-full rounded-md border border-[var(--border)] bg-[var(--input)] pl-7 pr-2 py-1 text-[9px] focus:outline-none" placeholder="Search..." /></div>
            <Bell className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
            <div className="h-5 w-5 rounded-full bg-[var(--primary)]/20 flex items-center justify-center"><span className="text-[9px] text-[var(--primary)] font-semibold">U</span></div>
          </div>
        </div>
      </div>

      <div><h2 className="text-xs font-semibold text-[var(--muted-foreground)] mb-2">MOBILE</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] max-w-xs">
          <div className="flex items-center justify-between px-3 h-10 border-b border-[var(--border)]"><span className="text-[10px] font-semibold">App</span><button onClick={()=>setOpen(!open)} className="p-1 rounded hover:bg-[var(--muted)]">{open?<X className="h-3.5 w-3.5"/>:<Menu className="h-3.5 w-3.5"/>}</button></div>
          {open && <div className="p-1.5 border-b border-[var(--border)] space-y-0.5">{["Dashboard","Products","Settings"].map(l=><button key={l} className="w-full text-left px-2 py-1 rounded text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]">{l}</button>)}</div>}
          <div className="p-3"><p className="text-[10px] text-[var(--muted-foreground)]">Content</p></div>
        </div>
      </div>

      <div><h2 className="text-xs font-semibold text-[var(--muted-foreground)] mb-2">SIDEBAR</h2>
        <div className="flex rounded-xl border border-[var(--border)] bg-[var(--card)] max-w-xs h-40">
          <div className="w-32 border-r border-[var(--border)] p-1.5 space-y-0.5">{[{icon:Home,label:"Home",active:true},{icon:Star,label:"Favorites"},{icon:Mail,label:"Inbox"},{icon:Calendar,label:"Calendar"},{icon:Settings,label:"Settings"}].map(i=><div key={i.label} className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] cursor-pointer ${i.active?"bg-[var(--primary)]/10 text-[var(--primary)]":"text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"}`}><i.icon className="h-3 w-3"/>{i.label}</div>)}</div>
          <div className="flex-1 p-3 flex items-center justify-center"><span className="text-[10px] text-[var(--muted-foreground)]">Content</span></div>
        </div>
      </div>

      <div><h2 className="text-xs font-semibold text-[var(--muted-foreground)] mb-2">BREADCRUMBS & TABS</h2>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
          <div className="flex items-center gap-1 text-[10px]">{["Home","Products","Electronics"].map((c,i)=><span key={c} className="flex items-center gap-1"><span className={i===2?"text-[var(--foreground)] font-medium":"text-[var(--muted-foreground)] cursor-pointer"}>{c}</span>{i<2&&<ChevronRight className="h-3 w-3 text-[var(--muted-foreground)]"/>}</span>)}</div>
          <div className="flex gap-0.5 border-b border-[var(--border)] pb-2">{[{l:"Overview",a:!0},{l:"Analytics"},{l:"Reports"},{l:"Notifications"}].map(t=><button key={t.l} className={`px-2 py-0.5 rounded text-[10px] font-medium ${(t as any).a?"bg-[var(--primary)]/10 text-[var(--primary)]":"text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}>{t.l}</button>)}</div>
          <div className="flex items-center justify-center gap-1">{["Prev",...["1","2","3","4","5"]].map((p,i)=>i===0?<button key="prev" className="px-1.5 py-0.5 rounded text-[9px] border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]">Prev</button>:p==="1"?<button key={p} className="px-1.5 py-0.5 rounded text-[9px] bg-[var(--primary)] text-[var(--primary-foreground)]">{p}</button>:<button key={p} className="px-1.5 py-0.5 rounded text-[9px] border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]">{p}</button>)}<button className="px-1.5 py-0.5 rounded text-[9px] border border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]">Next</button></div>
        </div>
      </div>
    </div>
  );
}
