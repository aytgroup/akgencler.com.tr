"use client";

import { useState } from "react";

interface Post {
  id: number;
  author: { name: string; username: string; avatar: string; verified: boolean };
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  tags: string[];
  liked: boolean;
  bookmarked: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onBookmark: () => void;
}

const gradients: Record<string, string> = {
  gradient1: "from-[#e63946] via-[#457b9d] to-[#1d3557]",
  gradient2: "from-[#2d6a4f] via-[#40916c] to-[#457b9d]",
};

export default function PostCard({ post, onLike, onBookmark }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [likeAnim, setLikeAnim] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    setLikeAnim(true);
    setTimeout(() => setLikeAnim(false), 300);
    onLike();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#e9ecef] overflow-hidden card-hover">
      {/* Başlık */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e63946] to-[#1d3557] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-bold text-sm">{post.author.avatar}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-[#1a1a2e] text-sm">{post.author.name}</h4>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-[#e63946] rounded-full flex items-center justify-center">
                    <svg width="8" height="8" fill="white" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                )}
              </div>
              <p className="text-xs text-[#6c757d]">@{post.author.username} · {post.time}</p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-lg hover:bg-[#f8f9fa] flex items-center justify-center transition-colors text-[#6c757d]">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>
        </div>
      </div>
      {/* İçerik */}
      <div className="px-4 pb-3">
        <p className="text-sm text-[#1a1a2e] leading-relaxed">{post.content}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs text-[#457b9d] font-medium hover:text-[#e63946] cursor-pointer transition-colors">{tag}</span>
            ))}
          </div>
        )}
      </div>
      {/* Görsel */}
      {post.image && (
        <div className={`mx-4 mb-3 h-48 rounded-xl bg-gradient-to-br ${gradients[post.image]} flex items-center justify-center`}>
          <span className="text-white/60 text-4xl">🖼️</span>
        </div>
      )}
      {/* İstatistikler */}
      <div className="px-4 pb-2 flex items-center gap-4 text-xs text-[#6c757d]">
        <span>❤️ {post.likes.toLocaleString("tr-TR")} beğeni</span>
        <span>💬 {post.comments} yorum</span>
        <span>🔄 {post.shares} paylaşım</span>
      </div>
      {/* Aksiyon Butonları */}
      <div className="px-3 py-2 border-t border-[#f8f9fa] flex items-center gap-1">
        <button onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all duration-200 text-sm font-medium ${post.liked ? "text-[#e63946] bg-[#fff5f5]" : "text-[#6c757d] hover:text-[#e63946] hover:bg-[#fff5f5]"} ${likeAnim ? "like-animate" : ""}`}>
          <svg width="16" height="16" fill={post.liked ? "#e63946" : "none"} stroke={post.liked ? "#e63946" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span>{post.liked ? "Beğenildi" : "Beğen"}</span>
        </button>
        <button onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-[#6c757d] hover:text-[#457b9d] hover:bg-[#f0f7ff] transition-all duration-200">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Yorum</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium text-[#6c757d] hover:text-[#2d6a4f] hover:bg-[#f0fff4] transition-all duration-200">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          <span>Paylaş</span>
        </button>
        <button onClick={onBookmark}
          className={`w-10 flex items-center justify-center py-2 rounded-xl transition-all duration-200 ${post.bookmarked ? "text-[#1d3557] bg-[#f0f4ff]" : "text-[#6c757d] hover:text-[#1d3557] hover:bg-[#f0f4ff]"}`}>
          <svg width="16" height="16" fill={post.bookmarked ? "#1d3557" : "none"} stroke={post.bookmarked ? "#1d3557" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
            <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
        </button>
      </div>
      {/* Yorum Alanı */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-[#f8f9fa] pt-3 animate-fade-in">
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e63946] to-[#1d3557] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">AG</span>
            </div>
            <div className="flex-1 flex gap-2">
              <input type="text" value={commentText} onChange={e => setCommentText(e.target.value)}
                placeholder="Yorumunu yaz..."
                className="flex-1 text-sm bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-3 py-2 focus:outline-none focus:border-[#e63946] transition-colors placeholder-[#adb5bd]"
              />
              <button className="btn-primary text-xs py-2 px-3">Gönder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
