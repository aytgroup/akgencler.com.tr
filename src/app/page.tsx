"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";
import RightPanel from "@/components/RightPanel";
import MobileNav from "@/components/MobileNav";

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Navbar />
      <div className="desktop-layout" style={{ maxWidth: 1400, margin: "60px auto 0", display: "grid", gridTemplateColumns: "240px 1fr 288px", gap: 16, alignItems: "start", padding: "20px 20px 80px" }}>
        <aside style={{ minWidth: 0 }}>
          <div style={{ position: "sticky", top: 76 }}><Sidebar /></div>
        </aside>
        <main style={{ minWidth: 0 }}><Feed /></main>
        <aside style={{ minWidth: 0 }}>
          <div style={{ position: "sticky", top: 76 }}><RightPanel /></div>
        </aside>
      </div>
      <MobileNav />
    </div>
  );
}