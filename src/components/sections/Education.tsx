import { portfolioData } from "@/data/portfolio";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
} from "lucide-react";

export function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Foundation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Education
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Advanced Master&apos;s studies in Germany paired with a quantitative Bachelor&apos;s in Computer Science and Statistics.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item) => (
            <div
              key={item.institution}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.period}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.degree}
                </h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                  {item.institution}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.location}</span>
                </div>

                {item.grade && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 mb-4">
                    <Award className="w-3.5 h-3.5" />
                    Graduated with Distinction: {item.grade}
                  </div>
                )}

                {item.details && (
                  <ul className="space-y-2 mt-2">
                    {item.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
