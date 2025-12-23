// src/components/ChatShell.tsx
"use client";

import { useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useLocalChat from "../hooks/useLocalChat";
import "@/styles/chat.css";

export default function ChatShell() {
  const { messages, addMessage, clearMessages } = useLocalChat();

  useEffect(() => {
    // optional: seed a welcome message if empty
    if (messages.length === 0) {
      addMessage({
        id: "sys-1",
        role: "bot",
        text: "Welcome to the mock chat — try sending a message!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <h1>Rohbot</h1>
        <button onClick={clearMessages} className="btn-small">
          Reset
        </button>
      </header>

      <main className="chat-main">
        <MessageList messages={messages} />
      </main>

      <footer className="chat-footer">
        <MessageInput onSend={(text) => addMessage({ role: "user", text })} />
      </footer>
    </div>
  );
}
