// import { useState, useRef, useEffect } from "react";
export default function FeedbackMessage({ message }) {
  if (!message) return null;
  return (
    <div className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 ${
      message.type === "success"
        ? "bg-teal-50 text-teal-700 border border-teal-200"
        : "bg-red-50 text-red-600 border border-red-200"
    }`}>
      <span>{message.type === "success" ? "✓" : "✕"}</span>
      {message.text}
    </div>
  );
}