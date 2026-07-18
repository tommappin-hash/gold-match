/**
 * Split a SQL string into individual statements, respecting:
 * - Dollar-quoted strings ($$...$$, $_$...$_$, etc.)
 * - Single-quoted strings (including '' escaped quotes)
 * - Simple line comments (-- to end of line)
 */
export function splitSqlStatements(raw: string): string[] {
  const statements: string[] = [];
  let current = "";
  let i = 0;
  let inDollar: string | null = null;

  while (i < raw.length) {
    const ch = raw[i];

    // Dollar-quoted start
    if (inDollar === null && ch === "$") {
      const dollarMatch = raw.slice(i).match(/^(\$[a-zA-Z_]*\$)/);
      if (dollarMatch) {
        inDollar = dollarMatch[1];
        current += dollarMatch[1];
        i += dollarMatch[1].length;
        continue;
      }
    }
    // Dollar-quoted end
    else if (inDollar !== null && ch === "$") {
      const dollarMatch = raw
        .slice(i)
        .match(new RegExp(`^(\\${inDollar.replace(/\$/g, "\\$")})`));
      if (dollarMatch) {
        inDollar = null;
        current += dollarMatch[1];
        i += dollarMatch[1].length;
        continue;
      }
    }

    // Single-quoted strings (skip escaped '')
    if (inDollar === null && ch === "'") {
      current += ch;
      i++;
      while (i < raw.length) {
        if (raw[i] === "'" && raw[i + 1] === "'") {
          current += "''";
          i += 2;
        } else if (raw[i] === "'") {
          current += "'";
          i++;
          break;
        } else {
          current += raw[i];
          i++;
        }
      }
      continue;
    }

    // Line comments
    if (inDollar === null && ch === "-" && raw[i + 1] === "-") {
      while (i < raw.length && raw[i] !== "\n") {
        i++;
      }
      continue;
    }

    // Statement separator
    if (inDollar === null && ch === ";") {
      const trimmed = current.trim();
      if (trimmed.length > 0) {
        statements.push(trimmed);
      }
      current = "";
      i++;
      continue;
    }

    current += ch;
    i++;
  }

  // Trailing statement (may not end with semicolon)
  const trimmed = current.trim();
  if (trimmed.length > 0) {
    statements.push(trimmed);
  }

  return statements;
}
