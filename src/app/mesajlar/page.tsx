"use client";
import React, { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { useStore, timeAgo } from "@/store/useStore";
import Avatar from "@/components/Avatar";

export default function MesajlarPage() {
  const { users, messages, sendMessage, markMessagesRead, currentUser } = useStore();
  const [activeId, setActiveId] = useState("u1");
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const allContacts = users.filter(u => u.id !== "me");
  const activeUser = allContacts.find(u => u.id === activeId);
  const convo = messages
    .filter(m => (m.from === activeId && m.to === "me") || (m.from === "me" && m.to === activeId))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  const unreadFrom = (uid: string) => messages.filter(m => m.from === uid && m.to === "me" && !m.read).length;

  useEffect(() => { markMessagesRead(activeId); }, [activeId]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [convo.length]);
  function send() { if (!input.trim()) return; sendMessage(activeId, input.trim()); setInput(""); }

  return (
    <PageLayout>
      <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #eef0f2", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden", height: "calc(100vh - 100px)", display: "flex" }}>

        {/* Contact list */}
        <div style={{ width: 260, borderRight: "1px solid #f3f4f6", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "16px 16px 10px", borderBottom: "1px solid #f3f4f6" }}>
            <h2 style={{ fontWeight: 800, fontSize: 16, color: "#111827", margin: "0 0 10px" }}>💬 Mesajlar</h2>
            <input placeholder="Ara..." style={{ width: "100%", padding: "8px 14px", borderRadius: 20, background: "#f3f4f6", border: "none", outline: "none", fontSize: 13, color: "#374151", boxSizing: "border-box" as const }}/>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {allContacts.map(u => {
              const lastMsg = [...messages].filter(m => (m.from === u.id && m.to === "me") || (m.from === "me" && m.to === u.id)).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
              const unread = unreadFrom(u.id);
              const active = activeId === u.id;
              return (
                <div key={u.id} onClick={() => setActiveId(u.id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", background: active ? "#fff1f2" : "transparent", borderBottom: "1px solid #f9fafb" }}
                  onMouseOver={e => { if (!active) e.currentTarget.style.background = "#fafafa"; }}
                  onMouseOut={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <Avatar name={u.name} size={38} color={u.avatarColor} />
                    <div style={{ position: "absolute", bottom: -1, right: -1, width: 11, height: 11, borderRadius: "50%", background: "#22c55e", border: "2px solid #fff" }}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <p style={{ fontWeight: unread > 0 ? 700 : 600, fontSize: 13, color: "#111827", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</p>
                      {lastMsg && <span style={{ fontSize: 10, color: "#9ca3af" }}>{timeAgo(lastMsg.createdAt)}</span>}
                    </div>
                    {lastMsg && <p style={{ fontSize: 11.5, color: unread > 0 ? "#374151" : "#9ca3af", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: unread > 0 ? 600 : 400 }}>{lastMsg.from === "me" ? "Sen: " : ""}{lastMsg.text}</p>}
                  </div>
                  {unread > 0 && <span style={{ minWidth: 18, height: 18, background: "#e63946", borderRadius: "50%", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat area */}
        {activeUser && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ position: "relative" }}>
                <Avatar name={activeUser.name} size={36} color={activeUser.avatarColor} />
                <div style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid #fff" }}/>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#111827", margin: 0 }}>{activeUser.name}</p>
                <p style={{ fontSize: 11, color: "#22c55e", margin: 0 }}>🟢 Çevrimiçi</p>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 8, background: "#f8f9fa" }}>
              {convo.length === 0 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 8 }}>
                  <Avatar name={activeUser.name} size={56} color={activeUser.avatarColor} />
                  <p style={{ fontWeight: 700, color: "#374151", fontSize: 15, margin: 0 }}>{activeUser.name}</p>
                  <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>İlk mesajı sen gönder!</p>
                </div>
              )}
              {convo.map(msg => {
                const isMe = msg.from === "me";
                return (
                  <div key={msg.id} style={{ display: "flex", alignItems: "flex-end", gap: 8, justifyContent: isMe ? "flex-end" : "flex-start" }}>
                    {!isMe && <Avatar name={activeUser.name} size={24} color={activeUser.avatarColor} />}
                    <div style={{ maxWidth: "68%" }}>
                      <div style={{ padding: "9px 14px", borderRadius: 18, fontSize: 13, lineHeight: 1.5, background: isMe ? "#e63946" : "#fff", color: isMe ? "#fff" : "#1c1e21", borderBottomRightRadius: isMe ? 4 : 18, borderBottomLeftRadius: isMe ? 18 : 4, boxShadow: isMe ? "none" : "0 1px 3px rgba(0,0,0,0.08)" }}>
                        {msg.text}
                      </div>
                      <p style={{ fontSize: 10, color: "#9ca3af", margin: "3px 4px 0", textAlign: isMe ? "right" : "left" }}>{timeAgo(msg.createdAt)}</p>
                    </div>
                    {isMe && <Avatar name={currentUser.name} size={24} color={currentUser.avatarColor} />}
                  </div>
                );
              })}
              <div ref={bottomRef}/>
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 10, alignItems: "center" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
                placeholder={`${activeUser.name}'a mesaj yaz...`}
                style={{ flex: 1, background: "#f3f4f6", borderRadius: 24, padding: "10px 16px", fontSize: 13, border: "none", outline: "none", color: "#1c1e21", fontFamily: "inherit" }}/>
              <button onClick={send} disabled={!input.trim()} style={{ width: 38, height: 38, borderRadius: "50%", background: "#e63946", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: input.trim() ? 1 : 0.4 }}>
                <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
