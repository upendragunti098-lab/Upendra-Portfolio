import Link from "next/link";
import { portfolioData } from "@/data/portfolio";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {portfolioData.personal.name}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              {portfolioData.personal.headline}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
              <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{portfolioData.personal.location}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-900 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {portfolioData.personal.name}. Built with Next.js, Tailwind CSS & Supabase.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/impressum"
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline-offset-4 hover:underline"
            >
              Impressum (Legal Notice)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
