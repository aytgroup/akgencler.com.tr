"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

// ── Types ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  avatarColor: string[];
  bio: string;
  location: string;
  website: string;
  verified: boolean;
  followers: string[];
  following: string[];
  joinedAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
  likes: string[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl: string | null;
  imageGradient: string | null;
  tags: string[];
  likes: string[];
  comments: Comment[];
  shares: number;
  bookmarks: string[];
  createdAt: string;
}

export interface Story {
  id: string;
  authorId: string;
  content: string;
  gradient: string[];
  seenBy: string[];
  createdAt: string;
  expiresAt: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "event";
  fromId: string;
  targetId?: string;
  text: string;
  read: boolean;
  createdAt: string;
}

export const PAL = ["#e63946","#1d3557","#2d6a4f","#e76f51","#457b9d","#c1121f","#40916c","#f4a261"];
export function avatarBg(name: string) { return PAL[name.charCodeAt(0) % PAL.length]; }

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "Az önce";
  if (m < 60) return `${m} dk`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} sa`;
  const d = Math.floor(h / 24);
  if (d < 7)  return `${d} gün`;
  return new Date(iso).toLocaleDateString("tr-TR", { day:"numeric", month:"short" });
}

// ── Seed Users ───────────────────────────────────────────────
const SEED_USERS: User[] = [
  { id:"u1", name:"Ahmet Kaya",    username:"ahmetkaya_tr", avatar:null, avatarColor:["#1d3557","#457b9d"], bio:"Girişimci & Teknoloji 🚀", location:"İstanbul", website:"ahmetkaya.dev", verified:true,  followers:["u2","u3","u4","me"], following:["u2","u3","me"],       joinedAt:"2023-03-10" },
  { id:"u2", name:"Zeynep Mercan", username:"zeynepmercan", avatar:null, avatarColor:["#e63946","#c1121f"], bio:"TÜBİTAK Araştırmacısı 🔬", location:"Ankara",   website:"",            verified:false, followers:["u1","u3","me"],      following:["u1","u4"],           joinedAt:"2023-06-01" },
  { id:"u3", name:"Burak Tekin",   username:"burak_tekin",  avatar:null, avatarColor:["#2d6a4f","#40916c"], bio:"Genç Lider 🏆",            location:"İzmir",    website:"",            verified:true,  followers:["u1","u2"],           following:["u1","u2","u4","me"], joinedAt:"2023-09-15" },
  { id:"u4", name:"Selin Öztürk",  username:"selinozt",     avatar:null, avatarColor:["#e76f51","#f4a261"], bio:"Eğitim Uzmanı 📚",          location:"Bursa",    website:"",            verified:false, followers:["u3"],                following:["u1","u3"],           joinedAt:"2024-01-20" },
  { id:"u5", name:"Emre Yıldız",   username:"emreyildiz42", avatar:null, avatarColor:["#457b9d","#1d3557"], bio:"YZ Araştırmacısı 🤖",       location:"İstanbul", website:"",            verified:true,  followers:["u1","u2","u3","me"], following:["u1","u2"],           joinedAt:"2023-11-05" },
];

const SEED_ME: User = {
  id:"me", name:"Ak Genç", username:"akgenc_tr", avatar:null,
  avatarColor:["#e63946","#c1121f"], bio:"Türkiye'nin geleceğiyiz! 🇹🇷",
  location:"Türkiye", website:"", verified:false,
  followers:["u1","u3","u5"], following:["u1","u2","u5"], joinedAt:"2024-03-01",
};

const SEED_POSTS: Post[] = [
  { id:"p1", authorId:"u1", content:"Türkiye'de genç girişimciler için muazzam fırsatlar var. 🚀 Son 5 yılda %340 büyüme!", imageUrl:null, imageGradient:"linear-gradient(135deg,#1d3557,#457b9d)", tags:["#girişim","#startup"], likes:["u2","u3","me"], comments:[{id:"c1",authorId:"u2",text:"Kesinlikle harika!",createdAt:"2026-10-07T08:00:00Z",likes:["u1"]}], shares:12, bookmarks:["me"], createdAt:"2026-10-07T06:00:00Z" },
  { id:"p2", authorId:"u2", content:"TÜBİTAK'tan destek aldığımı öğrendim! 🎉 Araştırma projem onaylandı. İnanmaya devam edin.", imageUrl:null, imageGradient:"linear-gradient(135deg,#e63946,#c1121f)", tags:["#tubitak","#bilim"], likes:["u1","u3","u4","u5","me"], comments:[], shares:67, bookmarks:["u1","u3"], createdAt:"2026-10-07T04:00:00Z" },
  { id:"p3", authorId:"u3", content:"İstanbul'da gençlik zirvesine katıldım. 500+ genç lider bir aradaydı! 📝", imageUrl:null, imageGradient:null, tags:["#liderlik","#zirve"], likes:["u1","u4"], comments:[{id:"c2",authorId:"u1",text:"Harika etkinlikti!",createdAt:"2026-10-06T20:00:00Z",likes:[]}], shares:8, bookmarks:[], createdAt:"2026-10-06T18:00:00Z" },
  { id:"p4", authorId:"u4", content:"Geçen ay 3 kurs, 2 kitap, bir mentorluk programı. Kendinize yatırım yapın! 💪", imageUrl:null, imageGradient:"linear-gradient(135deg,#2d6a4f,#52b788)", tags:["#eğitim","#gelişim"], likes:["u2","u3"], comments:[], shares:23, bookmarks:["u2"], createdAt:"2026-10-06T12:00:00Z" },
  { id:"p5", authorId:"u5", content:"Yapay zeka dünyası inanılmaz hızla gelişiyor. Bu trendi yakalamazsak geri kalırız! 🤖🇹🇷", imageUrl:null, imageGradient:"linear-gradient(135deg,#457b9d,#1d3557)", tags:["#yapayZeka","#teknoloji"], likes:["u1","u2","u3","me"], comments:[{id:"c3",authorId:"me",text:"Biz de çalışmalar yapıyoruz.",createdAt:"2026-10-06T10:00:00Z",likes:["u5"]}], shares:89, bookmarks:["u1","u3","me"], createdAt:"2026-10-06T08:00:00Z" },
  { id:"p6", authorId:"u1", content:"Yeni ortaklık anlaşmamızı imzaladık 🤝 Büyük işler geliyor!", imageUrl:null, imageGradient:null, tags:["#iş"], likes:["u2","me"], comments:[], shares:5, bookmarks:[], createdAt:"2026-10-05T14:00:00Z" },
];

const SEED_STORIES: Story[] = [
  { id:"s1", authorId:"u1", content:"Sabah Koşusu ☀️\nİstanbul'dan merhaba!", gradient:["#1d3557","#457b9d"], seenBy:[], createdAt:"2026-10-07T05:00:00Z", expiresAt:"2026-10-08T05:00:00Z" },
  { id:"s2", authorId:"u2", content:"TÜBİTAK'tan müjde! 🎉\nProjem onaylandı!", gradient:["#e63946","#c1121f"], seenBy:["u1"], createdAt:"2026-10-07T04:00:00Z", expiresAt:"2026-10-08T04:00:00Z" },
  { id:"s3", authorId:"u3", content:"Gençlik Zirvesi 🏆\nİnanılmaz deneyim!", gradient:["#2d6a4f","#40916c"], seenBy:["u1","u2"], createdAt:"2026-10-07T03:00:00Z", expiresAt:"2026-10-08T03:00:00Z" },
  { id:"s4", authorId:"u5", content:"YZ Konferansı 🤖\nBugün sunum yapıyorum!", gradient:["#457b9d","#1d3557"], seenBy:[], createdAt:"2026-10-07T02:00:00Z", expiresAt:"2026-10-08T02:00:00Z" },
];

const SEED_MESSAGES: Message[] = [
  { id:"m1", from:"u1", to:"me", text:"Merhaba! Projen hakkında konuşmak istiyorum 🚀", createdAt:"2026-10-07T10:30:00Z", read:true },
  { id:"m2", from:"me", to:"u1", text:"Tabii, ne hakkında sormak istiyorsun?", createdAt:"2026-10-07T10:32:00Z", read:true },
  { id:"m3", from:"u1", to:"me", text:"Harika bir fikir! Yarın görüşebilir miyiz?", createdAt:"2026-10-07T10:35:00Z", read:false },
  { id:"m4", from:"u2", to:"me", text:"Projeyi inceledim, çok başarılı 👏", createdAt:"2026-10-07T09:15:00Z", read:false },
  { id:"m5", from:"me", to:"u2", text:"Teşekkür ederim, çok mutlu oldum!", createdAt:"2026-10-07T09:17:00Z", read:true },
  { id:"m6", from:"u3", to:"me", text:"Etkinliğe katılabilir misin?", createdAt:"2026-10-06T14:00:00Z", read:true },
  { id:"m7", from:"u5", to:"me", text:"Startup hakkında konuşalım mı?", createdAt:"2026-10-05T11:00:00Z", read:true },
];

const SEED_NOTIFS: Notification[] = [
  { id:"n1", type:"like",    fromId:"u1", targetId:"p1", text:"Ahmet Kaya gönderini beğendi",          read:false, createdAt:"2026-10-07T10:00:00Z" },
  { id:"n2", type:"comment", fromId:"u2", targetId:"p1", text:"Zeynep yorumuna yanıt verdi",            read:false, createdAt:"2026-10-07T09:00:00Z" },
  { id:"n3", type:"follow",  fromId:"u3",                text:"Burak Tekin seni takip etmeye başladı", read:false, createdAt:"2026-10-07T08:00:00Z" },
  { id:"n4", type:"mention", fromId:"u5", targetId:"p5", text:"Emre Yıldız senden bahsetti",           read:true,  createdAt:"2026-10-06T15:00:00Z" },
  { id:"n5", type:"event",   fromId:"u1",                text:"Gençlik Zirvesi yarın başlıyor! 🎯",    read:true,  createdAt:"2026-10-06T12:00:00Z" },
];

// ── Store Interface ──────────────────────────────────────────
interface AppState {
  currentUser: User;
  isLoggedIn: boolean;
  login: (name: string, username: string, bio: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  users: User[];
  getUserById: (id: string) => User | undefined;
  followUser: (targetId: string) => void;
  unfollowUser: (targetId: string) => void;
  posts: Post[];
  addPost: (content: string, imageGradient?: string) => void;
  deletePost: (postId: string) => void;
  likePost: (postId: string) => void;
  bookmarkPost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  deleteComment: (postId: string, commentId: string) => void;
  sharePost: (postId: string) => void;
  stories: Story[];
  addStory: (content: string, gradient: string[]) => void;
  seeStory: (storyId: string) => void;
  deleteStory: (storyId: string) => void;
  messages: Message[];
  sendMessage: (toId: string, text: string) => void;
  markMessagesRead: (fromId: string) => void;
  notifications: Notification[];
  markNotifRead: (id: string) => void;
  markAllNotifsRead: () => void;
  addNotification: (n: Omit<Notification, "id" | "createdAt">) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  joinedEvents: number[];
  toggleEvent: (id: number) => void;
  joinedCommunities: number[];
  toggleCommunity: (id: number) => void;
}

// ── Store ────────────────────────────────────────────────────
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: SEED_ME,
      isLoggedIn: false,

      login: (name, username, bio) => {
        const existing = get().users.find(u => u.username === username);
        if (existing) { set({ currentUser: existing, isLoggedIn: true }); }
        else { const nu: User = { ...SEED_ME, name, username, bio, joinedAt: new Date().toISOString().split("T")[0] }; set({ currentUser: nu, isLoggedIn: true }); }
      },

      logout: () => set({ isLoggedIn: false, currentUser: SEED_ME }),

      updateProfile: (data) => set(s => ({
        currentUser: { ...s.currentUser, ...data },
        users: s.users.map(u => u.id === "me" ? { ...u, ...data } : u),
      })),

      users: [...SEED_USERS, SEED_ME],

      getUserById: (id) => id === "me" ? get().currentUser : get().users.find(u => u.id === id),

      followUser: (targetId) => {
        const me = get().currentUser;
        if (me.following.includes(targetId)) return;
        set(s => ({
          currentUser: { ...s.currentUser, following: [...s.currentUser.following, targetId] },
          users: s.users.map(u => u.id === targetId ? { ...u, followers: [...u.followers, "me"] } : u.id === "me" ? { ...u, following: [...u.following, targetId] } : u),
        }));
        get().addNotification({ type: "follow", fromId: "me", text: `${me.name} seni takip etmeye başladı`, read: false });
      },

      unfollowUser: (targetId) => set(s => ({
        currentUser: { ...s.currentUser, following: s.currentUser.following.filter(id => id !== targetId) },
        users: s.users.map(u => u.id === targetId ? { ...u, followers: u.followers.filter(id => id !== "me") } : u.id === "me" ? { ...u, following: u.following.filter(id => id !== targetId) } : u),
      })),

      posts: SEED_POSTS,

      addPost: (content, imageGradient) => {
        const tags = content.match(/#\w+/g) || [];
        const p: Post = { id: uuidv4(), authorId: "me", content, imageUrl: null, imageGradient: imageGradient || null, tags, likes: [], comments: [], shares: 0, bookmarks: [], createdAt: new Date().toISOString() };
        set(s => ({ posts: [p, ...s.posts] }));
      },

      deletePost: (postId) => set(s => ({ posts: s.posts.filter(p => p.id !== postId) })),

      likePost: (postId) => set(s => ({
        posts: s.posts.map(p => p.id !== postId ? p : { ...p, likes: p.likes.includes("me") ? p.likes.filter(id => id !== "me") : [...p.likes, "me"] }),
      })),

      bookmarkPost: (postId) => set(s => ({
        posts: s.posts.map(p => p.id !== postId ? p : { ...p, bookmarks: p.bookmarks.includes("me") ? p.bookmarks.filter(id => id !== "me") : [...p.bookmarks, "me"] }),
      })),

      addComment: (postId, text) => {
        const c: Comment = { id: uuidv4(), authorId: "me", text, createdAt: new Date().toISOString(), likes: [] };
        set(s => ({ posts: s.posts.map(p => p.id === postId ? { ...p, comments: [...p.comments, c] } : p) }));
      },

      likeComment: (postId, commentId) => set(s => ({
        posts: s.posts.map(p => p.id !== postId ? p : {
          ...p, comments: p.comments.map(c => c.id !== commentId ? c : { ...c, likes: c.likes.includes("me") ? c.likes.filter(id => id !== "me") : [...c.likes, "me"] }),
        }),
      })),

      deleteComment: (postId, commentId) => set(s => ({
        posts: s.posts.map(p => p.id === postId ? { ...p, comments: p.comments.filter(c => c.id !== commentId) } : p),
      })),

      sharePost: (postId) => set(s => ({ posts: s.posts.map(p => p.id === postId ? { ...p, shares: p.shares + 1 } : p) })),

      stories: SEED_STORIES,

      addStory: (content, gradient) => {
        const st: Story = { id: uuidv4(), authorId: "me", content, gradient, seenBy: [], createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86400000).toISOString() };
        set(s => ({ stories: [st, ...s.stories] }));
      },

      seeStory: (storyId) => set(s => ({ stories: s.stories.map(st => st.id === storyId && !st.seenBy.includes("me") ? { ...st, seenBy: [...st.seenBy, "me"] } : st) })),

      deleteStory: (storyId) => set(s => ({ stories: s.stories.filter(st => st.id !== storyId) })),

      messages: SEED_MESSAGES,

      sendMessage: (toId, text) => {
        const m: Message = { id: uuidv4(), from: "me", to: toId, text, createdAt: new Date().toISOString(), read: false };
        set(s => ({ messages: [...s.messages, m] }));
      },

      markMessagesRead: (fromId) => set(s => ({ messages: s.messages.map(m => m.from === fromId && m.to === "me" ? { ...m, read: true } : m) })),

      notifications: SEED_NOTIFS,
      markNotifRead: (id) => set(s => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),
      markAllNotifsRead: () => set(s => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),
      addNotification: (n) => { const nn: Notification = { ...n, id: uuidv4(), createdAt: new Date().toISOString() }; set(s => ({ notifications: [nn, ...s.notifications] })); },

      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
      joinedEvents: [],
      toggleEvent: (id) => set(s => ({ joinedEvents: s.joinedEvents.includes(id) ? s.joinedEvents.filter(x => x !== id) : [...s.joinedEvents, id] })),
      joinedCommunities: [1, 3, 6],
      toggleCommunity: (id) => set(s => ({ joinedCommunities: s.joinedCommunities.includes(id) ? s.joinedCommunities.filter(x => x !== id) : [...s.joinedCommunities, id] })),
    }),
    { name: "akgencler-store", partialize: (s) => ({ currentUser: s.currentUser, isLoggedIn: s.isLoggedIn, users: s.users, posts: s.posts, stories: s.stories, messages: s.messages, notifications: s.notifications, joinedEvents: s.joinedEvents, joinedCommunities: s.joinedCommunities }) }
  )
);
