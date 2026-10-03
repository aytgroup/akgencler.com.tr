"use client";

import { useState } from "react";
import PostCard from "./PostCard";

const initialPosts = [
  {
    id: 1,
    author: { name: "Ahmet Kaya", username: "ahmetkaya_tr", avatar: "AK", verified: true },
    content: "Türkiye'de genç girişimciler için muazzam fırsatlar var. Bugün üçüncü startup'ımı kurdum! 🚀 Hayallerinizin peşinden gidin gençler.",
    image: null, likes: 248, comments: 34, shares: 12,
    time: "2 saat önce", tags: ["#girişim", "#gençlik", "#startup"],
    liked: false, bookmarked: false,
  },
  {
    id: 2,
    author: { name: "Zeynep Mercan", username: "zeynepmercan", avatar: "ZM", verified: false },
    content: "Üniversite sınavına hazırlanırken bile proje üretmeye devam ettim. Bugün TÜBİTAK'tan destek aldığımı öğrendim! 🎉 İnanmaya devam edin.",
    image: "gradient1", likes: 512, comments: 89, shares: 67,
    time: "4 saat önce", tags: ["#tubitak", "#bilim", "#araştırma"],
    liked: true, bookmarked: false,
  },
  {
    id: 3,
    author: { name: "Burak Tekin", username: "burak_tekin", avatar: "BT", verified: true },
    content: "Bugün İstanbul'da gençlik zirvesine katıldım. 500'den fazla genç lider bir aradaydı. Türkiye'nin geleceği çok parlak! 📝",
    image: null, likes: 189, comments: 21, shares: 8,
    time: "6 saat önce", tags: ["#liderlik", "#zirve", "#istanbul"],
    liked: false, bookmarked: true,
  },
  {
    id: 4,
    author: { name: "Selin Öztürk", username: "selinozt", avatar: "SÖ", verified: false },
    content: "Geçen ay 3 online kurs tamamladım, 2 kitap okudum ve bir mentorluk programına başladım. Kendinize yatırım yapın! 💪",
    image: "gradient2", likes: 334, comments: 56, shares: 23,
    time: "8 saat önce", tags: ["#eğitim", "#kendigeliştirme"],
    liked: false, bookmarked: false,
  },
  {
    id: 5,
    author: { name: "Emre Yıldız", username: "emreyildiz42", avatar: "EY", verified: true },
    content: "Yapay zeka dünyası inanılmaz bir hızla gelişiyor. Türk gençleri olarak bu trendi yakalamamız şart. 🤖🇹🇷",
    image: null, likes: 671, comments: 112, shares: 89,
    time: "12 saat önce", tags: ["#yapayZeka", "#teknoloji"],
    liked: true, bookmarked: false,
  },
];

interface FeedProps {
  activeTab: "kesfet" | "akis" | "trend";
}

export default function Feed({ activeTab }: FeedProps) {
  const [feedPosts, setFeedPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = () => {
    if (!newPostText.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
      setFeedPosts(prev => [{
        id: prev.length + 1,
        author: { name: "Ak Genç", username: "akgenc_tr", avatar: "AG", verified: false },
        content: newPostText, image: null,
        likes: 0, comments: 0, shares: 0,
        time: "Az önce", tags: [],
        liked: false, bookmarked: false,
      }, ...prev]);
      setNewPostText("");
      setIsPosting(false);
    }, 800);
  };

  const handleLike = (id: number) => setFeedPosts(prev =>
    prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)
  );

  const handleBookmark = (id: number) => setFeedPosts(prev =>
    prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p)
  );

  const displayPosts = activeTab === "trend"
    ? [...feedPosts].sort((a, b) => b.likes - a.likes)
    : feedPosts;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] p-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e63946] to-[#1d3557] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">AG</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Düşüncelerini paylaş, Türkiye'ye ilham ver... 🇹🇷"
              rows={3}
              className="w-full resize-none text-sm text-[#1a1a2e] placeholder-[#adb5bd] bg-[#f8f9fa] rounded-xl p-3 border border-[#e9ecef] focus:outline-none focus:border-[#e63946] focus:bg-white transition-all duration-200"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2">
                {["📷", "🎥", "📊", "😊"].map((icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-lg bg-[#f8f9fa] border border-[#e9ecef] flex items-center justify-center hover:bg-[#fff5f5] hover:border-[#e63946] transition-all text-sm">{icon}</button>
                ))}
              </div>
              <button onClick={handlePost} disabled={!newPostText.trim() || isPosting}
                className="btn-primary text-sm py-1.5 px-5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                {isPosting ? <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Paylaşılıyor...</> : "Paylaş 🚀"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {displayPosts.map((post, i) => (
        <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
          <PostCard post={post} onLike={() => handleLike(post.id)} onBookmark={() => handleBookmark(post.id)} />
        </div>
      ))}
    </div>
  );
}
