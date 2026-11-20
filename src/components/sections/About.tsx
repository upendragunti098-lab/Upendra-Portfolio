import { portfolioData } from "@/data/portfolio";
import {
  Brain,
  BarChart3,
  GraduationCap,
  Languages,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function About() {
  const { personal, languages } = portfolioData;

  const coreStrengths = [
    {
      title: "Data Analytics & BI Engineering",
      description:
        "3+ years building high-impact Power BI dashboards, automated SQL/Excel pipelines, and operational MIS reports for multi-store retail and enterprise operations.",
      icon: BarChart3,
      badge: "Power BI & SQL",
    },
    {
      title: "AI/LLM Evaluation & Python Code Review",
      description:
        "Extensive experience evaluating AI-generated responses, ranking model outputs, edge-case code debugging, prompt benchmarking, and coordinating a 40-member evaluation team.",
      icon: Brain,
      badge: "LLM & Code QA",
    },
    {
      title: "Data Science & Applied AI in Germany",
      description:
        "Master's student at GISMA University of Applied Sciences (Potsdam/Berlin), bridging rigorous statistical methods, machine learning, and digital business strategy.",
      icon: GraduationCap,
      badge: "GISMA MSc",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Profile & Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            A blend of operational data analytics rigor, AI model evaluation expertise, and academic training in Berlin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative - 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am an <strong className="text-slate-900 dark:text-white font-semibold">MSc student in Data Science, AI and Digital Business</strong> at{" "}
                <span className="text-blue-600 dark:text-blue-400 font-medium">GISMA University of Applied Sciences</span> in the Berlin/Potsdam area, bringing over <strong className="text-slate-900 dark:text-white font-semibold">3 years of professional experience</strong> in Data Analytics, MIS Reporting, and AI/LLM evaluation.
              </p>
              <p>
                In my industry roles, I have engineered end-to-end data pipelines and automated reporting suites using <strong className="text-slate-900 dark:text-white font-semibold">SQL, Power BI, Advanced Excel, and Google Sheets</strong>, as well as handling procurement flows with <strong className="text-slate-900 dark:text-white font-semibold">SAP MM</strong>. My work provided leadership teams with transparent KPI visibility across multi-store retail environments.
              </p>
              <p>
                At <span className="font-medium text-slate-900 dark:text-white">Innodata</span>, I specialized in the AI frontier: conducting <strong className="text-slate-900 dark:text-white font-semibold">Python code review, edge-case debugging, LLM response ranking, and prompt evaluation</strong>. I also stepped into leadership, coordinating a distributed team of <strong className="text-slate-900 dark:text-white font-semibold">40 evaluators</strong>, managing onboarding, and safeguarding rubric standards.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  Seeking <strong className="text-slate-800 dark:text-slate-200">Werkstudent (up to 20h/week)</strong> or <strong className="text-slate-800 dark:text-slate-200">internship</strong> positions in Data Analytics, BI, and AI Operations.
                </span>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coreStrengths.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar / Languages & Quick Specs - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            {/* Languages Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Language Proficiencies
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Relevant for international & German teams
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                {languages.map((lang) => (
                  <div
                    key={lang.language}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                        {lang.language}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-100/70 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {lang.level}
                      </span>
                    </div>
                    {lang.note && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {lang.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* German Recruiter Highlights Card */}
            <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50/70 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 rounded-2xl p-6 border border-blue-200/60 dark:border-blue-900/40 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                Quick Facts for Recruiters
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Location:</strong> Berlin, Germany (enrolled at GISMA University)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Work Format:</strong> On-site Berlin, hybrid, or remote in Germany</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Weekly Hours:</strong> Up to 20h/week during semester (full-time during break)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
                  <span><strong>Target Roles:</strong> Data Analyst, BI Specialist, AI Evaluation, Data Operations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
