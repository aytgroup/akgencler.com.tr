"use client";
import React from "react";
import { avatarBg } from "@/store/useStore";

interface Props {
  name: string;
  size?: number;
  color?: string[];
  className?: string;
  onClick?: () => void;
}

export default function Avatar({ name, size = 40, color, className = "", onClick }: Props) {
  const bg = color
    ? `linear-gradient(135deg,${color[0]},${color[1]})`
    : avatarBg(name);
  const initials = name
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const fontSize = Math.max(10, Math.floor(size * 0.32));

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: onClick ? "pointer" : "default",
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        userSelect: "none",
      }}
    >
      <span style={{ color: "#fff", fontWeight: 800, fontSize, letterSpacing: "-0.3px" }}>
        {initials}
      </span>
    </div>
  );
}
