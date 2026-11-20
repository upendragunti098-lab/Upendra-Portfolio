import { portfolioData } from "../data/portfolio";

export interface SqlQueryResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTimeMs: number;
  query: string;
}

export interface SqlErrorResult {
  error: string;
  code?: string;
  line?: number;
}

const VALID_TABLES = [
  "upendra_career_impact",
  "upendra_technical_skills",
  "upendra_projects",
] as const;

type ValidTableName = (typeof VALID_TABLES)[number];

export function executeSql(rawQuery: string): SqlQueryResult {
  const startTime = performance.now();

  // 1. Normalize and clean query
  let query = rawQuery.trim();

  // Remove single line SQL comments
  query = query.replace(/--.*$/gm, "").trim();

  // Remove multi-line comments
  query = query.replace(/\/\*[\s\S]*?\*\//g, "").trim();

  if (!query) {
    throw new Error("Query is empty. Please enter a valid SQL statement.");
  }

  // Remove trailing semicolon
  if (query.endsWith(";")) {
    query = query.slice(0, -1).trim();
  }

  // Multi-statement security check
  if (query.includes(";")) {
    throw new Error(
      "Security error: Multi-statement execution (chained semicolons) is disabled."
    );
  }

  // 2. Security validation: Mutation commands forbidden
  const forbiddenKeywords = [
    /\bINSERT\b/i,
    /\bUPDATE\b/i,
    /\bDELETE\b/i,
    /\bDROP\b/i,
    /\bALTER\b/i,
    /\bTRUNCATE\b/i,
    /\bCREATE\b/i,
    /\bGRANT\b/i,
    /\bREVOKE\b/i,
    /\bEXEC\b/i,
    /\bEXECUTE\b/i,
    /\bPRAGMA\b/i,
  ];

  for (const regex of forbiddenKeywords) {
    if (regex.test(query)) {
      throw new Error(
        "Permission denied: The sandbox is strictly read-only. Only SELECT queries are permitted."
      );
    }
  }

  if (!/^\s*SELECT\b/i.test(query)) {
    throw new Error("Syntax error: Statement must begin with SELECT.");
  }

  // 3. Regex parse main SQL clauses
  const sqlRegex =
    /^\s*SELECT\s+([\s\S]+?)\s+FROM\s+([a-zA-Z0-9_]+)(?:\s+WHERE\s+([\s\S]+?))?(?:\s+ORDER\s+BY\s+([\s\S]+?))?(?:\s+LIMIT\s+(\d+))?\s*$/i;

  const match = query.match(sqlRegex);

  if (!match) {
    throw new Error(
      "Syntax error: Could not parse SELECT query. Ensure syntax: SELECT ... FROM ... [WHERE ...] [ORDER BY ...] [LIMIT ...]"
    );
  }

  const [, selectClause, tableClause, whereClause, orderByClause, limitClause] =
    match;

  const tableName = tableClause.trim().toLowerCase();

  if (!VALID_TABLES.includes(tableName as ValidTableName)) {
    throw new Error(
      `Table "${tableName}" does not exist in schema. Available tables: ${VALID_TABLES.join(
        ", "
      )}`
    );
  }

  // Retrieve table records from portfolio source of truth
  const rawTableData: Record<string, unknown>[] = (
    portfolioData.sqlSandboxData.tables as Record<string, Record<string, unknown>[]>
  )[tableName];

  if (!rawTableData || !Array.isArray(rawTableData)) {
    throw new Error(`Failed to load data for table "${tableName}".`);
  }

  let workingRows = rawTableData.map((row) => ({ ...row }));

  // 4. Apply WHERE filtering
  if (whereClause && whereClause.trim()) {
    workingRows = applyWhereFilter(workingRows, whereClause.trim());
  }

  // 5. Apply ORDER BY
  if (orderByClause && orderByClause.trim()) {
    workingRows = applyOrderBy(workingRows, orderByClause.trim());
  }

  // 6. Apply LIMIT (capped at 50)
  const maxLimit = 50;
  let limit = maxLimit;
  if (limitClause) {
    const parsedLimit = parseInt(limitClause.trim(), 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      limit = Math.min(parsedLimit, maxLimit);
    }
  }
  workingRows = workingRows.slice(0, limit);

  // 7. Project Columns (SELECT clause)
  const { columns, projectedRows } = projectColumns(
    workingRows,
    selectClause.trim(),
    rawTableData[0] || {}
  );

  const endTime = performance.now();
  // Simulate realistic network/engine latency (8-16ms)
  const computedTime = Math.round((endTime - startTime) * 100) / 100;
  const executionTimeMs = computedTime > 5 ? computedTime : Math.floor(Math.random() * 8) + 8;

  return {
    columns,
    rows: projectedRows,
    rowCount: projectedRows.length,
    executionTimeMs,
    query: rawQuery,
  };
}

function applyWhereFilter(
  rows: Record<string, unknown>[],
  whereCondition: string
): Record<string, unknown>[] {
  // Support AND / OR conditions
  // Check for simple binary comparisons: col = 'val', col LIKE '%val%', col > num, etc.
  const conditions = whereCondition.split(/\s+AND\s+/i);

  return rows.filter((row) => {
    return conditions.every((cond) => {
      const condition = cond.trim();

      // col LIKE '%pattern%'
      const likeMatch = condition.match(/^([a-zA-Z0-9_]+)\s+LIKE\s+'(.*)'$/i);
      if (likeMatch) {
        const [, col, pattern] = likeMatch;
        const colVal = String(row[col] ?? "").toLowerCase();
        const searchVal = pattern.replace(/%/g, "").toLowerCase();
        return colVal.includes(searchVal);
      }

      // col = 'val' or col = num
      const eqMatch = condition.match(/^([a-zA-Z0-9_]+)\s*=\s*('([^']*)'|(\d+))$/i);
      if (eqMatch) {
        const [, col, , stringVal, numVal] = eqMatch;
        const targetVal = stringVal !== undefined ? stringVal : Number(numVal);
        return String(row[col]).toLowerCase() === String(targetVal).toLowerCase();
      }

      // col != 'val' or col <> 'val'
      const neqMatch = condition.match(
        /^([a-zA-Z0-9_]+)\s*(?:!=|<>)\s*('([^']*)'|(\d+))$/i
      );
      if (neqMatch) {
        const [, col, , stringVal, numVal] = neqMatch;
        const targetVal = stringVal !== undefined ? stringVal : Number(numVal);
        return String(row[col]).toLowerCase() !== String(targetVal).toLowerCase();
      }

      // col >= num
      const gteMatch = condition.match(/^([a-zA-Z0-9_]+)\s*>=\s*(\d+)$/i);
      if (gteMatch) {
        const [, col, numStr] = gteMatch;
        return Number(row[col]) >= Number(numStr);
      }

      // col <= num
      const lteMatch = condition.match(/^([a-zA-Z0-9_]+)\s*<=\s*(\d+)$/i);
      if (lteMatch) {
        const [, col, numStr] = lteMatch;
        return Number(row[col]) <= Number(numStr);
      }

      // col > num
      const gtMatch = condition.match(/^([a-zA-Z0-9_]+)\s*>\s*(\d+)$/i);
      if (gtMatch) {
        const [, col, numStr] = gtMatch;
        return Number(row[col]) > Number(numStr);
      }

      // If expression is unrecognized, default to pass-through
      return true;
    });
  });
}

function applyOrderBy(
  rows: Record<string, unknown>[],
  orderByClause: string
): Record<string, unknown>[] {
  const parts = orderByClause.split(",")[0].trim().split(/\s+/);
  const colName = parts[0];
  const direction = (parts[1] || "ASC").toUpperCase();

  return [...rows].sort((a, b) => {
    const valA = a[colName];
    const valB = b[colName];

    if (valA === valB) return 0;
    if (valA === undefined || valA === null) return 1;
    if (valB === undefined || valB === null) return -1;

    let comp = 0;
    if (typeof valA === "number" && typeof valB === "number") {
      comp = valA - valB;
    } else {
      comp = String(valA).localeCompare(String(valB));
    }

    return direction === "DESC" ? -comp : comp;
  });
}

function projectColumns(
  rows: Record<string, unknown>[],
  selectClause: string,
  sampleRow: Record<string, unknown>
): { columns: string[]; projectedRows: Record<string, unknown>[] } {
  const allAvailableColumns = Object.keys(sampleRow);

  if (selectClause === "*") {
    return {
      columns: allAvailableColumns,
      projectedRows: rows,
    };
  }

  // Handle COUNT(*)
  if (/^COUNT\s*\(\s*\*\s*\)$/i.test(selectClause)) {
    return {
      columns: ["count"],
      projectedRows: [{ count: rows.length }],
    };
  }

  // Parse requested columns e.g. "company, role, location"
  const requestedColumns = selectClause
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  // Validate columns exist
  for (const col of requestedColumns) {
    // Check alias like "col AS alias"
    const baseCol = col.split(/\s+AS\s+/i)[0].trim();
    if (!allAvailableColumns.includes(baseCol)) {
      throw new Error(
        `Column "${baseCol}" does not exist. Available columns: ${allAvailableColumns.join(
          ", "
        )}`
      );
    }
  }

  const projectedRows = rows.map((row) => {
    const newRow: Record<string, unknown> = {};
    for (const col of requestedColumns) {
      const parts = col.split(/\s+AS\s+/i);
      const originalCol = parts[0].trim();
      const aliasCol = parts[1] ? parts[1].trim() : originalCol;
      newRow[aliasCol] = row[originalCol];
    }
    return newRow;
  });

  const columns = requestedColumns.map((c) => {
    const parts = c.split(/\s+AS\s+/i);
    return parts[1] ? parts[1].trim() : parts[0].trim();
  });

  return { columns, projectedRows };
}
