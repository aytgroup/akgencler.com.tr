"use client";
import React, { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useStore();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (!isLoggedIn && path !== "/giris") {
      router.replace("/giris");
    }
  }, [isLoggedIn, path]);

  if (!isLoggedIn && path !== "/giris") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", border: "4px solid #e63946", borderTopColor: "transparent", animation: "spin 0.7s linear infinite" }}/>
          <p style={{ color: "#6b7280", fontSize: 14 }}>Yükleniyor...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}