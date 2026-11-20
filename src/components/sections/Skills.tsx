import { portfolioData } from "@/data/portfolio";
import {
  Code2,
  BarChart3,
  Brain,
  Layers,
  Users,
  Check,
  Cpu,
} from "lucide-react";

export function Skills() {
  const { skills } = portfolioData;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Brain":
        return <Brain className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "Users":
        return <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      default:
        return <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Technical Skills & Tools
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Organized across data analytics, business intelligence, AI/LLM evaluation, enterprise ERP, and leadership.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => (
            <div
              key={category.category}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                    {category.category}
                  </h3>
                </div>

                <ul className="space-y-2 mt-4">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <div className="w-4 h-4 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>Verified in production roles</span>
                <span className="font-mono">{category.skills.length} skills</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
