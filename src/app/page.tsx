"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { SqlSandbox } from "@/components/sections/SqlSandbox";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { CvModal } from "@/components/modals/CvModal";
import { ProjectDetailModal } from "@/components/modals/ProjectDetailModal";
import { ProjectItem } from "@/data/portfolio";

export default function Home() {
  const [isCvOpen, setIsCvOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(
    null
  );

  const handleOpenSandbox = () => {
    setSelectedProject(null);
    const el = document.getElementById("sandbox");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenCv={() => setIsCvOpen(true)} />

      <main className="flex-1">
        <Hero
          onOpenCv={() => setIsCvOpen(true)}
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenSandbox={handleOpenSandbox}
        />
        <SqlSandbox />
        <Contact />
      </main>

      <Footer />

      {/* Global Modals */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenSandbox={handleOpenSandbox}
      />
    </div>
  );
}
