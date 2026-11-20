import { portfolioData } from "@/data/portfolio";
import {
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  Users,
} from "lucide-react";

export function Experience() {
  const { experiences } = portfolioData;

  return (
    <section
      id="experience"
      className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Career History
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Work Experience
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            3+ years across data analytics, operational MIS reporting, and AI/LLM evaluation leadership.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={`${exp.company}-${exp.role}-${idx}`}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all relative overflow-hidden"
            >
              {/* Top Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    {exp.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        <Users className="w-3 h-3" />
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                      <Building2 className="w-3.5 h-3.5" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold self-start shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {exp.period}
                </div>
              </div>

              {/* Responsibilities */}
              <ul className="mt-5 space-y-2.5">
                {exp.responsibilities.map((resp, rIdx) => (
                  <li
                    key={rIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>

              {/* Skill Pills */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
