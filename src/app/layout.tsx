import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Gunti Upendra | Data Analyst | AI/LLM Evaluation | Berlin",
  description:
    "Portfolio of Gunti Upendra - MSc Student in Data Science, AI & Digital Business at GISMA Germany. 3+ years in Data Analytics, Power BI, SQL, MIS Reporting, and Python AI/LLM Evaluation.",
  keywords: [
    "Gunti Upendra",
    "Data Analyst Berlin",
    "AI Evaluation",
    "LLM Evaluation",
    "Python Code Reviewer",
    "Power BI Specialist",
    "MIS Reporting",
    "GISMA University of Applied Sciences",
    "Werkstudent Data Science",
  ],
  authors: [{ name: "Gunti Upendra" }],
  openGraph: {
    title: "Gunti Upendra | Data Analyst | AI/LLM Evaluation",
    description:
      "MSc Data Science & AI at GISMA Germany. 3+ years experience in Data Analytics, Power BI, SQL, and AI/LLM Evaluation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
