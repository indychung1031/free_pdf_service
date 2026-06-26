/**
 * pdf-lib 로직 검증 (Node에서 실행)
 * 실행: node scripts/verify-pdf-lib.mjs
 */
import { PDFDocument, degrees } from "pdf-lib";
import { readFile, writeFile, mkdir, rm } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tmpDir = join(__dirname, ".tmp-verify");

function parsePageRange(input, pageCount) {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("empty");
  const indices = new Set();
  for (const part of trimmed.split(",").map((p) => p.trim())) {
    if (!part) continue;
    if (part.includes("-")) {
      const [a, b] = part.split("-").map((s) => Number(s.trim()));
      const end = b;
      if (end > pageCount) throw new Error("out of bounds");
      for (let p = a; p <= b; p++) indices.add(p - 1);
    } else {
      indices.add(Number(part) - 1);
    }
  }
  return [...indices].sort((a, b) => a - b);
}

async function makePdf(pageLabels) {
  const doc = await PDFDocument.create();
  for (const label of pageLabels) {
    const page = doc.addPage([200, 300]);
    page.drawText(label, { x: 50, y: 140, size: 20 });
  }
  return doc.save();
}

async function testMerge() {
  const a = await makePdf(["A1"]);
  const b = await makePdf(["B1", "B2"]);
  const out = await PDFDocument.create();
  for (const bytes of [a, b]) {
    const src = await PDFDocument.load(bytes);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const saved = await out.save();
  const check = await PDFDocument.load(saved);
  if (check.getPageCount() !== 3) throw new Error(`merge: expected 3 pages, got ${check.getPageCount()}`);
}

async function testDelete() {
  const bytes = await makePdf(["P1", "P2", "P3", "P4"]);
  const source = await PDFDocument.load(bytes);
  const toDelete = new Set(parsePageRange("2, 4", 4));
  const keep = [];
  for (let i = 0; i < 4; i++) if (!toDelete.has(i)) keep.push(i);
  const out = await PDFDocument.create();
  const pages = await out.copyPages(source, keep);
  pages.forEach((p) => out.addPage(p));
  const saved = await out.save();
  const check = await PDFDocument.load(saved);
  if (check.getPageCount() !== 2) throw new Error(`delete: expected 2 pages, got ${check.getPageCount()}`);
}

async function testReorder() {
  const bytes = await makePdf(["P1", "P2", "P3"]);
  const source = await PDFDocument.load(bytes);
  const order = [2, 0, 1];
  const out = await PDFDocument.create();
  for (const idx of order) {
    const [copied] = await out.copyPages(source, [idx]);
    out.addPage(copied);
  }
  const saved = await out.save();
  const check = await PDFDocument.load(saved);
  if (check.getPageCount() !== 3) throw new Error(`reorder: bad page count`);
}

async function testInsert() {
  const baseBytes = await makePdf(["B1", "B2"]);
  const insBytes = await makePdf(["I1"]);
  const base = await PDFDocument.load(baseBytes);
  const ins = await PDFDocument.load(insBytes);
  const [copied] = await base.copyPages(ins, [0]);
  base.insertPage(1, copied);
  const saved = await base.save();
  const check = await PDFDocument.load(saved);
  if (check.getPageCount() !== 3) throw new Error(`insert: expected 3 pages, got ${check.getPageCount()}`);
}

async function testPageRangeErrors() {
  let ok = false;
  try {
    parsePageRange("1-10", 5);
  } catch {
    ok = true;
  }
  if (!ok) throw new Error("page range should reject out of bounds");
}

async function main() {
  await mkdir(tmpDir, { recursive: true });
  const tests = [
    ["merge", testMerge],
    ["delete", testDelete],
    ["reorder", testReorder],
    ["insert", testInsert],
    ["pageRangeErrors", testPageRangeErrors],
  ];
  for (const [name, fn] of tests) {
    await fn();
    console.log(`✓ ${name}`);
  }
  await rm(tmpDir, { recursive: true, force: true });
  console.log("\nAll pdf-lib checks passed.");
}

main().catch((err) => {
  console.error("FAILED:", err);
  process.exit(1);
});
