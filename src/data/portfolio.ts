export interface CareerPathItem {
  id: string;
  year: string;
  company: string;
  role: string;
  shortRole: string;
  badge: string;
  location: string;
  period: string;
  isCurrent?: boolean;
}

export interface ImpactKpi {
  value: string;
  badge: string;
  label: string;
  description: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
  skills: string[];
  badge?: string;
  outcomes?: string[];
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
  id: string;
  title: string;
  company: string;
  category: "Business Intelligence" | "AI & LLM" | "Data Analytics" | "Data Science";
  status: "Completed" | "In Progress";
  period: string;
  shortDescription: string;
  description?: string;
  problemStatement: string;
  architecture: string;
  deliverables: string[];
  tools: string[];
  highlights: string;
  impactMetric: string;
  githubUrl: string;
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

export interface SqlSandboxQuery {
  id: string;
  filename: string;
  title: string;
  description: string;
  sql: string;
}

export const portfolioData = {
  personal: {
    name: "Gunti Upendra",
    headline: "Data Analyst | AI/LLM Evaluation | Python Code Reviewer",
    location: "Berlin, Germany",
    email: "upendragunti03@gmail.com",
    linkedin: "https://linkedin.com/in/gunti-upendra-9a86a322a",
    github: "https://github.com/upendragunti098-lab",
    availability: "Open to Werkstudent (up to 20h/week during semester) & Internship Roles · Berlin & Hybrid/Remote",
    visaStatus: "Eligible for student employment up to 20 hours/week during semester (full-time during lecture-free periods).",
    hasCvFile: false,
    summary:
      "MSc student in Data Science, AI and Digital Business at GISMA University of Applied Sciences, Germany, with 3+ years of professional experience across Data Analytics, MIS Reporting, Power BI Dashboards, and AI/LLM evaluation. Proven track record in Python code review, model output ranking, and cross-functional leadership—coordinating a 40-member evaluation team. Seeking Werkstudent and internship opportunities in Data Analytics, Business Intelligence, AI, and Data Operations in Germany.",
  },

  careerPath: [
    {
      id: "exp-ibs",
      year: "2023 – 2024",
      company: "Improve Business Solutions",
      role: "MIS Analyst",
      shortRole: "MIS Analyst",
      badge: "IBS",
      location: "India",
      period: "06/2023 – 09/2024",
    },
    {
      id: "exp-vi",
      year: "2024 – 2025",
      company: "Vodafone Idea",
      role: "Data Analyst / MIS Executive",
      shortRole: "Data Analyst / MIS",
      badge: "VI",
      location: "India",
      period: "10/2024 – 03/2025",
    },
    {
      id: "exp-innodata-freelance",
      year: "2025 – 2026",
      company: "Innodata",
      role: "Freelance LLM Evaluator",
      shortRole: "LLM Evaluator",
      badge: "INNO",
      location: "Remote",
      period: "03/2025 – 03/2026",
    },
    {
      id: "exp-innodata-lead",
      year: "2026",
      company: "Innodata",
      role: "Senior Associate – Python Q&A Reviewer (AI/LLM)",
      shortRole: "Sr. Associate / Team Lead",
      badge: "INNO",
      location: "Remote, India",
      period: "03/2026 – 05/2026",
    },
    {
      id: "edu-gisma",
      year: "2026 – 2028",
      company: "GISMA University",
      role: "MSc Data Science, AI & Digital Business",
      shortRole: "MSc Candidate",
      badge: "GISMA",
      location: "Berlin / Potsdam, Germany",
      period: "04/2026 – 04/2028",
      isCurrent: true,
    },
  ] as CareerPathItem[],

  impactKpis: [
    {
      value: "3+ Yrs",
      badge: "3 Organizations",
      label: "Career Experience",
      description: "Data Analytics, MIS Reporting, and AI/LLM evaluation in production environments.",
    },
    {
      value: "40+",
      badge: "Team Coordination",
      label: "Evaluators Led",
      description: "Led and coordinated a 40-member evaluation team in Python QA and AI benchmarking.",
    },
    {
      value: "50+",
      badge: "BI & Reporting",
      label: "Dashboards & Reports",
      description: "Automated recurring daily, weekly, and monthly operational KPI reporting suites.",
    },
    {
      value: "84.5%",
      badge: "Graduated with Distinction",
      label: "BSc Computer Science",
      description: "Strong quantitative and statistical foundations from St. Francis Xavier's.",
    },
    {
      value: "GISMA",
      badge: "Berlin / Potsdam",
      label: "MSc Data Science & AI",
      description: "Advanced Master's studies combining applied machine learning and digital business.",
    },
  ] as ImpactKpi[],

  skills: [
    {
      category: "Programming & Data Foundations",
      icon: "Code2",
      skills: ["Python", "SQL (PostgreSQL, MySQL)", "Advanced Excel", "Power Query", "Google Sheets"],
    },
    {
      category: "Business Intelligence & Analytics",
      icon: "BarChart3",
      skills: [
        "Power BI",
        "DAX & Data Modeling",
        "Executive Dashboards",
        "KPI Architecture",
        "ETL & Data Transformation",
        "Trend Analysis & Forecasting",
      ],
    },
    {
      category: "AI & LLM Evaluation",
      icon: "Brain",
      skills: [
        "Python Code Review & Debugging",
        "LLM Output Ranking",
        "Prompt Evaluation & Benchmarking",
        "RLHF-style Alignment",
        "Data Annotation",
        "QA & Edge-Case Validation",
      ],
    },
    {
      category: "Business Systems & Operations",
      icon: "Layers",
      skills: ["SAP MM (PR, PO, GRN)", "Procurement Workflows", "Inventory & Store Reconciliation"],
    },
    {
      category: "Leadership & Collaboration",
      icon: "Users",
      skills: [
        "Team Leadership (40-Member Team)",
        "Technical Onboarding & Training",
        "Task Allocation & Milestone Tracking",
        "Interview Panel Support",
        "Cross-functional Stakeholder Reporting",
      ],
    },
    {
      category: "AI-Augmented Analytics Workflow",
      icon: "Cpu",
      skills: [
        "Claude Code & AI Assisted Analysis",
        "Prompt Optimization",
        "Automated Data QA",
        "Git & GitHub Workflows",
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      role: "Senior Associate – Python Q&A Reviewer (AI/LLM)",
      company: "Innodata",
      period: "March 2026 – May 2026",
      location: "Remote, India",
      badge: "Team Lead (40 Members)",
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
      outcomes: [
        "Standardized Python evaluation rubrics across 40 team members, elevating rubric adherence and data delivery throughput.",
        "Eliminated syntactic and algorithmic hallucinations in AI-generated code snippets through structured validation pipelines.",
      ],
    },
    {
      role: "Freelance LLM Evaluator / Aligner & Outliner",
      company: "Innodata",
      period: "March 2025 – March 2026",
      location: "Remote",
      badge: "AI Evaluation Specialist",
      responsibilities: [
        "Evaluated AI-generated responses across diverse domains for factual accuracy, relevance, and logical consistency.",
        "Ranked multi-turn model outputs systematically according to detailed alignment rubrics and safety guidelines.",
        "Performed comprehensive data annotation and validation to support LLM reinforcement learning pipelines.",
      ],
      skills: ["LLM Evaluation", "Model Output Ranking", "Data Annotation", "RLHF Feedback", "Quality Assurance"],
      outcomes: [
        "Delivered structured evaluation rubrics and comparative scoring across thousands of model responses.",
      ],
    },
    {
      role: "Data Analyst / MIS Executive",
      company: "Vodafone Idea (via Quess Corp)",
      period: "October 2024 – March 2025",
      location: "India",
      badge: "Retail Analytics & MIS",
      responsibilities: [
        "Designed and maintained Power BI and Excel dashboards for regional operational KPI tracking.",
        "Automated recurring daily, weekly, and monthly MIS reports using Excel formulas, Power Query, and SQL.",
        "Prepared actionable operational performance reports for retail store networks in Andhra Pradesh and Telangana.",
        "Utilized SAP MM for managing PR (Purchase Requisition), PO (Purchase Order), and GRN (Goods Receipt Note) procurement records.",
        "Maintained Google Sheets trackers and coordinated closely with store managers to resolve operational discrepancies.",
        "Presented analytical summaries and performance insights to regional stakeholders and senior leadership.",
      ],
      skills: ["Power BI", "SQL", "Advanced Excel", "SAP MM", "Google Sheets", "MIS Reporting", "Operational Analytics"],
      outcomes: [
        "Automated daily retail performance reporting cadence across store networks, eliminating repetitive manual consolidation.",
        "Unified procurement logs (PR, PO, GRN) from SAP MM with store inventory trackers, resolving inventory variances.",
      ],
    },
    {
      role: "MIS Analyst",
      company: "Improve Business Solutions",
      period: "June 2023 – September 2024",
      location: "India",
      badge: "Operations & BI",
      responsibilities: [
        "Managed end-to-end data collection, cleansing, transformation, and reconciliation from multiple operational sources.",
        "Engineered robust Power BI dashboards and automated Excel reporting systems for operational transparency.",
        "Conducted trend analysis, volume forecasting, and KPI monitoring to support strategic decisions.",
        "Executed strict data quality assurance and audit validation across business reporting streams.",
        "Collaborated with cross-functional stakeholders and delivered internal training sessions to team members.",
      ],
      skills: ["Power BI", "MIS Reporting", "ETL & Data Cleaning", "Trend Analysis", "Forecasting", "Quality Assurance"],
      outcomes: [
        "Built automated reporting templates that standardized KPI tracking across departments.",
        "Trained junior analysts and operational staff on dashboard navigation and self-service reporting.",
      ],
    },
  ] as WorkExperience[],

  education: [
    {
      degree: "MSc Data Science, AI and Digital Business",
      institution: "GISMA University of Applied Sciences",
      location: "Potsdam / Berlin, Germany",
      period: "April 2026 – April 2028 (Expected)",
      details: [
        "Specialization in Applied Artificial Intelligence, Machine Learning, Data Engineering, and Digital Business Transformation.",
        "Located in the Berlin/Potsdam metropolitan area; eligible for Werkstudent employment up to 20h/week during semesters.",
      ],
    },
    {
      degree: "BSc Computer Science with Statistics",
      institution: "St. Francis Xavier's Degree College",
      location: "Hyderabad, India",
      period: "Completed",
      grade: "84.5% (Graduated with Distinction)",
      details: [
        "Rigorous quantitative curriculum covering Mathematical Statistics, Probability Theory, Relational Databases, and Computer Science fundamentals.",
      ],
    },
  ] as EducationItem[],

  languages: [
    {
      language: "English",
      level: "B2 – Professional Working Proficiency",
      note: "Fluent communication in international, corporate, and academic settings.",
    },
    {
      language: "German",
      level: "A1 – A2 (Currently Learning)",
      note: "Actively studying German in Berlin for daily workplace and cultural integration.",
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
      id: "supply-chain-logistics-performance",
      title: "Supply Chain & Logistics Performance Analytics",
      company: "Olist Logistics (Independent Project)",
      category: "Business Intelligence",
      status: "Completed",
      period: "2026",
      shortDescription:
        "End-to-end logistics analytics warehouse, Streamlit BI dashboard, and delivery delay classification model on 99,441 authentic e-commerce orders.",
      description:
        "End-to-end logistics analytics warehouse, Streamlit BI dashboard, and delivery delay classification model on 99,441 authentic e-commerce orders.",
      problemStatement:
        "Brazilian marketplace operations faced shipping unpredictability across continental distances, varying carrier transit times, seller fulfillment delays, and poor customer satisfaction from delivery SLA breaches.",
      architecture:
        "Normalized 9 relational CSV tables into a high-performance DuckDB columnar warehouse; engineered SLA tracking and latency metrics; developed 8 standalone analytical SQL models; trained a delay risk classification model (ROC-AUC 0.765); and deployed a 7-page interactive Streamlit dashboard alongside Power BI Star-Schema exports.",
      deliverables: [
        "7-page interactive Streamlit business intelligence dashboard with Plotly charts and dynamic state/date filtering.",
        "High-performance DuckDB columnar analytical warehouse with 5 analytical views.",
        "Star-Schema dimensional model and CSV exports for Power BI & Excel.",
        "8 production standalone SQL scripts answering core logistics and operational questions.",
        "Machine learning delay risk classifier with Scikit-Learn Random Forest (ROC-AUC 0.765).",
        "Executive business insights report with operational diagnosis and data-backed recommendations.",
      ],
      tools: ["Python", "DuckDB", "SQL", "Streamlit", "Power BI", "Scikit-Learn"],
      highlights:
        "Analyzed 96,470 delivered orders; identified 8.11% late delivery rate; uncovered 13-day interstate transit penalty; quantified customer CSAT drop from 4.14 to 1.67 on late orders.",
      impactMetric: "96,470 Delivered Orders · 8.11% Late Rate · ROC-AUC 0.765",
      githubUrl: "https://github.com/upendragunti098-lab/supply-chain-logistics-analytics",
    },
    {
      id: "retail-demand-intelligence",
      title: "Retail Demand Intelligence & Inventory Optimization",
      company: "Vodafone Idea",
      category: "Business Intelligence",
      status: "Completed",
      period: "2024 – 2025",
      shortDescription:
        "Interactive Power BI dashboard suite tracking multi-store retail turnover, inventory movements, and regional sales KPIs.",
      description:
        "Interactive Power BI dashboard suite tracking multi-store retail turnover, inventory movements, and regional sales KPIs.",
      problemStatement:
        "Regional retail stores in Andhra Pradesh and Telangana operated on disparate spreadsheets, resulting in reporting delays, stockout risks, and manual overhead for store managers.",
      architecture:
        "Engineered automated ETL workflows combining store-level POS receipts, SQL transactional logs, and SAP MM procurement records (PR/PO/GRN) into normalized Star-Schema Power BI data models.",
      deliverables: [
        "Executive Power BI dashboard with drill-down views by store, district, and product SKU.",
        "Automated daily refresh pipeline eliminating manual spreadsheet compilation.",
        "Automated discrepancy alerts comparing warehouse goods receipt notes (GRN) against store inventory.",
      ],
      tools: ["Power BI", "DAX", "SQL", "SAP MM", "Advanced Excel"],
      highlights: "Automated daily/weekly reporting cadence across regional stores, cutting manual compilation time.",
      impactMetric: "Multi-Store Retail Network · Regional KPI Automation",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
    {
      id: "llm-evaluation-benchmark",
      title: "LLM Evaluation & Data Quality Analytics",
      company: "Innodata",
      category: "AI & LLM",
      status: "Completed",
      period: "2025 – 2026",
      shortDescription:
        "Systematic code evaluation and quality benchmarking pipeline for AI-generated Python scripts, prompt ranking, and debugging.",
      description:
        "Systematic code evaluation and quality benchmarking pipeline for AI-generated Python scripts, prompt ranking, and debugging.",
      problemStatement:
        "Large language models frequently generated code with subtle logic bugs, deprecated library syntax, or unhandled edge cases, requiring rigorous human-in-the-loop validation.",
      architecture:
        "Designed structured validation rubrics covering algorithmic complexity, test-case pass rates, syntax validity, and alignment with prompt instructions. Implemented scoring criteria across a distributed team.",
      deliverables: [
        "Standardized Python code review checklist and rubrics adopted across 40 evaluators.",
        "Bulk dataset validation workflows verifying thousands of multi-turn code responses.",
        "Onboarding curriculum and calibration tests for new evaluation associates.",
      ],
      tools: ["Python", "LLM Evaluation", "Code Review", "Prompt Engineering", "QA Benchmarking"],
      highlights: "Coordinated a 40-member team ensuring high rubric adherence and code correctness.",
      impactMetric: "40-Member Evaluator Team · LLM Code Quality",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
    {
      id: "supply-chain-logistics-mis",
      title: "Supply Chain & Logistics Operational MIS",
      company: "Improve Business Solutions",
      category: "Data Analytics",
      status: "Completed",
      period: "2023 – 2024",
      shortDescription:
        "Operational MIS analytics pipeline automating data collection, trend forecasting, and KPI monitoring.",
      description:
        "Operational MIS analytics pipeline automating data collection, trend forecasting, and KPI monitoring.",
      problemStatement:
        "Operational reporting across logistics and business services suffered from data fragmentation, version conflicts in spreadsheets, and lack of historical trend analysis.",
      architecture:
        "Consolidated relational transaction data using SQL and Power Query, built normalized reporting views, and deployed automated Power BI dashboards with historical trend models.",
      deliverables: [
        "Automated monthly operational performance reports distributed to management.",
        "Volume forecasting model tracking seasonal demand fluctuations.",
        "Data quality audit checks verifying transactional integrity before dashboard publishing.",
      ],
      tools: ["SQL", "Power BI", "Advanced Excel", "Power Query", "Data Cleaning"],
      highlights: "Automated end-to-end data pipelines and established consistent operational reporting across departments.",
      impactMetric: "Automated Data Pipeline · Operational MIS",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
    {
      id: "customer-churn-analytics",
      title: "Customer Churn & Retention Analytics",
      company: "GISMA University of Applied Sciences",
      category: "Data Science",
      status: "In Progress",
      period: "2026 – Present",
      shortDescription:
        "Applied machine learning classification model investigating telecom and retail customer retention drivers.",
      description:
        "Applied machine learning classification model investigating telecom and retail customer retention drivers.",
      problemStatement:
        "Identifying early behavioral indicators of customer churn in subscription businesses to inform data-driven retention interventions.",
      architecture:
        "Developing end-to-end Python data science pipeline using Pandas, Scikit-Learn, and Seaborn for exploratory data analysis, feature engineering, classification modeling (Random Forest, Logistic Regression), and ROC-AUC evaluation.",
      deliverables: [
        "Exploratory data analysis identifying high-risk customer segments.",
        "Feature importance ranking identifying top drivers of customer attrition.",
        "Coursework research report benchmarking predictive accuracy and interpretability.",
      ],
      tools: ["Python", "Scikit-Learn", "Pandas", "Statistical Modeling", "Jupyter"],
      highlights: "GISMA MSc research project currently benchmarking classification accuracy and feature importance.",
      impactMetric: "GISMA MSc Research · Predictive Modeling",
      githubUrl: "https://github.com/upendragunti098-lab",
    },
  ] as ProjectItem[],

  // --------------------------------------------------------------------------
  // Dedicated Read-Only Dataset for the Interactive SQL Sandbox
  // --------------------------------------------------------------------------
  sqlSandboxData: {
    tables: {
      upendra_career_impact: [
        {
          company: "Innodata",
          role: "Senior Associate – Python Q&A Reviewer (AI/LLM)",
          location: "Remote, India",
          period: "03/2026 – 05/2026",
          team_size: 40,
          primary_tool: "Python, LLM Evaluation",
          impact_metric: "Coordinated 40 evaluators, code review QA",
          key_outcome: "Standardized evaluation rubrics, code correctness verification",
        },
        {
          company: "Innodata",
          role: "Freelance LLM Evaluator / Aligner",
          location: "Remote",
          period: "03/2025 – 03/2026",
          team_size: 1,
          primary_tool: "LLM Evaluation, Prompt QA",
          impact_metric: "Multi-turn model ranking, RLHF rubrics",
          key_outcome: "Evaluated AI responses for factual accuracy and safety",
        },
        {
          company: "Vodafone Idea",
          role: "Data Analyst / MIS Executive",
          location: "India",
          period: "10/2024 – 03/2025",
          team_size: 12,
          primary_tool: "Power BI, SQL, SAP MM",
          impact_metric: "Multi-store retail network KPI tracking",
          key_outcome: "Automated daily reporting cadence, reconciled SAP MM PR/PO/GRN",
        },
        {
          company: "Improve Business Solutions",
          role: "MIS Analyst",
          location: "India",
          period: "06/2023 – 09/2024",
          team_size: 8,
          primary_tool: "Power BI, SQL, Excel",
          impact_metric: "Operational reporting automation",
          key_outcome: "Consolidated ETL pipelines, historical trend forecasting",
        },
      ],

      upendra_technical_skills: [
        {
          category: "Programming & Data",
          skill_name: "Python",
          proficiency_level: "Advanced",
          experience_years: "3+",
          verified_context: "AI code review, debugging, data science modeling",
        },
        {
          category: "Programming & Data",
          skill_name: "SQL (PostgreSQL, MySQL)",
          proficiency_level: "Advanced",
          experience_years: "3+",
          verified_context: "Query optimization, ETL, relational schemas",
        },
        {
          category: "Programming & Data",
          skill_name: "Advanced Excel & Power Query",
          proficiency_level: "Expert",
          experience_years: "3+",
          verified_context: "Automated MIS models, complex lookups, financial reconciliation",
        },
        {
          category: "Business Intelligence",
          skill_name: "Power BI & DAX",
          proficiency_level: "Advanced",
          experience_years: "3+",
          verified_context: "Enterprise executive dashboards, multi-store retail KPIs",
        },
        {
          category: "AI & LLM Evaluation",
          skill_name: "LLM Output Ranking & Prompt QA",
          proficiency_level: "Expert",
          experience_years: "2+",
          verified_context: "Innodata AI data evaluation, rubric design, team leadership",
        },
        {
          category: "Business Systems",
          skill_name: "SAP MM (PR, PO, GRN)",
          proficiency_level: "Intermediate",
          experience_years: "1+",
          verified_context: "Procurement records tracking at Vodafone Idea",
        },
        {
          category: "Leadership & Collaboration",
          skill_name: "Team Leadership & Coordination",
          proficiency_level: "Proven",
          experience_years: "1+",
          verified_context: "Coordinated a distributed team of 40 evaluators at Innodata",
        },
      ],

      upendra_projects: [
        {
          id: "supply-chain-logistics-performance",
          title: "Supply Chain & Logistics Performance Analytics",
          company: "Olist Logistics",
          domain: "Supply Chain & BI",
          status: "Completed",
          primary_stack: "Python, DuckDB, SQL, Streamlit, Power BI",
          impact: "Analyzed 96,470 orders; 8.11% delay rate; 13d regional transit gap; ROC-AUC 0.765",
        },
        {
          id: "retail-demand-intelligence",
          title: "Retail Demand Intelligence & Inventory Optimization",
          company: "Vodafone Idea",
          domain: "Business Intelligence",
          status: "Completed",
          primary_stack: "Power BI, DAX, SQL, SAP MM",
          impact: "Automated daily multi-store operational reports",
        },
        {
          id: "llm-evaluation-benchmark",
          title: "LLM Evaluation & Data Quality Analytics",
          company: "Innodata",
          domain: "AI & LLM Evaluation",
          status: "Completed",
          primary_stack: "Python, LLM Evaluation, Code Review",
          impact: "Led 40-person team in Python code QA and prompt scoring",
        },
        {
          id: "supply-chain-logistics-mis",
          title: "Supply Chain & Logistics Operational MIS",
          company: "Improve Business Solutions",
          domain: "Data Analytics",
          status: "Completed",
          primary_stack: "SQL, Power BI, Advanced Excel",
          impact: "Automated ETL reporting pipeline & trend forecasting",
        },
        {
          id: "customer-churn-analytics",
          title: "Customer Churn & Retention Analytics",
          company: "GISMA University",
          domain: "Data Science",
          status: "In Progress",
          primary_stack: "Python, Scikit-Learn, Pandas",
          impact: "MSc predictive modeling on customer retention drivers",
        },
      ],
    },

    prebuiltQueries: [
      {
        id: "query-1",
        filename: "query_1.sql",
        title: "Career Impact & Team Leadership by Organization",
        description: "Summarizes organizations, roles, team sizes, and measurable outcomes.",
        sql: `SELECT 
  company, 
  role, 
  location, 
  team_size, 
  impact_metric, 
  primary_tool 
FROM upendra_career_impact 
ORDER BY period DESC;`,
      },
      {
        id: "query-2",
        filename: "query_2.sql",
        title: "Technical Skills & Verified Production Context",
        description: "Inventories key technical proficiencies and production application contexts.",
        sql: `SELECT 
  category, 
  skill_name, 
  proficiency_level, 
  experience_years, 
  verified_context 
FROM upendra_technical_skills 
ORDER BY category ASC, skill_name ASC;`,
      },
      {
        id: "query-3",
        filename: "query_3.sql",
        title: "Production Analytics & AI Projects Portfolio",
        description: "Queries delivered projects, status, organization, and primary technology stack.",
        sql: `SELECT 
  title, 
  company, 
  domain, 
  status, 
  primary_stack, 
  impact 
FROM upendra_projects 
ORDER BY status ASC, company ASC;`,
      },
    ] as SqlSandboxQuery[],
  },
};
