// Kartu AS entry for The Best Advice I Ever Got.
// Emits a single received-advice sentence to /output/entry.txt.
// The sentence is built from three fragments: the packing scene,
// the permission my mother gave me, and the thirty years behind it.
// Before anything is written, the text must satisfy the gate:
// UTF-8, between 1 and 200 characters, visible content,
// exactly one sentence.

import { mkdirSync, writeFileSync } from "node:fs";

const TARGET_DIR = "/output";
const TARGET_FILE = "/output/entry.txt";
const LOWEST = 1;
const HIGHEST = 200;

const SCENE = "As she helped me pack to leave, my mother said";
const PERMISSION = "you do not have to suffer enough to earn leaving";
const WEIGHT = "and she had stayed thirty years to know";

function buildSentence(): string {
  return SCENE + " " + PERMISSION + ", " + WEIGHT + ".";
}

function countCodePoints(text: string): number {
  let total = 0;
  for (const _symbol of text) {
    total += 1;
  }
  return total;
}

function terminalMarks(text: string): number {
  const marks = [".", "!", "?"];
  let found = 0;
  for (const symbol of text) {
    if (marks.includes(symbol)) {
      found += 1;
    }
  }
  return found;
}

function acceptable(text: string): boolean {
  const size = countCodePoints(text);
  if (size < LOWEST || size > HIGHEST) {
    return false;
  }
  if (text.trim() === "") {
    return false;
  }
  if (text.includes("\n") || text.includes("\r")) {
    return false;
  }
  return terminalMarks(text) === 1 && text.endsWith(".");
}

function emit(text: string): void {
  mkdirSync(TARGET_DIR, { recursive: true });
  writeFileSync(TARGET_FILE, text, "utf8");
}

const sentence = buildSentence();
if (!acceptable(sentence)) {
  throw new Error("sentence rejected by the gate");
}
emit(sentence);
