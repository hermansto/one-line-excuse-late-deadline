import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse, exactly as it should land in entry.txt.
const line =
  "I didn't miss the deadline. I was busy explaining to the calendar that time is a social construct and it simply refused to listen.";

// The grader mounts the repo read-only, so the only place we may
// write is the output directory it hands us through the environment.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read it back and make sure the file on disk is byte-for-byte the line:
// same text, same length, and no trailing newline sneaking in at the end.
const onDisk = readFileSync(target, "utf8");
if (onDisk !== line) {
  throw new Error("entry.txt does not match the expected line");
}
if (onDisk.endsWith("\n") || onDisk.length !== line.length) {
  throw new Error("entry.txt must hold exactly the line, with no trailing newline");
}

console.log(`Wrote ${line.length} characters to ${target}`);
