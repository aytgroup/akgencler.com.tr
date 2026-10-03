"use client";

import { useState } from "react";

const stories = [
  { id: 1, name: "Senin", avatar: "AG", isOwn: true, seen: false },
  { id: 2, name: "Ahmet K.", avatar: "AK", isOwn: false, seen: false },
  { id: 3, name: "Zeynep M.", avatar: "ZM", isOwn: false, seen: false },
  { id: 4, name: "Burak T.", avatar: "BT", isOwn: false, seen: true },
  { id: 5, name: "Selin Ö.", avatar: "SÖ", isOwn: false, seen: false },
  { id: 6, name: "Emre Y.", avatar: "EY", isOwn: false, seen: true },
  { id: 7, name: "Ayşe D.", avatar: "AD", isOwn: false, seen: false },
  { id: 8, name: "Can B.", avatar: "CB", isOwn: false, seen: true },
];

const colors = [
  "from-[#e63946] to-[#c1121f]",
  "from-[#1d3557] to-[#457b9d]",
  "from-[#e63946] to-[#457b9d]",
  "from-[#2d6a4f] to-[#40916c]",
  "from-[#e76f51] to-[#f4a261]",
  "from-[#457b9d] to-[#1d3557]",
  "from-[#c1121f] to-[#e63946]",
  "from-[#40916c] to-[#2d6a4f]",
];

export default function StoryBar() {
  const [activeStory, setActiveStory] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] p-4 mb-4">
      <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
        {stories.map((story, i) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story.id)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
          >
            <div className={`p-0.5 rounded-2xl ${story.seen ? "bg-[#e9ecef]" : "story-ring"}`}>
              <div className={`w-14 h-14 rounded-[14px] bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center border-2 border-white relative`}>
                {story.isOwn ? (
                  <>
                    <span className="text-white font-black text-sm">{story.avatar}</span>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#e63946] rounded-full border-2 border-white flex items-center justify-center">
                      <svg width="8" height="8" fill="white" viewBox="0 0 24 24">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </div>
                  </>
                ) : (
                  <span className="text-white font-bold text-xs">{story.avatar}</span>
                )}
              </div>
            </div>
            <span className={`text-xs font-medium truncate w-16 text-center ${story.seen ? "text-[#adb5bd]" : "text-[#1a1a2e]"}`}>
              {story.name}
            </span>
          </button>
        ))}
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setActiveStory(null)}
        >
          <div className="w-80 h-[560px] bg-gradient-to-br from-[#e63946] to-[#1d3557] rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-4 left-4 right-4 flex gap-1">
              {[1,2,3].map(i => (
                <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                  <div className={`h-full bg-white rounded-full ${i === 1 ? "w-full" : "w-0"}`}></div>
                </div>
              ))}
            </div>
            <div className="absolute top-10 left-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-xs">AK</span>
              </div>
              <span className="text-white font-semibold text-sm">Ak Genç</span>
              <span className="text-white/60 text-xs">2 sa</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white font-bold text-2xl text-center px-8">
                🇹🇷<br/>Türkiye'nin geleceği<br/>biziz!
              </p>
            </div>
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white"
              onClick={() => setActiveStory(null)}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}