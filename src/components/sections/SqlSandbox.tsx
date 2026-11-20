"use client";

import * as React from "react";
import { portfolioData, SqlSandboxQuery } from "@/data/portfolio";
import { executeSql, SqlQueryResult } from "@/lib/sqlEngine";
import {
  Terminal,
  Play,
  Copy,
  Check,
  RotateCcw,
  Download,
  Table as TableIcon,
  Database,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

export function SqlSandbox() {
  const { prebuiltQueries } = portfolioData.sqlSandboxData;

  const [selectedQueryId, setSelectedQueryId] = React.useState<string>(
    prebuiltQueries[0].id
  );
  const [sqlCode, setSqlCode] = React.useState<string>(prebuiltQueries[0].sql);
  const [result, setResult] = React.useState<SqlQueryResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isExecuting, setIsExecuting] = React.useState<boolean>(false);
  const [copied, setCopied] = React.useState<boolean>(false);

  // Run initial query on mount
  React.useEffect(() => {
    try {
      const initialRes = executeSql(prebuiltQueries[0].sql);
      setResult(initialRes);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Execution error");
    }
  }, [prebuiltQueries]);

  const handleSelectPrebuilt = (query: SqlSandboxQuery) => {
    setSelectedQueryId(query.id);
    setSqlCode(query.sql);
    setError(null);
    try {
      const res = executeSql(query.sql);
      setResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Execution error");
    }
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    setError(null);

    // Call backend API or run local engine
    try {
      const res = await fetch("/api/sql-sandbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: sqlCode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        // Fallback to local typed engine
        const fallbackRes = executeSql(sqlCode);
        setResult(fallbackRes);
      }
    } catch {
      // Client-side fallback execution
      try {
        const localRes = executeSql(sqlCode);
        setResult(localRes);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Syntax error: Unable to execute query."
        );
      }
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    const original = prebuiltQueries.find((q) => q.id === selectedQueryId);
    if (original) {
      setSqlCode(original.sql);
      setError(null);
      try {
        const res = executeSql(original.sql);
        setResult(res);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error executing query");
      }
    }
  };

  const handleExportCsv = () => {
    if (!result || result.rows.length === 0) return;

    const headers = result.columns.join(",");
    const rows = result.rows.map((row) =>
      result.columns
        .map((col) => {
          const val = row[col];
          const escaped = String(val ?? "").replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(",")
    );

    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `upendra_query_result.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const lineCount = sqlCode.split("\n").length;

  return (
    <section id="sandbox" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
            <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Interactive SQL Sandbox</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Query My Career in SQL
          </h2>

          <p className="text-sm sm:text-base max-w-4xl font-normal text-slate-600 dark:text-slate-400">
            Execute real SQL queries against Gunti Upendra&apos;s verified career impact, production dashboards telemetry, and technology stack inventory.
          </p>
        </div>

        {/* Sandbox Card */}
        <div className="rounded-2xl p-5 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6 border bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800/90">
          {/* Pre-built Query Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
              Select Pre-Built Analytical Query:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {prebuiltQueries.map((q) => {
                const isSelected = selectedQueryId === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectPrebuilt(q)}
                    className={`p-3 rounded-xl text-left text-xs font-medium transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-white dark:hover:bg-slate-800"
                    }`}
                  >
                    <div
                      className={`font-mono text-[10px] mb-1 ${
                        isSelected ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {q.filename.toUpperCase()}
                    </div>
                    <div className="truncate font-bold">{q.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Code Editor Window */}
          <div className="rounded-xl bg-slate-950 border border-slate-800 shadow-inner overflow-hidden">
            {/* Editor Window Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-white/10 bg-slate-900/80">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-slate-200 truncate">
                  {prebuiltQueries.find((q) => q.id === selectedQueryId)?.filename || "custom_query.sql"}
                </span>
                <span className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                  <Database className="w-3 h-3 text-blue-400" />
                  PostgreSQL 16 · portfolio_analytics
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Connected
                </span>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 rounded-lg border border-white/15 text-slate-200 hover:text-white hover:border-blue-400 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy SQL"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy SQL
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-2.5 py-1.5 rounded-lg border border-white/15 text-slate-200 hover:text-white hover:border-blue-400 text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset Query"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>

                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold font-mono flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-white" />
                      <span>Execute Query</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Input Area with Line Numbers */}
            <div className="flex font-mono text-xs leading-relaxed overflow-x-auto">
              <div
                aria-hidden="true"
                className="select-none py-4 pl-4 pr-3 text-right text-slate-600 border-r border-white/5"
              >
                {Array.from({ length: Math.max(lineCount, 6) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              <textarea
                value={sqlCode}
                onChange={(e) => setSqlCode(e.target.value)}
                rows={Math.max(lineCount, 6)}
                spellCheck="false"
                className="w-full py-4 px-4 bg-transparent text-slate-200 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-blue-600 selection:text-white"
                placeholder="Enter SELECT query..."
              />
            </div>
          </div>

          {/* Error Message Callout */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Execution Error:</div>
                <div className="mt-0.5">{error}</div>
              </div>
            </div>
          )}

          {/* Results Panel */}
          {result && (
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                  <TableIcon className="w-4 h-4" />
                  <span>Query Result Set (Live Execution)</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-500 dark:text-slate-400">
                    {result.rowCount} {result.rowCount === 1 ? "row" : "rows"} returned in{" "}
                    <strong className="text-blue-600 dark:text-blue-400">{result.executionTimeMs}ms</strong>
                  </span>

                  <button
                    onClick={handleExportCsv}
                    className="px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Download className="w-3 h-3 text-blue-500" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="rounded-xl border overflow-x-auto max-h-[24rem] overflow-y-auto shadow-inner border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="border-b bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 sticky top-0">
                    <tr>
                      {result.columns.map((col) => (
                        <th
                          key={col}
                          className="p-3 uppercase font-bold tracking-wider whitespace-nowrap text-blue-600 dark:text-blue-400"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {result.rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={result.columns.length}
                          className="p-4 text-center text-slate-500"
                        >
                          Zero rows match the query criteria.
                        </td>
                      </tr>
                    ) : (
                      result.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="transition-colors hover:bg-blue-50/50 dark:hover:bg-slate-800/50"
                        >
                          {result.columns.map((col) => (
                            <td key={col} className="p-3 truncate max-w-xs">
                              {String(row[col] ?? "NULL")}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
