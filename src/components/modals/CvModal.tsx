"use client";

import * as React from "react";
import { portfolioData } from "@/data/portfolio";
import {
  X,
  FileText,
  Mail,
  MapPin,
  Calendar,
  Building2,
  GraduationCap,
  Award,
  CheckCircle2,
  Printer,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  const { personal, experiences, education, skills, languages } = portfolioData;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-title"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/90">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span id="cv-title" className="text-xs font-mono font-bold tracking-wider text-slate-900 dark:text-white uppercase">
                GUNTI_UPENDRA_CV.PDF
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] text-slate-400">
                · Verified Professional Resume
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Print CV"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document View */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
          {/* Header Section */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {personal.name}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {personal.headline}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                {personal.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <a href={`mailto:${personal.email}`} className="hover:underline">
                  {personal.email}
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn Profile
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" />
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
              </span>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300">
              <strong>Availability:</strong> {personal.availability}
            </div>
          </div>

          {/* Profile Summary */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Professional Summary
            </h2>
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              {personal.summary}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
              Professional Experience (3+ Years)
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold">
                          <Building2 className="w-3 h-3" />
                          {exp.company}
                        </span>
                        <span>·</span>
                        <span>{exp.location}</span>
                        {exp.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                            {exp.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-3 list-disc text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {exp.responsibilities.map((r, rIdx) => (
                      <li key={rIdx}>{r}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {edu.institution} · {edu.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {edu.period}
                    </span>
                  </div>

                  {edu.grade && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <Award className="w-3.5 h-3.5" />
                      {edu.grade}
                    </span>
                  )}

                  {edu.details && (
                    <ul className="space-y-1 pl-3 list-disc text-slate-600 dark:text-slate-300 text-xs">
                      {edu.details.map((d, dIdx) => (
                        <li key={dIdx}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skills.map((cat) => (
                <div key={cat.category} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white mb-1.5">
                    {cat.category}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cat.skills.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              Languages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {languages.map((l) => (
                <div key={l.language} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-white">{l.language}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{l.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Berlin, Germany · Verified MSc Student
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
