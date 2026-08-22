import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const readText = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("portfolio uses current professional identity and contact links", async () => {
  const [page, timeline] = await Promise.all([
    readText("app/page.tsx"),
    readText("lib/data.ts"),
  ]);

  assert.match(page, /University of Michigan computer science engineering student/);
  assert.match(page, /mailto:ethmoon@umich\.edu/);
  assert.match(page, /linkedin\.com\/in\/ethan-moon-b9a2a7314/);
  assert.doesNotMatch(`${page}\n${timeline}`, /incoming University of Michigan|incoming Wolverine/i);
});

test("public career documents are present and non-trivial PDFs", async () => {
  for (const filename of ["Ethan_Moon_Resume.pdf", "Ethan_Moon_CV.pdf"]) {
    const url = new URL(`../public/${filename}`, import.meta.url);
    const [header, details] = await Promise.all([
      readFile(url).then((buffer) => buffer.subarray(0, 5).toString("ascii")),
      stat(url),
    ]);

    assert.equal(header, "%PDF-");
    assert.ok(details.size > 20_000, `${filename} should be a complete rendered document`);
  }
});

test("career-document source excludes superseded private and future-dated content", async () => {
  const source = await readText("scripts/build-career-documents.py");

  assert.doesNotMatch(source, /Spice Bush|September 2026|ethan-moon0108/);
  assert.match(source, /54 automated tests/);
  assert.match(source, /ethan-moon-b9a2a7314/);
});
