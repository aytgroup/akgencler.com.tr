"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import RightPanel from "@/components/RightPanel";
import StoryBar from "@/components/StoryBar";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"kesfet" | "akis" | "trend">("akis");

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="flex gap-6 py-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Sidebar />
          </aside>
          <main className="flex-1 min-w-0">
            <StoryBar />
            <div className="flex gap-2 mb-4 bg-white rounded-2xl p-1 shadow-sm border border-[#e9ecef]">
              {(["akis", "kesfet", "trend"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#e63946] text-white shadow-sm"
                      : "text-[#6c757d] hover:text-[#1a1a2e] hover:bg-[#f8f9fa]"
                  }`}
                >
                  {tab === "akis" && "📰 Akış"}
                  {tab === "kesfet" && "🔍 Keşfet"}
                  {tab === "trend" && "🔥 Trend"}
                </button>
              ))}
            </div>
            <Feed activeTab={activeTab} />
          </main>
          <aside className="hidden xl:block w-80 flex-shrink-0">
            <RightPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
