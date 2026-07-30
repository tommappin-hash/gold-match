import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import puppeteer from "puppeteer";

const BOOK_DIR = "/home/team/shared/book";
const OUTPUT = "/home/team/shared/site/public/book.pdf";

const FILES = [
  "prologue-draft-1.md",
  "part-1-draft-1.md",
  "part-2-draft-1.md",
  "part-3-draft-1.md",
  "part-4-draft-1.md",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("Reading book files...");
  let combinedMd = "";

  for (const file of FILES) {
    const raw = readFileSync(join(BOOK_DIR, file), "utf-8");
    const lines = raw.split("\n");
    const processedLines: string[] = [];

    for (const line of lines) {
      if (line.startsWith("# ")) {
        const title = line.replace(/^# /, "").replace(/ — Draft.*$/, "").trim();
        processedLines.push(`<h1 class="part-title">${title}</h1>`);
        processedLines.push("");
      } else if (line.startsWith("## ")) {
        const title = line.replace(/^## /, "").trim();
        processedLines.push(`<h2 class="chapter-title">${title}</h2>`);
        processedLines.push("");
      } else {
        processedLines.push(line);
      }
    }
    combinedMd += processedLines.join("\n") + "\n\n";
  }

  const bodyHtml = marked.parse(combinedMd, { async: false }) as string;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Investing in Gold</title>
<style>
  @page {
    margin: 1in 0.85in;
    size: letter;
  }
  body {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 12pt;
    line-height: 1.7;
    color: #333;
    max-width: 100%;
  }

  /* Cover / Title */
  h1.part-title {
    font-size: 22pt;
    font-weight: bold;
    color: #b45309;
    margin-top: 36pt;
    margin-bottom: 18pt;
    padding-bottom: 8pt;
    border-bottom: 2pt solid #fcd34d;
    page-break-before: always;
  }
  h1.part-title:first-child {
    page-break-before: avoid;
  }

  h2.chapter-title {
    font-size: 15pt;
    font-weight: bold;
    color: #1f2937;
    margin-top: 28pt;
    margin-bottom: 12pt;
    page-break-after: avoid;
  }

  p {
    margin: 0 0 10pt 0;
    text-align: justify;
  }

  blockquote {
    margin: 14pt 0;
    padding: 10pt 16pt;
    border-left: 4pt solid #f59e0b;
    background: #fffbeb;
    font-style: italic;
    color: #92400e;
  }

  blockquote p {
    margin: 0;
  }

  hr {
    border: none;
    border-top: 1pt solid #e5e7eb;
    margin: 24pt 0;
  }

  strong {
    color: #1f2937;
  }

  em {
    color: #4b5563;
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: "networkidle0" });

    console.log("Generating PDF...");
    await page.pdf({
      path: OUTPUT,
      format: "Letter",
      margin: { top: "0.85in", bottom: "0.85in", left: "0.85in", right: "0.85in" },
      printBackground: true,
      displayHeaderFooter: false,
    });

    console.log(`PDF saved to ${OUTPUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
