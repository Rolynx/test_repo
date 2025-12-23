// src/hooks/useLocalChat.ts
"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // add uuid to deps or swap with simple id generator
import type { ChatMessage } from "../constants/messages";

export default function useLocalChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function addMessage(msg: Partial<ChatMessage>) {
    const newMsg: ChatMessage = {
      id: msg.id ?? uuidv4(),
      role: msg.role ?? "user",
      text: msg.text ?? "",
      timestamp: Date.now(),
    };
    setMessages((s) => [...s, newMsg]);
    // optionally mock a bot reply:
    if (newMsg.role === "user") {
      setTimeout(() => {
        setMessages((s) => [
          ...s,
          { id: uuidv4(), role: "bot", text: `Echo: ${newMsg.text}`, timestamp: Date.now() },
        ]);
      }, 600);
    }
  }

  function clearMessages() {
    setMessages([]);
  }

  return { messages, addMessage, clearMessages };
}
