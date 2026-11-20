"use client";

import * as React from "react";
import { ProjectItem } from "@/data/portfolio";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Calendar,
  Layers,
  Terminal,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenSandbox?: () => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onOpenSandbox,
}: ProjectDetailModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {project.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                {project.company}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.period}
              </span>
            </div>

            <h2
              id="project-title"
              className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
          {/* Status & Impact Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {project.status === "Completed" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  In Progress (GISMA MSc)
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{project.impactMetric}</span>
            </div>
          </div>

          {/* Business Problem */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              Context & Business Problem
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              {project.problemStatement}
            </p>
          </div>

          {/* Solution & Architecture */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:indigo-400" />
              Data Architecture & Methodology
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              {project.architecture}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600 dark:teal-400" />
              Key Deliverables & Verified Outcomes
            </h3>
            <ul className="space-y-2">
              {project.deliverables.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onOpenSandbox && (
              <button
                onClick={() => {
                  onClose();
                  onOpenSandbox();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                Query in SQL Sandbox
              </button>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
