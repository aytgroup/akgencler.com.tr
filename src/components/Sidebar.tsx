"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/", icon: "🏠", label: "Ana Sayfa", badge: null },
  { href: "/kesfet", icon: "🔍", label: "Keşfet", badge: null },
  { href: "/topluluklar", icon: "👥", label: "Topluluklar", badge: "12" },
  { href: "/etkinlikler", icon: "🎯", label: "Etkinlikler", badge: "3" },
  { href: "/mesajlar", icon: "💬", label: "Mesajlar", badge: "3" },
  { href: "/kaydet", icon: "🔖", label: "Kaydettiklerim", badge: null },
  { href: "/profil", icon: "👤", label: "Profilim", badge: null },
];

const trendTopics = [
  { tag: "#AkGençler", count: "12.4K" },
  { tag: "#TürkiyeGençliği", count: "8.9K" },
  { tag: "#GençFikirler", count: "6.2K" },
  { tag: "#İnovasyon", count: "4.8K" },
  { tag: "#Teknoloji", count: "3.1K" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-20 space-y-4">
      {/* Profil Kartı */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-[#e63946] to-[#1d3557]"></div>
        <div className="px-4 pb-4 -mt-8">
          <div className="w-16 h-16 rounded-2xl border-4 border-white bg-gradient-to-br from-[#e63946] to-[#1d3557] flex items-center justify-center shadow-md mb-2">
            <span className="text-white font-black text-xl">AG</span>
          </div>
          <h3 className="font-bold text-[#1a1a2e] text-sm">Ak Genç</h3>
          <p className="text-xs text-[#6c757d]">@akgenc_tr</p>
          <div className="flex gap-4 mt-3">
            <div className="text-center">
              <p className="font-bold text-[#1a1a2e] text-sm">248</p>
              <p className="text-xs text-[#6c757d]">Gönderi</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-[#1a1a2e] text-sm">1.2K</p>
              <p className="text-xs text-[#6c757d]">Takipçi</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-[#1a1a2e] text-sm">890</p>
              <p className="text-xs text-[#6c757d]">Takip</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigasyon */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] p-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              pathname === item.href
                ? "bg-[#fff5f5] text-[#e63946]"
                : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#1a1a2e]"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium text-sm flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-[#e63946] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Trend Konular */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] p-4">
        <h3 className="font-bold text-[#1a1a2e] text-sm mb-3 flex items-center gap-2">
          <span>🔥</span> Trend Konular
        </h3>
        {trendTopics.map((topic, i) => (
          <div key={i} className="flex items-center justify-between py-2 cursor-pointer hover:bg-[#f8f9fa] -mx-4 px-4 rounded-xl transition-colors group">
            <div>
              <p className="text-xs text-[#6c757d]">#{i + 1} Trend</p>
              <p className="font-semibold text-sm text-[#1a1a2e] group-hover:text-[#e63946] transition-colors">{topic.tag}</p>
            </div>
            <span className="text-xs text-[#6c757d]">{topic.count} gönderi</span>
          </div>
        ))}
      </div>
    </div>
  );
}
