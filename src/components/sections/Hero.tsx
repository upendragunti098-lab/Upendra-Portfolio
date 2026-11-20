"use client";

import * as React from "react";
import { portfolioData, ProjectItem } from "@/data/portfolio";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
  Mail,
  ArrowRight,
  FileText,
  Terminal,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  BarChart3,
  Layers,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

interface HeroProps {
  onOpenCv?: () => void;
  onSelectProject?: (project: ProjectItem) => void;
}

export function Hero({ onOpenCv, onSelectProject }: HeroProps) {
  const { personal, careerPath, impactKpis, projects } = portfolioData;
  const spotlightProject = projects[0]; // Retail Demand Intelligence

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[760px] h-[380px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-teal-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
          {/* Availability and Location Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs mb-5">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Werkstudent & Internship (up to 20h/wk)
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {personal.location}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-600 dark:text-slate-400">GISMA University MSc</span>
          </div>

          {/* Name & Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-300">
              {personal.name}
            </span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
            {personal.headline}
          </p>

          <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {personal.summary}
          </p>

          {/* Quick CTA Actions */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#sandbox"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-2xs group"
            >
              <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              SQL Sandbox
            </a>

            {onOpenCv && (
              <button
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                View CV (PDF)
              </button>
            )}

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact Me
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Proof & Profiles */}
          <div className="mt-5 flex items-center justify-center gap-2.5 sm:gap-3">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
              LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              {personal.email}
            </a>
          </div>
        </div>

        {/* =========================================================================
            BENTO GRID (Mehmet Sezer Style)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
          {/* 1. HORIZONTAL CAREER & ACADEMIC PATHWAY RAIL (Full Width / Span 12) */}
          <div className="lg:col-span-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>Career Progression & Academic Milestones</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                3+ Years Professional Experience + GISMA MSc
              </span>
            </div>

            {/* Horizontal Timeline Rail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {careerPath.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative p-4 rounded-xl border transition-all ${
                    item.isCurrent
                      ? "bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 shadow-2xs"
                      : "bg-slate-50/60 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800">
                      {item.year}
                    </span>
                    {item.isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Current
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.company}
                  </h3>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                    {item.shortRole}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {item.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. VERIFIED IMPACT KPI METRICS (Span 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  <BarChart3 className="w-4 h-4" />
                  <span>Verified Impact Metrics</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                  Data-backed credentials
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {impactKpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80"
                  >
                    <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                      {kpi.value}
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      {kpi.label}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {kpi.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick toolkit chips along bottom */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400 mr-1">
                Core Stack:
              </span>
              {["Python", "SQL", "Power BI", "DAX", "SAP MM", "Advanced Excel", "LLM Evaluation"].map(
                (tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>

          {/* 3. FEATURED CASE STUDY SPOTLIGHT CARD (Span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/20 blur-3xl pointer-events-none rounded-full" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  <Sparkles className="w-3 h-3 text-blue-300" />
                  Featured Case Study
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {spotlightProject.company}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                {spotlightProject.title}
              </h3>

              <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                {spotlightProject.shortDescription}
              </p>

              {/* Metric Callout */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
                  Verified Outcome:
                </div>
                <div className="font-semibold text-slate-100 mt-0.5">
                  {spotlightProject.impactMetric}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              {onSelectProject && (
                <button
                  type="button"
                  onClick={() => onSelectProject(spotlightProject)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-all"
                >
                  Case Study
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              <a
                href="#sandbox"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                Query in SQL
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
