import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { compact, join as joinLines, map, pipe } from "es-toolkit/fp";

function dedentNestedQuestion(body) {
  return pipe(
    body.split(/\r?\n/),
    map((line) => (line.startsWith("    ") ? line.slice(4) : line)),
    joinLines("\n"),
  );
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "raw-questions.md"), "utf8");
const blocks = pipe(
  source.split(/^(?=\d+\. )/m),
  map((block) => block.trim()),
  compact(),
);

const questions = blocks.map((block) => {
  const match = /^(\d+)\. ([\s\S]*)$/.exec(block);

  if (!match) {
    throw new Error(`Unparsed block: ${block.slice(0, 80)}`);
  }

  return { id: Number(match[1]), body: dedentNestedQuestion(match[2]).trim() };
});

if (questions.length !== 801) {
  throw new Error(`Expected 801 questions, got ${questions.length}`);
}

for (const [index, question] of questions.entries()) {
  if (question.id !== index + 1) {
    throw new Error(`Expected id ${index + 1}, got ${question.id}`);
  }

  if (question.body.length === 0) {
    throw new Error(`Question ${question.id} has an empty body`);
  }
}

const statements = [
  "CREATE TABLE questions (",
  "  id INTEGER PRIMARY KEY,",
  "  body TEXT NOT NULL",
  ");",
  "",
  ...questions.map(
    (question) =>
      `INSERT INTO questions (id, body) VALUES (${question.id}, '${question.body.replaceAll("'", "''")}');`,
  ),
];

const output = join(root, "migrations", "0001_create_questions.sql");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${statements.join("\n")}\n`);
