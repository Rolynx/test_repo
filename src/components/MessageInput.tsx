// src/components/MessageInput.tsx
"use client";

import { useState } from "react";

export default function MessageInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <form className="message-input" onSubmit={submit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        aria-label="Message"
      />
      <button type="submit" className="btn">
        Send
      </button>
    </form>
  );
}
