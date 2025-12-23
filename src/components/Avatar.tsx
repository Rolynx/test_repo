// src/components/Avatar.tsx
"use client";

export default function Avatar({ role }: { role: string }) {
  return <div className={`avatar ${role}`}>{role[0].toUpperCase()}</div>;
}
