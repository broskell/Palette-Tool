"use client";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

export function CSSInjector() {
  const colors = useStore((s) => s.colors);
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([k, v]) => root.style.setProperty(`--${k}`, v));
  }, [colors]);
  return null;
}
