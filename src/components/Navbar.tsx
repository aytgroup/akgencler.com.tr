"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#e9ecef] h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e63946] to-[#1d3557] flex items-center justify-center shadow-md">
            <span className="text-white font-black text-sm">AK</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-black text-xl gradient-text">AKGENÇLER</span>
            <span className="block text-[10px] text-[#6c757d] -mt-1 font-medium">Türkiye'nin Gençlik Platformu</span>
          </div>
        </Link>

        {/* Arama */}
        <div className={`relative flex-1 max-w-md transition-all duration-200 ${searchFocused ? "max-w-lg" : ""}`}>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Kişi, konu veya topluluk ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#f8f9fa] border border-[#e9ecef] text-sm focus:outline-none focus:border-[#e63946] focus:bg-white transition-all duration-200 placeholder-[#adb5bd]"
          />
        </div>

        {/* Sağ Aksiyonlar */}
        <div className="flex items-center gap-2">
          
          {/* Gönderi Oluştur */}
          <button className="hidden sm:flex items-center gap-2 btn-primary text-sm py-2 px-4">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <span>Paylaş</span>
          </button>

          {/* Mesajlar */}
          <Link href="/mesajlar" className="relative w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#e9ecef] flex items-center justify-center hover:bg-white hover:border-[#e63946] transition-all duration-200 group">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:stroke-[#e63946] transition-colors">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e63946] rounded-full text-white text-[10px] font-bold flex items-center justify-center">3</span>
          </Link>

          {/* Bildirimler */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-10 h-10 rounded-xl bg-[#f8f9fa] border border-[#e9ecef] flex items-center justify-center hover:bg-white hover:border-[#e63946] transition-all duration-200 group"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="group-hover:stroke-[#e63946] transition-colors">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e63946] rounded-full text-white text-[10px] font-bold flex items-center justify-center">5</span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-[#e9ecef] p-4 animate-fade-in z-50">
                <h3 className="font-bold text-[#1a1a2e] mb-3">Bildirimler</h3>
                {[
                  { icon: "❤️", text: "Ahmet gönderini beğendi", time: "2 dk" },
                  { icon: "💬", text: "Zeynep yorumuna yanıt verdi", time: "15 dk" },
                  { icon: "👥", text: "Mehmet seni takip etmeye başladı", time: "1 sa" },
                  { icon: "🔥", text: "Gönderin trend oldu!", time: "3 sa" },
                  { icon: "🎉", text: "Topluluk etkinliği başlıyor", time: "5 sa" },
                ].map((notif, i) => (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-[#f8f9fa] last:border-0 hover:bg-[#f8f9fa] -mx-4 px-4 rounded-xl cursor-pointer transition-colors">
                    <span className="text-xl">{notif.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1a1a2e]">{notif.text}</p>
                      <p className="text-xs text-[#adb5bd] mt-0.5">{notif.time} önce</p>
                    </div>
                    <div className="w-2 h-2 bg-[#e63946] rounded-full mt-1.5 flex-shrink-0"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profil */}
          <Link href="/profil" className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#e63946] flex-shrink-0 hover:shadow-md transition-all duration-200">
            <div className="w-full h-full bg-gradient-to-br from-[#e63946] to-[#1d3557] flex items-center justify-center">
              <span className="text-white font-bold text-sm">AG</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
