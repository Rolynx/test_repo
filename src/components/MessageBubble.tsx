// src/components/MessageBubble.tsx
"use client";

import type { ChatMessage } from "@/constants/messages";
import Avatar from "./Avatar";

export default function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={isUser ? "bubble user" : "bubble bot"}>
      <Avatar role={message.role} />
      <div className="bubble-content">
        <div className="bubble-text">{message.text}</div>
        <div className="bubble-meta">{new Date(message.timestamp).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
