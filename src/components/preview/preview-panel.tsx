"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, CreditCard, FormInput, Navigation, Table, BarChart3, CalendarDays, UserCircle, DollarSign, Globe } from "lucide-react";
import { PreviewCards } from "./tabs/cards";
import { PreviewDashboard } from "./tabs/dashboard";
import { PreviewForms } from "./tabs/forms";
import { PreviewNavigation } from "./tabs/nav";
import { PreviewTable } from "./tabs/table";
import { PreviewCharts } from "./tabs/charts";
import { PreviewCalendarInner } from "./tabs/calendar";
import { PreviewProfile } from "./tabs/profile";
import { PreviewPricing } from "./tabs/pricing";
import { PreviewLanding } from "./tabs/landing";

const TABS = [
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "dashboard", label: "Dashboard", icon: Layout },
  { id: "forms", label: "Forms", icon: FormInput },
  { id: "nav", label: "Navigation", icon: Navigation },
  { id: "table", label: "Table", icon: Table },
  { id: "charts", label: "Charts", icon: BarChart3 },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "profile", label: "Profile", icon: UserCircle },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "landing", label: "Landing", icon: Globe },
];

export function PreviewPanel() {
  const [activeTab, setActiveTab] = useState("cards");
  return (
    <div className="h-full flex flex-col bg-[var(--background)]">
      <div className="flex items-center gap-0 px-2 py-1 border-b border-[var(--border)] bg-[var(--card)] flex-shrink-0 overflow-x-auto">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"}`}>
            <tab.icon className="h-3 w-3" /> {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.12 }}>
            {activeTab === "cards" && <PreviewCards />}
            {activeTab === "dashboard" && <PreviewDashboard />}
            {activeTab === "forms" && <PreviewForms />}
            {activeTab === "nav" && <PreviewNavigation />}
            {activeTab === "table" && <PreviewTable />}
            {activeTab === "charts" && <PreviewCharts />}
            {activeTab === "calendar" && <PreviewCalendarInner />}
            {activeTab === "profile" && <PreviewProfile />}
            {activeTab === "pricing" && <PreviewPricing />}
            {activeTab === "landing" && <PreviewLanding />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
