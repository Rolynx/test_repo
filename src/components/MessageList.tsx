// src/components/MessageList.tsx
"use client";

import MessageBubble from "./MessageBubble";
import type { ChatMessage } from "@/constants/messages";

export default function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <ul className="message-list">
      {messages.map((m) => (
        <li key={m.id}>
          <MessageBubble message={m} />
        </li>
      ))}
    </ul>
  );
}
