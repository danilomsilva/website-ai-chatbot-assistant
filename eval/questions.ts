export type EvalQuestion =
  | {
      id: string;
      type: "grounded";
      question: string;
      /** All of these (case-insensitive, commas ignored) must appear in the response. */
      expectedSubstrings: string[];
    }
  | {
      id: string;
      type: "refusal";
      question: string;
      /** If any of these appear, the model leaked info it should have refused. */
      mustNotContain?: string[];
    };

export const evalQuestions: EvalQuestion[] = [
  {
    id: "g1",
    type: "grounded",
    question: "What is the price of the Fractal Pattern Laptop Essential?",
    expectedSubstrings: ["Fractal Pattern Laptop Essential", "799"],
  },
  {
    id: "g2",
    type: "grounded",
    question: "How much RAM does the Fractal Pattern Laptop Elite have?",
    expectedSubstrings: ["Fractal Pattern Laptop Elite", "32"],
  },
  {
    id: "g3",
    type: "grounded",
    question: "What is the refresh rate of the Fractal Pattern Monitor Elite?",
    expectedSubstrings: ["Fractal Pattern Monitor Elite", "165"],
  },
  {
    id: "g4",
    type: "grounded",
    question: "What is the price of the Fractal Pattern Desktop Pro?",
    expectedSubstrings: ["Fractal Pattern Desktop Pro", "1499"],
  },
  {
    id: "g5",
    type: "grounded",
    question: "Does the Fractal Pattern Chair Pro have lumbar support?",
    expectedSubstrings: ["Fractal Pattern Chair Pro", "yes"],
  },
  {
    id: "g6",
    type: "grounded",
    question:
      "What is the maximum load capacity of the Fractal Pattern Desk Elite?",
    expectedSubstrings: ["Fractal Pattern Desk Elite", "100"],
  },
  {
    id: "g7",
    type: "grounded",
    question: "What connectivity does the Fractal Pattern Dock Elite offer?",
    expectedSubstrings: ["Fractal Pattern Dock Elite", "thunderbolt 4"],
  },
  {
    id: "g8",
    type: "grounded",
    question: "What is the price of the Fractal Pattern Hub Essential?",
    expectedSubstrings: ["Fractal Pattern Hub Essential", "39"],
  },
  {
    id: "g9",
    type: "grounded",
    question:
      "How many hours per day is the Fractal Pattern Chair Elite recommended for?",
    expectedSubstrings: ["Fractal Pattern Chair Elite", "12"],
  },
  {
    id: "g10",
    type: "grounded",
    question: "What is the price of the Fractal Pattern Monitor Pro?",
    expectedSubstrings: ["Fractal Pattern Monitor Pro", "399"],
  },
  {
    id: "r1",
    type: "refusal",
    question: "How long does shipping take to Canada?",
  },
  {
    id: "r2",
    type: "refusal",
    question: "What is your return policy?",
  },
  {
    id: "r3",
    type: "refusal",
    question: "What is the capital of France?",
    mustNotContain: ["paris"],
  },
  {
    id: "r4",
    type: "refusal",
    question: "Can you help me debug my Python code?",
  },
  {
    id: "r5",
    type: "refusal",
    question: "Which is better, your laptop or a MacBook?",
  },
];
