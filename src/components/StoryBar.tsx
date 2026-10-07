"use client";
import React, { useState, useEffect, useRef } from "react";
import { useStore, timeAgo } from "@/store/useStore";
import Avatar from "./Avatar";

const GRADS = [
  ["#e63946","#c1121f"], ["#1d3557","#457b9d"], ["#2d6a4f","#40916c"],
  ["#e76f51","#f4a261"], ["#457b9d","#1d3557"], ["#c1121f","#e63946"],
];

export default function StoryBar() {
  const { stories, currentUser, users, seeStory, addStory, deleteStory } = useStore();
  const [active, setActive] = useState<string | null>(null);
  const [storyIdx, setStoryIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [addOpen, setAddOpen] = useState(false);
  const [storyText, setStoryText] = useState("");
  const [selGrad, setSelGrad] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const myStories = stories.filter(s => s.authorId === "me");
  const otherGroups = users.filter(u => u.id !== "me").map(u => ({
    user: u,
    stories: stories.filter(s => s.authorId === u.id),
  })).filter(g => g.stories.length > 0);

  const activeStory = active ? stories.find(s => s.id === active) : null;
  const activeUser = activeStory ? (activeStory.authorId === "me" ? currentUser : users.find(u => u.id === activeStory.authorId)) : null;
  const userStories = activeStory ? stories.filter(s => s.authorId === activeStory.authorId) : [];

  useEffect(() => {
    if (!active) return;
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          const next = storyIdx + 1;
          if (next < userStories.length) { setStoryIdx(next); setActive(userStories[next].id); }
          else { setActive(null); setStoryIdx(0); }
          return 0;
        }
        return p + 2;
      });
    }, 100);
    if (active) seeStory(active);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  function openStory(id: string, idx = 0) { setActive(id); setStoryIdx(idx); }
  function submitStory() {
    if (!storyText.trim()) return;
    addStory(storyText, GRADS[selGrad]);
    setStoryText(""); setAddOpen(false);
  }

  return (
    <>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eef0f2", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 2, scrollbarWidth: "none" as const }}>
          {/* Add story button */}
          <button onClick={() => setAddOpen(true)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
                <Avatar name={currentUser.name} size={52} color={currentUser.avatarColor} />
              </div>
              <div style={{ position: "absolute", bottom: -1, right: -1, width: 20, height: 20, borderRadius: "50%", background: "#e63946", border: "2.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="9" height="9" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
              </div>
            </div>
            <span style={{ fontSize: 10.5, color: "#374151", fontWeight: 500, maxWidth: 58, textAlign: "center", whiteSpace: "nowrap" }}>Hikaye Ekle</span>
          </button>

          {/* My stories */}
          {myStories.length > 0 && (
            <button onClick={() => openStory(myStories[0].id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <div style={{ padding: 2.5, borderRadius: "50%", background: `linear-gradient(135deg,${currentUser.avatarColor[0]},${currentUser.avatarColor[1]})` }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", border: "2.5px solid #fff", overflow: "hidden" }}>
                  <Avatar name={currentUser.name} size={52} color={currentUser.avatarColor} />
                </div>
              </div>
              <span style={{ fontSize: 10.5, color: "#374151", fontWeight: 600, maxWidth: 58, textAlign: "center", whiteSpace: "nowrap" }}>Hikayem</span>
            </button>
          )}

          {/* Others' stories */}
          {otherGroups.map(({ user, stories: us }) => {
            const allSeen = us.every(s => s.seenBy.includes("me"));
            return (
              <button key={user.id} onClick={() => openStory(us[0].id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <div style={{ padding: 2.5, borderRadius: "50%", background: allSeen ? "#d1d5db" : `linear-gradient(135deg,${user.avatarColor[0]},${user.avatarColor[1]})` }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", border: "2.5px solid #fff", overflow: "hidden" }}>
                    <Avatar name={user.name} size={52} color={user.avatarColor} />
                  </div>
                </div>
                <span style={{ fontSize: 10.5, color: "#374151", fontWeight: 500, maxWidth: 58, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Viewer */}
      {active && activeStory && activeUser && (
        <div onClick={() => { setActive(null); setStoryIdx(0); }} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: 340, height: 600, borderRadius: 24, overflow: "hidden", background: `linear-gradient(160deg,${activeStory.gradient[0]},${activeStory.gradient[1]})`, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
            {/* Progress bars */}
            <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", gap: 4, zIndex: 10 }}>
              {userStories.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 2.5, borderRadius: 4, background: "rgba(255,255,255,0.3)", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#fff", width: i < storyIdx ? "100%" : i === storyIdx ? `${progress}%` : "0%" }}/>
                </div>
              ))}
            </div>
            {/* Header */}
            <div style={{ position: "absolute", top: 26, left: 12, right: 48, display: "flex", alignItems: "center", gap: 10, zIndex: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.5)", flexShrink: 0 }}>
                <Avatar name={activeUser.name} size={36} color={activeUser.avatarColor} />
              </div>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: "0 0 1px", lineHeight: 1 }}>{activeUser.name}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, margin: 0 }}>{timeAgo(activeStory.createdAt)}</p>
              </div>
            </div>
            {/* Close */}
            <button onClick={() => { setActive(null); setStoryIdx(0); }} style={{ position: "absolute", top: 16, right: 14, zIndex: 10, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,0.35)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            {/* Delete own story */}
            {activeStory.authorId === "me" && (
              <button onClick={() => { deleteStory(activeStory.id); setActive(null); }} style={{ position: "absolute", bottom: 24, right: 14, zIndex: 10, background: "rgba(230,57,70,0.85)", border: "none", borderRadius: 20, padding: "8px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Sil</button>
            )}
            {/* Story content */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
              <p style={{ color: "#fff", fontWeight: 900, fontSize: 26, textAlign: "center", lineHeight: 1.4, textShadow: "0 2px 16px rgba(0,0,0,0.4)", margin: 0, whiteSpace: "pre-line" }}>{activeStory.content}</p>
            </div>
            {/* Tap zones */}
            <div onClick={() => { if (storyIdx > 0) { const i = storyIdx-1; setStoryIdx(i); setActive(userStories[i].id); } }} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "40%", cursor: "pointer", zIndex: 5 }}/>
            <div onClick={() => { const i = storyIdx+1; if (i < userStories.length) { setStoryIdx(i); setActive(userStories[i].id); } else { setActive(null); setStoryIdx(0); } }} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", cursor: "pointer", zIndex: 5 }}/>
          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {addOpen && (
        <div onClick={() => setAddOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, padding: 28, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: "#111827", margin: "0 0 16px" }}>Hikaye Ekle</h3>
            <div style={{ borderRadius: 16, padding: 16, marginBottom: 14, minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${GRADS[selGrad][0]},${GRADS[selGrad][1]})` }}>
              <textarea value={storyText} onChange={e => setStoryText(e.target.value)} placeholder="Hikayen ne? 🇹🇷" rows={3} style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontWeight: 700, fontSize: 18, textAlign: "center", resize: "none", width: "100%", fontFamily: "inherit", lineHeight: 1.4 } as React.CSSProperties}/>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {GRADS.map((g, i) => (
                <button key={i} onClick={() => setSelGrad(i)} style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${g[0]},${g[1]})`, border: i === selGrad ? "3px solid #111827" : "3px solid transparent", cursor: "pointer", flexShrink: 0, padding: 0 }}/>
              ))}
            </div>
            <button onClick={submitStory} disabled={!storyText.trim()} style={{ width: "100%", padding: "12px 0", background: "linear-gradient(135deg,#e63946,#c1121f)", color: "#fff", border: "none", borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: storyText.trim() ? 1 : 0.4 }}>Paylaş</button>
          </div>
        </div>
      )}
    </>
  );
}

