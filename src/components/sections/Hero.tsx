import { portfolioData } from "@/data/portfolio";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
  Mail,
  ArrowRight,
  FileText,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function Hero() {
  const { personal } = portfolioData;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-teal-500/10 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Availability and Location Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs mb-6">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Werkstudent & Internship
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-300">
              {personal.name}
            </span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
            {personal.headline}
          </p>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {personal.summary}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-2xs"
            >
              Work Experience
            </a>

            {personal.hasCvFile ? (
              <a
                href="/Upendra_Gunti_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <FileText className="w-4 h-4" />
                Download CV (PDF)
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                Request CV / Reach Out
              </a>
            )}
          </div>

          {/* Social Proof & Direct Profile Links */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
              LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email Gunti Upendra"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              {personal.email}
            </a>
          </div>

          {/* Key Recruiter Highlights Grid */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1.5">
                <Briefcase className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Experience
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">3+ Years</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Data Analytics & MIS Dashboards
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1.5">
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Leadership
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">40 Members</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Coordinated in Python/AI QA
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 mb-1.5">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Education
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">GISMA Germany</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                MSc Data Science & AI (2026–2028)
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800/90 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1.5">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Availability
                </span>
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">Werkstudent</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Up to 20h/week or Internship
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
