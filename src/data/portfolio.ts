export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  skills: string[];
  badge?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  details?: string[];
}

export interface ProjectItem {
  title: string;
  status: "Completed" | "In Progress";
  category: "Business Intelligence" | "AI & LLM" | "Data Analytics" | "Data Science";
  description: string;
  tools: string[];
  highlights: string;
  githubUrl?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

export interface LanguageItem {
  language: string;
  level: string;
  note?: string;
}

export const portfolioData = {
  personal: {
    name: "Gunti Upendra",
    headline: "Data Analyst | AI/LLM Evaluation | Python Code Reviewer",
    location: "Berlin, Germany",
    email: "upendragunti03@gmail.com",
    linkedin: "https://linkedin.com/in/gunti-upendra-9a86a322a",
    github: "https://github.com/upendragunti098-lab",
    availability: "Available for Werkstudent (up to 20h/week during semester) or Internship opportunities in Berlin & Remote (Germany).",
    hasCvFile: false, // Set to true only when a verified CV PDF is placed in public/
    summary:
      "MSc student in Data Science, AI and Digital Business at GISMA University of Applied Sciences, Germany, with 3+ years of experience in data analysis, MIS reporting, Power BI dashboards, and AI/LLM evaluation. Proven background in Python code review, LLM output ranking, quality assurance, and team leadership—including coordinating a 40-person evaluation team. Seeking Werkstudent and internship opportunities in Data Analytics, Business Intelligence, AI, and Data Operations.",
  },

  skills: [
    {
      category: "Programming & Data",
      icon: "Code2",
      skills: ["Python", "SQL", "Advanced Excel", "Google Sheets"],
    },
    {
      category: "Business Intelligence & Analytics",
      icon: "BarChart3",
      skills: [
        "Power BI",
        "Executive Dashboards",
        "KPI Tracking",
        "Report Automation",
        "ETL & Data Cleaning",
        "Trend Analysis & Forecasting",
      ],
    },
    {
      category: "AI & LLM Evaluation",
      icon: "Brain",
      skills: [
        "LLM Evaluation",
        "Prompt Evaluation",
        "Response Ranking",
        "RLHF-style Feedback",
        "Data Annotation",
        "AI Code Review",
        "QA & Edge-Case Validation",
      ],
    },
    {
      category: "Business Systems",
      icon: "Layers",
      skills: ["SAP MM (PR, PO, GRN)", "Procurement Workflows", "Operational Tracking"],
    },
    {
      category: "Leadership & Collaboration",
      icon: "Users",
      skills: [
        "Team Leadership (40-person team)",
        "Technical Onboarding & Training",
        "Interview Support",
        "Task Allocation & Progress Tracking",
        "Stakeholder Management",
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      role: "Senior Associate – Python Q&A Reviewer (AI/LLM)",
      company: "Innodata",
      period: "March 2026 – May 2026",
      location: "Remote, India",
      badge: "Team Lead",
      responsibilities: [
        "Led evaluation of Python-based Q&A datasets to improve LLM accuracy, reasoning, and code quality.",
        "Conducted thorough Python code reviews, debugging, and edge-case validation on AI-generated solutions.",
        "Reviewed, corrected, and optimized AI-generated Python scripts for algorithmic correctness and syntax compliance.",
        "Managed bulk data validation and quality check workflows across distributed evaluation datasets.",
        "Coordinated a team of 40 evaluators, assigned daily tasks, tracked delivery milestones, and ensured rubric consistency.",
        "Supported interviewer panels, candidate onboarding, and continuous training on evaluation guidelines.",
        "Performed prompt evaluation, response ranking, and quality assurance benchmarking.",
      ],
      skills: ["Python", "LLM Evaluation", "Code Review", "Prompt Engineering", "Team Leadership (40)", "QA Benchmarking"],
    },
    {
      role: "Freelance LLM Evaluator / Aligner & Outliner",
      company: "Innodata",
      period: "March 2025 – March 2026",
      location: "Remote",
      responsibilities: [
        "Evaluated AI-generated responses across diverse domains for factual accuracy, relevance, and logical consistency.",
        "Ranked multi-turn model outputs systematically according to detailed alignment rubrics and safety guidelines.",
        "Performed comprehensive data annotation and validation to support LLM reinforcement learning pipelines.",
      ],
      skills: ["LLM Evaluation", "Model Output Ranking", "Data Annotation", "RLHF Feedback", "Quality Assurance"],
    },
    {
      role: "Data Analyst / MIS Executive",
      company: "Vodafone Idea (via Quess Corp)",
      period: "October 2024 – March 2025",
      location: "India",
      responsibilities: [
        "Designed and maintained Power BI and Excel dashboards for regional operational KPI tracking.",
        "Automated recurring daily, weekly, and monthly MIS reports using Excel formulas, Power Query, and SQL.",
        "Prepared actionable operational performance reports for retail store networks in Andhra Pradesh and Telangana.",
        "Utilized SAP MM for managing PR (Purchase Requisition), PO (Purchase Order), and GRN (Goods Receipt Note) procurement records.",
        "Maintained Google Sheets trackers and coordinated closely with store managers to resolve operational discrepancies.",
        "Presented analytical summaries and performance insights to regional stakeholders and senior leadership.",
      ],
      skills: ["Power BI", "SQL", "Advanced Excel", "SAP MM", "Google Sheets", "MIS Reporting", "Operational Analytics"],
    },
    {
      role: "MIS Analyst",
      company: "Improve Business Solutions",
      period: "June 2023 – September 2024",
      location: "India",
      responsibilities: [
        "Managed end-to-end data collection, cleansing, transformation, and reconciliation from multiple sources.",
        "Engineered robust Power BI dashboards and automated Excel reporting systems for operational transparency.",
        "Conducted trend analysis, volume forecasting, and KPI monitoring to support strategic decisions.",
        "Executed strict data quality assurance and audit validation across business reporting streams.",
        "Collaborated with cross-functional stakeholders and delivered internal training sessions to team members.",
      ],
      skills: ["Power BI", "MIS Reporting", "ETL & Data Cleaning", "Trend Analysis", "Forecasting", "Quality Assurance"],
    },
  ] as WorkExperience[],

  education: [
    {
      degree: "MSc Data Science, AI and Digital Business",
      institution: "GISMA University of Applied Sciences",
      location: "Potsdam / Berlin, Germany",
      period: "April 2026 – April 2028 (Expected)",
      details: [
        "Focus on Data Science, Applied Artificial Intelligence, Digital Business Models, and Advanced Analytics.",
        "Based in Berlin/Potsdam area; available for Werkstudent positions up to 20h/week during semesters.",
      ],
    },
    {
      degree: "BSc Computer Science with Statistics",
      institution: "St. Francis Xavier's Degree College",
      location: "Hyderabad, India",
      period: "Completed",
      grade: "84.5%",
      details: [
        "Core coursework in Computer Science, Mathematical Statistics, Database Management, and Quantitative Analysis.",
      ],
    },
  ] as EducationItem[],

  languages: [
    {
      language: "English",
      level: "B2 – Professional Working Proficiency",
      note: "Fluent in professional, technical, and academic environments.",
    },
    {
      language: "German",
      level: "A1 – A2 (Currently Learning)",
      note: "Actively studying German for daily life and workplace integration in Germany.",
    },
    {
      language: "Telugu",
      level: "Native / Fluent",
      note: "Native proficiency (editable as needed).",
    },
    {
      language: "Hindi",
      level: "Professional Working Proficiency",
      note: "Fluent speaking and comprehension (editable as needed).",
    },
  ] as LanguageItem[],

  projects: [
    {
      title: "Multi-Store Retail KPI & Performance Suite",
      status: "Completed",
      category: "Business Intelligence",
      description:
        "Comprehensive Power BI dashboard tracking store-level revenue, inventory movement, regional performance, and operational KPIs across regional retail networks.",
      tools: ["Power BI", "DAX", "SQL", "Excel", "Data Modeling"],
      highlights:
        "Automated daily and weekly reporting cadence, replacing manual spreadsheets with unified interactive dashboards.",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
    {
      title: "Python-Based LLM Code Evaluation Benchmark",
      status: "Completed",
      category: "AI & LLM",
      description:
        "Structured validation pipeline for benchmarking AI-generated Python code, testing algorithmic edge cases, syntax validation, reasoning depth, and structured rubric scoring.",
      tools: ["Python", "LLM Evaluation", "Code Review", "Prompt Engineering", "QA Benchmarks"],
      highlights:
        "Developed structured validation checklists and criteria for ranking model outputs by correctness and maintainability.",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
    {
      title: "Automated MIS SQL & Procurement Pipeline",
      status: "Completed",
      category: "Data Analytics",
      description:
        "Automated ETL and reporting workflow aggregating store-level operational metrics and procurement records (PR, PO, GRN) from SAP MM into actionable management summaries.",
      tools: ["SQL", "SAP MM", "Advanced Excel", "Power Query", "Google Sheets"],
      highlights:
        "Streamlined operational reconciliation and eliminated data discrepancies between warehouse logs and finance trackers.",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
    {
      title: "Customer Churn Prediction & Retention Analytics",
      status: "In Progress",
      category: "Data Science",
      description:
        "Machine learning classification model exploring customer retention drivers in retail/telecom datasets, incorporating feature engineering, model interpretability, and business impact estimation.",
      tools: ["Python", "Scikit-Learn", "Pandas", "Statistical Modeling", "Jupyter"],
      highlights:
        "GISMA MSc coursework project: currently benchmarking classification algorithms and ROC-AUC performance against baseline models.",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
  ] as ProjectItem[],
};
