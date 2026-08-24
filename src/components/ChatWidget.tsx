"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

function getMessageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();

  const isBusy = status === "submitted" || status === "streaming";

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput("");
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        Build your setup
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 flex h-128 w-96 max-w-[calc(100vw-3rem)] flex-col rounded-lg border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
        <span className="font-medium">Fractal Pattern Assistant</span>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
          className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.length === 0 && (
          <p className="text-zinc-500 dark:text-zinc-400">
            Tell me about your use case, space, and budget, and I&apos;ll
            recommend a setup.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "ml-8 rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800"
                : "mr-8 rounded-lg bg-zinc-50 p-3 whitespace-pre-wrap dark:bg-zinc-900"
            }
          >
            {getMessageText(message.parts)}
          </div>
        ))}
        {isBusy && (
          <p className="mr-8 text-zinc-500 dark:text-zinc-400">Thinking…</p>
        )}
        {error && (
          <p className="mr-8 text-red-600 dark:text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-zinc-200 p-3 dark:border-zinc-800"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. hybrid work setup, budget $2000"
          className="flex-1 rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
        />
        <button
          type="submit"
          disabled={isBusy || !input.trim()}
          className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950"
        >
          Send
        </button>
      </form>
    </div>
  );
}
