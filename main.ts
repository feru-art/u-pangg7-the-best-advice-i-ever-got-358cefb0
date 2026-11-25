// The Best Advice I Ever Got
// Writes one sentence of received advice to /output/entry.txt.
// The sentence is assembled from the moment, the advice itself,
// and the echo it still carries, then checked against the gate:
// UTF-8 text, 1 to 200 characters, not only white space,
// exactly one sentence.

import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = "/output/entry.txt";
const MIN_CHARACTERS = 1;
const MAX_CHARACTERS = 200;

const MOMENT =
  "At my grandfather's funeral, my grandmother squeezed my hand and said";
const ADVICE = "call people while they can still answer";
const ECHO = "a sentence I hear every time I almost wait too long";

function composeSentence(): string {
  return `${MOMENT} ${ADVICE}, ${ECHO}.`;
}

function countCharacters(text: string): number {
  return [...text].length;
}

function countSentenceEndings(text: string): number {
  let endings = 0;
  for (const character of text) {
    if (character === "." || character === "!" || character === "?") {
      endings += 1;
    }
  }
  return endings;
}

function isSingleSentence(text: string): boolean {
  return countSentenceEndings(text) === 1 && text.endsWith(".");
}

function hasVisibleText(text: string): boolean {
  return text.trim().length > 0;
}

function passesGate(text: string): boolean {
  const characters = countCharacters(text);
  if (characters < MIN_CHARACTERS || characters > MAX_CHARACTERS) {
    return false;
  }
  if (!hasVisibleText(text)) {
    return false;
  }
  if (text.includes("\n") || text.includes("\r")) {
    return false;
  }
  return isSingleSentence(text);
}

function writeEntry(text: string): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, text, "utf8");
}

function main(): void {
  const sentence = composeSentence();
  if (!passesGate(sentence)) {
    throw new Error("sentence does not fit the gate");
  }
  writeEntry(sentence);
}

main();
