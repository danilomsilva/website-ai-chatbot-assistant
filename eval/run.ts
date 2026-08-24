import { writeFile } from "node:fs/promises";

import { allProducts } from "../src/lib/catalog";
import { evalQuestions } from "./questions";

const CHAT_URL = process.env.EVAL_CHAT_URL ?? "http://localhost:3000/api/chat";

const catalogProductNames = new Set(allProducts.map((product) => product.name));

const REFUSAL_SIGNALS = [
  "don't have",
  "do not have",
  "can't help",
  "cannot help",
  "can only help",
  "cannot answer",
  "cannot assist",
  "cannot compare",
  "i cannot",
  "unable to",
  "not able to",
  "outside",
  "focus is",
  "i'm not able",
  "sorry",
];

function normalize(text: string): string {
  return text.replace(/,/g, "").toLowerCase();
}

async function askChat(question: string): Promise<string> {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        { id: "1", role: "user", parts: [{ type: "text", text: question }] },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Chat request failed: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6);
      if (payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload);
        if (event.type === "text-delta" && typeof event.delta === "string") {
          text += event.delta;
        }
      } catch {
        // ignore malformed/partial SSE chunks
      }
    }
  }

  return text;
}

function findHallucinatedProducts(response: string): string[] {
  const matches =
    response.match(/Fractal Pattern [A-Z][a-zA-Z]+ (Essential|Pro|Elite)/g) ??
    [];
  return [...new Set(matches)].filter(
    (name) => !catalogProductNames.has(name),
  );
}

interface EvalResult {
  id: string;
  type: "grounded" | "refusal";
  question: string;
  passed: boolean;
  hallucinations: string[];
  response: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const results: EvalResult[] = [];

  for (const [index, q] of evalQuestions.entries()) {
    // Stay under the API route's per-IP rate limit (5 requests/min) since
    // every eval request comes from this one machine.
    if (index > 0) await sleep(13_000);

    const response = await askChat(q.question);
    const normalized = normalize(response);
    const hallucinations = findHallucinatedProducts(response);

    let checkPassed: boolean;
    if (q.type === "grounded") {
      checkPassed = q.expectedSubstrings.every((substring) =>
        normalized.includes(normalize(substring)),
      );
    } else {
      const hasRefusalSignal = REFUSAL_SIGNALS.some((signal) =>
        normalized.includes(signal),
      );
      const leaked = (q.mustNotContain ?? []).some((substring) =>
        normalized.includes(normalize(substring)),
      );
      checkPassed = hasRefusalSignal && !leaked;
    }

    const passed = checkPassed && hallucinations.length === 0;
    results.push({
      id: q.id,
      type: q.type,
      question: q.question,
      passed,
      hallucinations,
      response,
    });

    console.log(`${passed ? "PASS" : "FAIL"} [${q.type}] ${q.id}: ${q.question}`);
    if (hallucinations.length > 0) {
      console.log(`  hallucinated products: ${hallucinations.join(", ")}`);
    }
  }

  const grounded = results.filter((r) => r.type === "grounded");
  const refusal = results.filter((r) => r.type === "refusal");
  const citationAccuracy = grounded.filter((r) => r.passed).length / grounded.length;
  const refusalCorrectness = refusal.filter((r) => r.passed).length / refusal.length;

  console.log("\n--- Summary ---");
  console.log(`Citation accuracy: ${(citationAccuracy * 100).toFixed(0)}% (${grounded.filter((r) => r.passed).length}/${grounded.length})`);
  console.log(`Refusal correctness: ${(refusalCorrectness * 100).toFixed(0)}% (${refusal.filter((r) => r.passed).length}/${refusal.length})`);

  const summary = {
    generatedAt: new Date().toISOString(),
    totalQuestions: results.length,
    citationAccuracy,
    refusalCorrectness,
    results,
  };

  await writeFile(
    new URL("./results.json", import.meta.url),
    JSON.stringify(summary, null, 2),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
