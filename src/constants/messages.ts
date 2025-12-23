// src/constants/messages.ts
export type Role = "user" | "bot" | "system";

export type ChatMessage = {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
};

export const SAMPLE_MESSAGES: ChatMessage[] = [
  { id: "m1", role: "bot", text: "Hello! This is a mocked bot.", timestamp: Date.now() - 60000 },
];
