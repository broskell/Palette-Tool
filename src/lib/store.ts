"use client";

import { create } from "zustand";

type HEX = string;

export interface ThemeColors {
  background: string; foreground: string;
  primary: string; "primary-foreground": string;
  secondary: string; "secondary-foreground": string;
  accent: string; "accent-foreground": string;
  card: string; "card-foreground": string;
  border: string; popover: string; "popover-foreground": string;
  muted: string; "muted-foreground": string;
  input: string; ring: string;
  success: string; "success-foreground": string;
  warning: string; "warning-foreground": string;
  destructive: string; "destructive-foreground": string;
}

export interface ThemePreset { id: string; name: string; colors: ThemeColors; isDark: boolean; }

const DARK: ThemeColors = {
  background: "#09090b", foreground: "#fafafa",
  primary: "#6366f1", "primary-foreground": "#ffffff",
  secondary: "#27272a", "secondary-foreground": "#fafafa",
  accent: "#6366f1", "accent-foreground": "#ffffff",
  card: "#09090b", "card-foreground": "#fafafa",
  border: "#27272a", popover: "#09090b", "popover-foreground": "#fafafa",
  muted: "#27272a", "muted-foreground": "#a1a1aa",
  input: "#27272a", ring: "#6366f1",
  success: "#22c55e", "success-foreground": "#ffffff",
  warning: "#f59e0b", "warning-foreground": "#000000",
  destructive: "#ef4444", "destructive-foreground": "#ffffff",
};

const LIGHT: ThemeColors = {
  background: "#ffffff", foreground: "#0a0a0a",
  primary: "#4f46e5", "primary-foreground": "#ffffff",
  secondary: "#f4f4f5", "secondary-foreground": "#0a0a0a",
  accent: "#4f46e5", "accent-foreground": "#ffffff",
  card: "#ffffff", "card-foreground": "#0a0a0a",
  border: "#e4e4e7", popover: "#ffffff", "popover-foreground": "#0a0a0a",
  muted: "#f4f4f5", "muted-foreground": "#71717a",
  input: "#e4e4e7", ring: "#4f46e5",
  success: "#16a34a", "success-foreground": "#ffffff",
  warning: "#d97706", "warning-foreground": "#ffffff",
  destructive: "#dc2626", "destructive-foreground": "#ffffff",
};

const DEFAULT = DARK;

function makeLightColors(darkColors: ThemeColors): ThemeColors {
  return {
    ...LIGHT,
    primary: darkColors.primary,
    "primary-foreground": darkColors["primary-foreground"],
    accent: darkColors.accent,
    "accent-foreground": darkColors["accent-foreground"],
    ring: darkColors.ring,
    success: darkColors.success,
    "success-foreground": darkColors["success-foreground"],
    warning: darkColors.warning,
    "warning-foreground": darkColors["warning-foreground"],
    destructive: darkColors.destructive,
    "destructive-foreground": darkColors["destructive-foreground"],
  };
}

function makeDarkColors(lightColors: ThemeColors, darkPrimary?: ThemeColors): ThemeColors {
  return {
    ...DARK,
    primary: lightColors.primary,
    "primary-foreground": lightColors["primary-foreground"],
    accent: lightColors.accent,
    "accent-foreground": lightColors["accent-foreground"],
    ring: lightColors.ring,
    success: lightColors.success,
    "success-foreground": lightColors["success-foreground"],
    warning: lightColors.warning,
    "warning-foreground": lightColors["warning-foreground"],
    destructive: lightColors.destructive,
    "destructive-foreground": lightColors["destructive-foreground"],
  };
}

export const PRESETS: ThemePreset[] = [
  { id: "default", name: "Indigo", colors: DARK, isDark: true },
  { id: "slate", name: "Slate", colors: { ...DARK, primary: "#64748b", "primary-foreground": "#fff", ring: "#64748b", accent: "#64748b", "accent-foreground": "#fff" }, isDark: true },
  { id: "rose", name: "Rose", colors: { ...DARK, primary: "#f43f5e", "primary-foreground": "#fff", ring: "#f43f5e", accent: "#f43f5e", "accent-foreground": "#fff" }, isDark: true },
  { id: "emerald", name: "Emerald", colors: { ...DARK, primary: "#10b981", "primary-foreground": "#fff", ring: "#10b981", accent: "#10b981", "accent-foreground": "#fff" }, isDark: true },
  { id: "ocean", name: "Ocean", colors: { ...DARK, primary: "#06b6d4", "primary-foreground": "#fff", ring: "#06b6d4", accent: "#06b6d4", "accent-foreground": "#fff" }, isDark: true },
  { id: "violet", name: "Violet", colors: { ...DARK, primary: "#8b5cf6", "primary-foreground": "#fff", ring: "#8b5cf6", accent: "#8b5cf6", "accent-foreground": "#fff" }, isDark: true },
  { id: "amber", name: "Amber", colors: { ...DARK, primary: "#f59e0b", "primary-foreground": "#000", ring: "#f59e0b", accent: "#f59e0b", "accent-foreground": "#000" }, isDark: true },
  {
    id: "cyber", name: "Cyber", isDark: true, colors: {
      background: "#0a0a0f", foreground: "#e2e8f0",
      primary: "#00f0ff", "primary-foreground": "#0a0a0f",
      secondary: "#1a1a2e", "secondary-foreground": "#e2e8f0",
      accent: "#ff00ff", "accent-foreground": "#fff",
      card: "#0f0f1a", "card-foreground": "#e2e8f0",
      border: "#1e1e3a", popover: "#0f0f1a", "popover-foreground": "#e2e8f0",
      muted: "#1a1a2e", "muted-foreground": "#8892b0",
      input: "#1e1e3a", ring: "#00f0ff",
      success: "#00f0ff", "success-foreground": "#0a0a0f",
      warning: "#ffb800", "warning-foreground": "#0a0a0f",
      destructive: "#ff4444", "destructive-foreground": "#fff",
    }
  },
];

export const TOKEN_LABELS: Record<string, string> = {
  background: "Background", foreground: "Foreground",
  primary: "Primary", "primary-foreground": "Primary FG",
  secondary: "Secondary", "secondary-foreground": "Secondary FG",
  accent: "Accent", "accent-foreground": "Accent FG",
  card: "Card", "card-foreground": "Card FG",
  border: "Border", popover: "Popover", "popover-foreground": "Popover FG",
  muted: "Muted", "muted-foreground": "Muted FG",
  input: "Input", ring: "Ring",
  success: "Success", "success-foreground": "Success FG",
  warning: "Warning", "warning-foreground": "Warning FG",
  destructive: "Destructive", "destructive-foreground": "Destructive FG",
};

export function hexToRgb(h: string) { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h); return r ? { r: parseInt(r[1],16), g: parseInt(r[2],16), b: parseInt(r[3],16) } : { r:0,g:0,b:0 }; }
export function rgbToHex(r:number,g:number,b:number):HEX { return "#"+[r,g,b].map(x=>x.toString(16).padStart(2,"0")).join(""); }
export function hexToHsl(hex:string) {
  const {r:rc,g:gc,b:bc} = hexToRgb(hex); const r=rc/255,g=gc/255,b=bc/255; const mx=Math.max(r,g,b),mn=Math.min(r,g,b); let h=0,s=0; const l=(mx+mn)/2; if(mx!==mn){ const d=mx-mn; s=l>.5?d/(2-mx-mn):d/(mx+mn); switch(mx){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;} } return {h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)};
}
export function hslToHex(h:number,s:number,l:number):HEX { const f=(n:number)=>{ const k=(n+h/30)%12; return l-s*Math.min(l,1-l)*Math.max(Math.min(k-3,9-k,1),-1); }; return rgbToHex(Math.round(f(0)*255),Math.round(f(8)*255),Math.round(f(4)*255)); }
export function hexToOklch(hex:string) { const {r,g,b}=hexToRgb(hex); const L=0.4122214708*r/255+0.5363325363*g/255+0.0514459929*b/255,M=0.2119034982*r/255+0.6806995451*g/255+0.1073969566*b/255,S=0.0883024619*r/255+0.2817188376*g/255+0.6299787005*b/255; const lL=Math.cbrt(L),lM=Math.cbrt(M),lS=Math.cbrt(S); const li=0.2104542553*lL+0.7936177850*lM-0.0040720468*lS; const a=1.9779984951*lL-2.4285922050*lM+0.4505937099*lS; const b2=0.0259040371*lL+0.7827717662*lM-0.8086757660*lS; const C=Math.sqrt(a*a+b2*b2); let H=(Math.atan2(b2,a)*180)/Math.PI; if(H<0)H+=360; return {l:Math.round(li*100),c:Math.round(C*1000)/1000,h:Math.round(H*10)/10}; }
export function getContrastRatio(h1:string,h2:string){const a=hexToRgb(h1),b=hexToRgb(h2); const la=(c:number)=>{c/=255;return c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4)}; const l1=.2126*la(a.r)+.7152*la(a.g)+.0722*la(a.b),l2=.2126*la(b.r)+.7152*la(b.g)+.0722*la(b.b); return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05); }
export function randomHex():HEX { return hslToHex(Math.floor(Math.random()*360),Math.floor(Math.random()*30)+40,Math.floor(Math.random()*20)+40); }
export function generatePalette() { const h=Math.floor(Math.random()*360); return { primary: hslToHex(h,55,50), secondary: hslToHex((h+30)%360,45,60), accent: hslToHex((h+180)%360,55,55) }; }
export function getHarmonies(hex:string){const{h,s,l}=hexToHsl(hex);return{complementary:[hex,hslToHex((h+180)%360,s,l)],analogous:[hslToHex((h-30+360)%360,s,l),hex,hslToHex((h+30)%360,s,l)],triadic:[hex,hslToHex((h+120)%360,s,l),hslToHex((h+240)%360,s,l)]};}

interface HistoryEntry { colors: ThemeColors; presetId: string; presetName: string; }
export type ColorMode = "dark" | "light" | "system";

interface Store {
  colors: ThemeColors;
  darkColors: ThemeColors;
  lightColors: ThemeColors;
  presetId: string; presetName: string; colorMode: ColorMode;
  lockedTokens: Set<string>; favorites: ThemePreset[];
  history: HistoryEntry[]; historyIndex: number;
  recentColors: string[]; recentThemes: ThemePreset[];
  setColor: (k: keyof ThemeColors, v: string) => void;
  applyPreset: (p: ThemePreset) => void;
  setColorMode: (m: ColorMode) => void;
  toggleLock: (t: string) => void; isLocked: (t: string) => boolean;
  undo: () => void; redo: () => void; canUndo: () => boolean; canRedo: () => boolean;
  randomize: () => void; generate: () => void; reset: () => void;
  toggleFavorite: (p: ThemePreset) => void; isFavorite: (id: string) => boolean;
  duplicate: () => void; rename: (n: string) => void;
  exportCSS: () => string; exportTailwind: () => string; exportJSON: () => string;
  importJSON: (j: string) => boolean;
  search: (q: string) => { key: string; label: string; type: string }[];
}

const lightDefault = makeLightColors(DARK);

export const useStore = create<Store>((set, get) => ({
  colors: {...DARK},
  darkColors: {...DARK},
  lightColors: {...lightDefault},
  presetId: "default", presetName: "Indigo", colorMode: "dark",
  lockedTokens: new Set(), favorites: [],
  history: [{colors:{...DARK},presetId:"default",presetName:"Indigo"}], historyIndex: 0,
  recentColors: [], recentThemes: [PRESETS[0]],
  setColor(k,v){ const s=get(); if(s.lockedTokens.has(k))return;
    const isShared = !["background","foreground","card","card-foreground","secondary","secondary-foreground","border","popover","popover-foreground","muted","muted-foreground","input"].includes(k);
    set(st=>{
      const newColors = { ...st.colors, [k]: v };
      const newDark = { ...st.darkColors, [k]: v };
      const newLight = isShared ? { ...st.lightColors, [k]: v } : st.lightColors;
      const e: HistoryEntry = { colors: { ...newColors }, presetId: st.presetId, presetName: st.presetName };
      const h = st.history.slice(0, st.historyIndex+1); h.push(e); if(h.length>50)h.shift();
      return { colors: newColors, darkColors: newDark, lightColors: newLight, history: h, historyIndex: h.length-1, presetId: "custom", presetName: "Custom", recentColors: [v, ...st.recentColors.filter(x=>x!==v)].slice(0,20) };
    });
  },
  applyPreset(p){ const lightVariant = makeLightColors(p.colors);
    set(st=>{const h=st.history.slice(0,st.historyIndex+1); h.push({colors:{...p.colors},presetId:p.id,presetName:p.name}); if(h.length>50)h.shift();
    return{colors:{...p.colors},darkColors:{...p.colors},lightColors:{...lightVariant},presetId:p.id,presetName:p.name,history:h,historyIndex:h.length-1,colorMode:"dark",recentThemes:[p,...st.recentThemes.filter(t=>t.id!==p.id)].slice(0,10)}; }); },
  setColorMode(m){
    const s=get(); if(m===s.colorMode){set({colorMode:m});return;}
    if(m==="system"){set({colorMode:"system"});return;}
    const newColors = m==="light" ? { ...s.lightColors } : { ...s.darkColors };
    set({colorMode:m, colors:newColors});
  },
  toggleLock(t){ set(s=>{const n=new Set(s.lockedTokens); n.has(t)?n.delete(t):n.add(t); return{lockedTokens:n}; }); },
  isLocked(t){ return get().lockedTokens.has(t); },
  undo(){ const{history,historyIndex}=get(); if(historyIndex>0){ const e=history[historyIndex-1]; set({colors:{...e.colors},presetId:e.presetId,presetName:e.presetName,historyIndex:historyIndex-1}); } },
  redo(){ const{history,historyIndex}=get(); if(historyIndex<history.length-1){ const e=history[historyIndex+1]; set({colors:{...e.colors},presetId:e.presetId,presetName:e.presetName,historyIndex:historyIndex+1}); } },
  canUndo(){ return get().historyIndex>0; }, canRedo(){ return get().historyIndex<get().history.length-1; },
  randomize(){ const p=generatePalette(); set(st=>{const c={...st.colors,...p}; const d={...st.darkColors,...p}; const l={...st.lightColors,...p}; const h=st.history.slice(0,st.historyIndex+1); h.push({colors:c,presetId:"random",presetName:"Random"}); if(h.length>50)h.shift(); return{colors:c,darkColors:d,lightColors:l,history:h,historyIndex:h.length-1,presetId:"random",presetName:"Random"}; }); },
  generate(){ const p=generatePalette(); set(st=>{const c={...st.colors,...p}; const d={...st.darkColors,...p}; const l={...st.lightColors,...p}; const h=st.history.slice(0,st.historyIndex+1); h.push({colors:c,presetId:"gen",presetName:"Generated"}); return{colors:c,darkColors:d,lightColors:l,history:h,historyIndex:h.length-1,presetId:"gen",presetName:"Generated",recentColors:[p.primary,...st.recentColors.filter(x=>x!==p.primary)].slice(0,20)}; }); },
  reset(){ set(st=>{const h=st.history.slice(0,st.historyIndex+1); h.push({colors:{...DARK},presetId:"default",presetName:"Default"}); return{colors:{...DARK},darkColors:{...DARK},lightColors:{...LIGHT},presetId:"default",presetName:"Default",colorMode:"dark",history:h,historyIndex:h.length-1}; }); },
  toggleFavorite(p){ set(s=>s.isFavorite(p.id)?{favorites:s.favorites.filter(f=>f.id!==p.id)}:{favorites:[...s.favorites,p]}); },
  isFavorite(id){ return get().favorites.some(f=>f.id===id); },
  duplicate(){ set(st=>{const p:ThemePreset={id:`dup-${Date.now()}`,name:`${st.presetName} Copy`,colors:{...st.colors},isDark:true}; const h=st.history.slice(0,st.historyIndex+1); h.push({colors:{...st.colors},presetId:p.id,presetName:p.name}); return{presetId:p.id,presetName:p.name,history:h,historyIndex:h.length-1}; }); },
  rename(n){ set({presetName:n}); },
  exportCSS(){ return Object.entries(get().colors).map(([k,v])=>`  --${k}: ${v};`).join("\n"); },
  exportTailwind(){ const e=Object.entries(get().colors).map(([k,v])=>`        "${k}": "${v}",`).join("\n"); return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${e}\n      }\n    }\n  }\n};`; },
  exportJSON(){ return JSON.stringify({name:get().presetName,mode:get().colorMode,colors:get().colors},null,2); },
  importJSON(j){ try{ const d=JSON.parse(j); if(d.colors){ set(st=>{const h=st.history.slice(0,st.historyIndex+1); h.push({colors:{...st.colors,...d.colors},presetId:`imp-${Date.now()}`,presetName:d.name||"Imported"}); return{colors:{...st.colors,...d.colors},presetName:d.name||"Imported",presetId:`imp-${Date.now()}`,history:h,historyIndex:h.length-1}; }); return true; } return false; }catch{return false;} },
  search(q){ const r:{key:string;label:string;type:string}[]=[]; Object.entries(TOKEN_LABELS).forEach(([k,l])=>{if(l.toLowerCase().includes(q)||k.includes(q))r.push({key:k,label:l,type:"token"})}); PRESETS.forEach(p=>{if(p.name.toLowerCase().includes(q))r.push({key:p.id,label:p.name,type:"preset"})}); return r.slice(0,12); },
}));
