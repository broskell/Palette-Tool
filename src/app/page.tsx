"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette, Undo2, Redo2, Shuffle, Copy, Check, ChevronDown, ChevronRight,
  Monitor, Moon, Sun, RotateCcw, Download, Upload, Search, Heart,
  Lock, Unlock, Sparkles, X, FileJson, FileCode, FileText,
  PanelLeftClose, PanelLeft, Plus, Star,
} from "lucide-react";
import { useStore, PRESETS, TOKEN_LABELS, type ThemeColors, type ColorMode, hexToRgb, hexToHsl, hexToOklch, getContrastRatio, getHarmonies } from "@/lib/store";
import { PreviewPanel } from "@/components/preview/preview-panel";

const TOKEN_GROUPS: { name: string; keys: (keyof ThemeColors)[] }[] = [
  { name: "Base", keys: ["background", "foreground"] },
  { name: "Surface", keys: ["card", "card-foreground", "popover", "popover-foreground", "border", "input"] },
  { name: "Brand", keys: ["primary", "primary-foreground", "secondary", "secondary-foreground", "accent", "accent-foreground"] },
  { name: "Feedback", keys: ["success", "success-foreground", "warning", "warning-foreground", "destructive", "destructive-foreground"] },
  { name: "UI", keys: ["muted", "muted-foreground", "ring"] },
];

function ColorToken({ tokenKey }: { tokenKey: keyof ThemeColors }) {
  const { colors, setColor, isLocked, toggleLock } = useStore();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [hexInput, setHexInput] = useState(colors[tokenKey]);
  const color = colors[tokenKey];
  const locked = isLocked(tokenKey);

  if (hexInput !== color && document.activeElement?.tagName !== "INPUT") setHexInput(color);

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);
  const oklch = hexToOklch(color);

  const copyText = (t: string, l: string) => { navigator.clipboard.writeText(t); setCopied(l); setTimeout(() => setCopied(null), 1500); };
  const onHexChange = (v: string) => { setHexInput(v); if (/^#[0-9a-fA-F]{6}$/.test(v)) setColor(tokenKey, v); };

  return (
    <div className="group">
      <div className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-[var(--muted)]/30 transition-colors">
        <button onClick={() => setExpanded(!expanded)} className="p-0.5 rounded hover:bg-[var(--muted)]">{expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}</button>
        <input type="color" value={color} onChange={(e) => setColor(tokenKey, e.target.value)} className="h-4 w-5 flex-shrink-0 rounded cursor-pointer border-0 bg-transparent p-0" />
        <button onClick={() => toggleLock(tokenKey)} className="p-0.5 rounded hover:bg-[var(--muted)]" title={locked ? "Unlock" : "Lock"}>{locked ? <Lock className="h-3 w-3 text-[var(--warning)]" /> : <Unlock className="h-3 w-3 opacity-0 group-hover:opacity-40" />}</button>
        <span className="text-[11px] font-medium flex-1 truncate">{TOKEN_LABELS[tokenKey]}</span>
        <input type="text" value={hexInput} onChange={(e) => onHexChange(e.target.value)} className="color-input-field w-[70px] text-right" />
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-6 border-l border-[var(--border)] pl-3 my-0.5 space-y-0.5">
            {[
              { l: "HEX", v: color },
              { l: "RGB", v: `${rgb.r}, ${rgb.g}, ${rgb.b}` },
              { l: "HSL", v: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` },
              { l: "OKLCH", v: `oklch(${oklch.l}% ${oklch.c} ${oklch.h})` },
            ].map(({ l, v }) => (
              <div key={l} className="flex items-center gap-1">
                <span className="text-[10px] text-[var(--muted-foreground)] w-8">{l}</span>
                <code className="text-[10px] flex-1 font-mono text-[var(--muted-foreground)] truncate">{v}</code>
                <button onClick={() => copyText(v, l)} className="p-0.5 rounded hover:bg-[var(--muted)]">{copied === l ? <Check className="h-2.5 w-2.5 text-[var(--success)]" /> : <Copy className="h-2.5 w-2.5 opacity-30 hover:opacity-100" />}</button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const store = useStore();
  const { colors, presetId, presetName, colorMode, setColorMode, applyPreset, undo, redo, canUndo, canRedo, randomize, generate, reset, exportCSS, exportTailwind, exportJSON, importJSON, duplicate, rename, search, recentColors, favorites, isFavorite, toggleFavorite } = store;

  const [leftPanel, setLeftPanel] = useState(true);
  const [searchQ, setSearchQ] = useState("");
  const [searchRes, setSearchRes] = useState<{ key: string; label: string; type: string }[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [exportMenu, setExportMenu] = useState(false);
  const [importMenu, setImportMenu] = useState(false);
  const [importTxt, setImportTxt] = useState("");
  const [copiedExp, setCopiedExp] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(-1);
  const fileRef = useRef<HTMLInputElement>(null);

  const onSearch = (q: string) => { setSearchQ(q); if (q) { setSearchRes(search(q)); setShowSearch(true); } else setShowSearch(false); };
  const copyExp = (fn: () => string, f: string) => { navigator.clipboard.writeText(fn()); setCopiedExp(f); setTimeout(() => setCopiedExp(null), 2000); };

  return (
    <div className="h-full flex flex-col">
      <header className="h-9 flex items-center gap-1.5 px-2 border-b border-[var(--border)] bg-[var(--card)] flex-shrink-0">
        <div className="flex items-center gap-1.5 mr-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[var(--primary)]"><Palette className="h-3 w-3 text-[var(--primary-foreground)]" /></div>
          <span className="text-[11px] font-semibold tracking-tight">Chromatic</span>
        </div>
        <div className="h-3 w-px bg-[var(--border)]" />
        <div className="flex gap-0">
          <button onClick={undo} disabled={!canUndo()} className="p-1 rounded hover:bg-[var(--muted)] disabled:opacity-30" title="Undo"><Undo2 className="h-3 w-3" /></button>
          <button onClick={redo} disabled={!canRedo()} className="p-1 rounded hover:bg-[var(--muted)] disabled:opacity-30" title="Redo"><Redo2 className="h-3 w-3" /></button>
        </div>
        <div className="h-3 w-px bg-[var(--border)]" />
        <button onClick={randomize} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] hover:bg-[var(--muted)]"><Shuffle className="h-3 w-3" /> Random</button>
        <button onClick={generate} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] hover:bg-[var(--muted)]"><Sparkles className="h-3 w-3" /> Generate</button>
        <button onClick={reset} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] hover:bg-[var(--muted)]"><RotateCcw className="h-3 w-3" /> Reset</button>

        <div className="flex-1" />

        <button onClick={() => setLeftPanel(!leftPanel)} className="p-1 rounded hover:bg-[var(--muted)]" title="Toggle panel">{leftPanel ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeft className="h-3 w-3" />}</button>

        <div className="h-3 w-px bg-[var(--border)]" />

        <div className="relative">
          <button onClick={() => setShowSearch(true)} className="flex items-center gap-1 w-36 px-2 py-1 rounded border border-[var(--border)] bg-[var(--input)] text-[10px] text-[var(--muted-foreground)] hover:border-[var(--ring)]"><Search className="h-3 w-3" /> Search...</button>
          <AnimatePresence>
            {showSearch && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-full mt-1 left-0 right-0 bg-[var(--popover)] border border-[var(--border)] rounded-lg shadow-xl z-50 overflow-hidden">
                <input autoFocus value={searchQ} onChange={(e) => onSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Escape") setShowSearch(false); }} className="w-full px-2 py-1 text-[11px] bg-transparent border-b border-[var(--border)] focus:outline-none" placeholder="Search themes & tokens..." />
                <div className="p-1">
                  {searchRes.map(r => (
                    <button key={r.key} onClick={() => { if (r.type === "preset") { const p = PRESETS.find(x => x.id === r.key); if (p) applyPreset(p); } setShowSearch(false); }} className="w-full text-left px-2 py-1 rounded text-[10px] hover:bg-[var(--muted)] flex items-center gap-1.5">
                      {r.type === "preset" ? <Star className="h-3 w-3" /> : <Palette className="h-3 w-3" />} {r.label}
                      <span className="text-[var(--muted-foreground)] ml-auto text-[9px]">{r.type}</span>
                    </button>
                  ))}
                  {searchQ && searchRes.length === 0 && <p className="text-[10px] text-[var(--muted-foreground)] px-2 py-1">No results</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button onClick={() => setExportMenu(!exportMenu)} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] hover:bg-[var(--muted)]"><Download className="h-3 w-3" /> Export</button>
          <AnimatePresence>{exportMenu && (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-full right-0 mt-1 bg-[var(--popover)] border border-[var(--border)] rounded-lg shadow-xl z-50 p-1 w-44">
              {[
                { l: "Copy CSS Variables", i: FileCode, f: exportCSS, k: "css" },
                { l: "Copy Tailwind Config", i: FileText, f: exportTailwind, k: "tw" },
                { l: "Copy JSON Theme", i: FileJson, f: exportJSON, k: "json" },
              ].map(({ l, i: I, f, k }) => (
                <button key={k} onClick={() => { copyExp(f, k); setExportMenu(false); }} className="w-full text-left flex items-center gap-1.5 px-2 py-1 rounded text-[10px] hover:bg-[var(--muted)]"><I className="h-3 w-3" /> {l} {copiedExp === k && <Check className="h-3 w-3 ml-auto text-[var(--success)]" />}</button>
              ))}
              <button onClick={() => { const b = new Blob([exportJSON()], { type: "application/json" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = `${presetName.toLowerCase().replace(/\s+/g,"-")}.json`; a.click(); URL.revokeObjectURL(u); setExportMenu(false); }} className="w-full text-left flex items-center gap-1.5 px-2 py-1 rounded text-[10px] hover:bg-[var(--muted)]"><Download className="h-3 w-3" /> Download JSON</button>
            </motion.div>
          )}</AnimatePresence>
        </div>

        <button onClick={() => setImportMenu(!importMenu)} className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] hover:bg-[var(--muted)]"><Upload className="h-3 w-3" /> Import</button>

        <div className="flex items-center gap-0 border border-[var(--border)] rounded p-0.5">
          {(["dark", "light", "system"] as ColorMode[]).map(m => {
            const I = m === "dark" ? Moon : m === "light" ? Sun : Monitor;
            return <button key={m} onClick={() => setColorMode(m)} className={`p-1 rounded ${colorMode === m ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "hover:bg-[var(--muted)]"}`}><I className="h-3 w-3" /></button>;
          })}
        </div>
      </header>

      <AnimatePresence>{importMenu && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setImportMenu(false)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[var(--popover)] border border-[var(--border)] rounded-xl p-5 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-semibold mb-3">Import Theme JSON</h3>
            <textarea value={importTxt} onChange={e => setImportTxt(e.target.value)} className="w-full h-32 rounded-lg border border-[var(--border)] bg-[var(--input)] p-3 text-xs font-mono resize-none focus:border-[var(--ring)] focus:outline-none" placeholder="Paste JSON..." />
            <div className="flex items-center justify-between mt-3">
              <button onClick={() => fileRef.current?.click()} className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]">Or upload file</button>
              <input ref={fileRef} type="file" accept=".json" onChange={e => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = ev => { if (ev.target?.result && importJSON(ev.target.result as string)) setImportMenu(false); }; r.readAsText(f); } }} className="hidden" />
              <div className="flex gap-2"><button onClick={() => setImportMenu(false)} className="px-3 py-1 rounded text-[11px] border border-[var(--border)] hover:bg-[var(--muted)]">Cancel</button><button onClick={() => { if (importJSON(importTxt)) setImportMenu(false); }} className="px-3 py-1 rounded text-[11px] bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90">Import</button></div>
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence initial={false}>
          {leftPanel && (
            <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 260, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.15 }} className="border-r border-[var(--border)] bg-[var(--card)] flex-shrink-0 overflow-hidden">
              <div className="w-[260px] h-full flex flex-col overflow-hidden">
                <div className="p-2.5 border-b border-[var(--border)] flex-shrink-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold text-[var(--muted-foreground)]">PRESETS</span>
                    <div className="flex gap-0.5">
                      <button onClick={duplicate} className="p-0.5 rounded hover:bg-[var(--muted)]" title="Duplicate"><Plus className="h-3 w-3" /></button>
                      <span className="text-[9px] text-[var(--muted-foreground)]">{PRESETS.length}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {PRESETS.map(p => (
                      <button key={p.id} onClick={() => applyPreset(p)} className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] transition-all ${presetId === p.id ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--muted)]/40 text-[var(--muted-foreground)] hover:bg-[var(--muted)]"}`}>
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.colors.primary }} /> {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {TOKEN_GROUPS.map((grp, gi) => (
                    <div key={grp.name} className="border-b border-[var(--border)] last:border-b-0">
                      <button onClick={() => setActiveSection(activeSection === gi ? -1 : gi)} className="w-full flex items-center gap-1.5 px-2 py-1.5 text-[10px] font-semibold text-[var(--muted-foreground)] hover:bg-[var(--muted)]/30">
                        {activeSection === gi ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />} {grp.name.toUpperCase()}
                      </button>
                      {activeSection === gi && <div className="px-1.5 pb-1.5">{grp.keys.map(k => <ColorToken key={k} tokenKey={k} />)}</div>}
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--border)] p-2.5 flex-shrink-0 space-y-3">
                  <div>
                    <span className="text-[9px] font-semibold text-[var(--muted-foreground)]">CONTRAST (FG/BG)</span>
                    <div className="mt-1 text-[10px]">
                      <span className="font-mono">{getContrastRatio(colors.foreground, colors.background).toFixed(1)}:1</span>
                      <span className={`ml-1 px-1 py-0.5 rounded text-[8px] font-medium ${getContrastRatio(colors.foreground, colors.background) >= 7 ? "bg-[var(--success)]/20 text-[var(--success)]" : getContrastRatio(colors.foreground, colors.background) >= 4.5 ? "bg-[var(--warning)]/20 text-[var(--warning)]" : "bg-[var(--destructive)]/20 text-[var(--destructive)]"}`}>
                        {getContrastRatio(colors.foreground, colors.background) >= 7 ? "AAA" : getContrastRatio(colors.foreground, colors.background) >= 4.5 ? "AA" : "FAIL"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-semibold text-[var(--muted-foreground)]">HARMONIES</span>
                    <div className="mt-1 flex gap-1">
                      {getHarmonies(colors.primary).complementary.map((c, i) => (
                        <button key={i} onClick={() => store.setColor("secondary", c)} className="h-4 flex-1 rounded border border-[var(--border)] hover:scale-110 transition-transform" style={{ backgroundColor: c }} title="Set as secondary" />
                      ))}
                    </div>
                  </div>

                  {/* Recent colors */}
                  {recentColors.length > 0 && (
                    <div>
                      <span className="text-[9px] font-semibold text-[var(--muted-foreground)]">RECENT</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {recentColors.slice(0, 8).map((c, i) => (
                          <button key={i} onClick={() => navigator.clipboard.writeText(c)} className="h-4 w-4 rounded border border-[var(--border)]" style={{ backgroundColor: c }} title={c} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Favorites */}
                  {favorites.length > 0 && (
                    <div>
                      <span className="text-[9px] font-semibold text-[var(--muted-foreground)]">FAVORITES ({favorites.length})</span>
                      <div className="mt-1 space-y-0.5">
                        {favorites.map(p => (
                          <div key={p.id} className="flex items-center gap-1.5">
                            <button onClick={() => applyPreset(p)} className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"><div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.colors.primary }} /> {p.name}</button>
                            <button onClick={() => toggleFavorite(p)} className="ml-auto p-0.5"><X className="h-2.5 w-2.5 text-[var(--muted-foreground)]" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-hidden">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
