"use client";

import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { allProducts } from "@/lib/catalog";

const productSlugByName = new Map(
  allProducts.map((product) => [product.name, product.slug]),
);
const escapedNames = allProducts.map((product) =>
  product.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
);
const inlinePattern = new RegExp(
  `\\*\\*(.+?)\\*\\*|(${escapedNames.join("|")})`,
  "g",
);

function renderMessageContent(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  inlinePattern.lastIndex = 0;
  while ((match = inlinePattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const boldContent = match[1];
    const plainProductName = match[2];
    const content = plainProductName ?? boldContent ?? "";
    const slug = productSlugByName.get(content);

    if (slug) {
      nodes.push(
        <Link
          key={key++}
          href={`/products/${slug}`}
          className="font-semibold text-neon-cyan underline decoration-neon-cyan/50 underline-offset-2 hover:text-neon-magenta hover:decoration-neon-magenta"
        >
          {content}
        </Link>,
      );
    } else if (boldContent) {
      nodes.push(
        <strong key={key++} className="text-foreground">
          {boldContent}
        </strong>,
      );
    }

    lastIndex = inlinePattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

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
        className="neon-button fixed right-6 bottom-6 rounded-md bg-surface px-5 py-3 text-sm font-semibold tracking-wide uppercase"
      >
        Build your setup
      </button>
    );
  }

  return (
    <div className="neon-border fixed right-6 bottom-6 flex h-128 w-96 max-w-[calc(100vw-3rem)] flex-col rounded-lg bg-surface">
      <div className="flex items-center justify-between border-b border-neon-cyan/30 p-4">
        <span className="font-display text-sm font-bold tracking-wide text-neon-cyan uppercase">
          Fractal Pattern Assistant
        </span>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
          className="text-muted hover:text-neon-magenta"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        {messages.length === 0 && (
          <p className="text-muted">
            Tell me about your use case, space, and budget, and I&apos;ll
            recommend a setup.
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={
              message.role === "user"
                ? "ml-8 rounded-lg border border-neon-magenta/40 bg-neon-magenta/10 p-3"
                : "mr-8 rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 p-3 whitespace-pre-wrap"
            }
          >
            {renderMessageContent(getMessageText(message.parts))}
          </div>
        ))}
        {isBusy && <p className="mr-8 text-muted">Thinking…</p>}
        {error && (
          <p className="mr-8 text-neon-red">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-neon-cyan/30 p-3"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. hybrid work setup, budget €2000"
          className="flex-1 rounded-md border border-neon-cyan/30 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:border-neon-cyan focus:outline-none"
        />
        <button
          type="submit"
          disabled={isBusy || !input.trim()}
          className="neon-button rounded-md px-4 py-2 text-sm font-semibold uppercase disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
