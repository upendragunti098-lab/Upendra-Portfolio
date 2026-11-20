import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export const metadata = {
  title: "Impressum (Legal Notice) | Gunti Upendra",
  description: "Legal notice and contact details according to German telemedia regulations.",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-8 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Impressum (Legal Notice)
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Angaben gemäß § 5 TMG / DDG (Digitale-Dienste-Gesetz)
            </p>
          </div>
        </div>

        <section className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Diensteanbieter / Verantwortlich für den Inhalt
            </h2>
            <p className="font-medium">{portfolioData.personal.name}</p>
            <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 mt-1">
              <MapPin className="w-4 h-4 text-slate-400" />
              {portfolioData.personal.location}
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Kontakt
            </h2>
            <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Mail className="w-4 h-4 text-slate-400" />
              E-Mail:{" "}
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {portfolioData.personal.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Haftung für Inhalte
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Urheberrecht
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
