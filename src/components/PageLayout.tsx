"use client";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import MobileNav from "./MobileNav";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Navbar />
      {/* Desktop layout */}
      <div className="desktop-layout" style={{ maxWidth: 1400, margin: "60px auto 0", display: "grid", gridTemplateColumns: "240px 1fr 288px", gap: 16, alignItems: "start", padding: "20px 20px 80px" }}>
        <aside style={{ minWidth: 0 }}>
          <div style={{ position: "sticky", top: 76 }}>
            <Sidebar />
          </div>
        </aside>
        <main style={{ minWidth: 0 }}>{children}</main>
        <aside style={{ minWidth: 0 }}>
          <div style={{ position: "sticky", top: 76 }}>
            <RightPanel />
          </div>
        </aside>
      </div>
      <MobileNav />
    </div>
  );
}