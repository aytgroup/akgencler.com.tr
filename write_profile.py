part1 = '''"use client";
import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { useStore } from "@/store/useStore";
import FollowersModal from "@/components/FollowersModal";
import { showToast } from "@/components/Toast";
import Avatar from "@/components/Avatar";
import PostCard from "@/components/PostCard";

const TABS = ["Gönderiler", "Begeniler", "Kaydettiklerim", "Etiketlenenler"];

export default function ProfilPage() {
  const { id } = useParams<{ id: string }>();
  const { users, currentUser, posts, followUser, unfollowUser, updateProfile, stories } = useStore();
  const [tab, setTab] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLoc, setEditLoc] = useState("");
  const [editWeb, setEditWeb] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editBirth, setEditBirth] = useState("");
  const [followModal, setFollowModal] = useState<"followers" | "following" | null>(null);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const profileId = id === "me" ? "me" : id;
  const isMe = profileId === "me" || profileId === currentUser.id;
  const user = isMe ? currentUser : users.find((u) => u.id === profileId);

  if (!user) return (
    <PageLayout>
      <div style={{ background: "#fff", borderRadius: 18, padding: "48px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 36, margin: "0 0 12px" }}>🔍</p>
        <p style={{ fontWeight: 700, color: "#374151" }}>Kullanici bulunamadi</p>
      </div>
    </PageLayout>
  );

  const isFollowing = currentUser.following.includes(user.id);
  const userPosts = posts.filter((p) => p.authorId === user.id);
  const likedPosts = posts.filter((p) => p.likes.includes(user.id));
  const savedPosts = posts.filter((p) => p.bookmarks.includes(user.id));
  const displayed = tab === 0 ? userPosts : tab === 1 ? likedPosts : tab === 2 ? savedPosts : [];
  const profileUrl = `https://akgencler.com.tr/profil/${user.id}`;

  function openEdit() {
    setEditName(currentUser.name);
    setEditUsername(currentUser.username);
    setEditBio(currentUser.bio);
    setEditLoc(currentUser.location);
    setEditWeb(currentUser.website);
    setEditOpen(true);
  }

  function saveEdit() {
    updateProfile({ name: editName, bio: editBio, location: editLoc, website: editWeb });
    setEditOpen(false);
    showToast("Profil guncellendi");
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setCoverPhoto(ev.target?.result as string); showToast("Kapak fotografi guncellendi"); };
    reader.readAsDataURL(file);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setProfilePhoto(ev.target?.result as string); showToast("Profil fotografi guncellendi"); };
    reader.readAsDataURL(file);
  }

  function copyLink() {
    navigator.clipboard.writeText(profileUrl);
    showToast("Link kopyalandi");
    setShareOpen(false);
  }
'''

with open(r'c:\Users\agity\Desktop\akgencler.com.tr\write_profile_p1.py', 'w', encoding='utf-8') as f:
    f.write("content_part1 = " + repr(part1) + "\n")
print('part1 OK')
