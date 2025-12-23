"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
    >
      {label}
    </button>
  );
}
