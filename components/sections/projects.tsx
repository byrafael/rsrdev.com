"use client";

import Container from "@/components/container";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";
import { useTranslation } from "@/hooks/use-translation";

export default function Projects() {
  const t = useTranslation();
  const projects = [
    {
      title: "EconSys",
      description: t.projects.list[0].description,
      tags: ["Node.js", "Express", "API", "MySQL", "Virtual Economy"],
      source: "https://github.com/byrafael/EconSys",
      preview: undefined,
    },
    {
      title: "QuantOps",
      description: t.projects.list[1].description,
      tags: ["Python", "Quantitative Trading", "Backtesting", "CLI"],
      source: "https://github.com/byrafael/QuantOps",
      preview: undefined,
    },
    {
      title: "Schedulr",
      description: t.projects.list[2].description,
      tags: ["Next.js", "MySQL", "Education Tech"],
      source: "https://github.com/byrafael/Schedulr",
      preview: undefined,
    },
    {
      title: "Mosaic",
      description: t.projects.list[3].description,
      tags: ["Node.js", "Microservices", "Operations Automation", "SaaS"],
      source: "https://github.com/byrafael/Mosaic",
      preview: undefined,
    },
    {
      title: "EconDash",
      description: t.projects.list[4].description,
      tags: ["React", "D3.js", "Dashboard", "Data Visualization"],
      source: "https://github.com/byrafael/EconDash",
      preview: undefined,
    },
    {
      title: "ReconBot",
      description: t.projects.list[5].description,
      tags: ["Node.js", "Discord.js"],
      source: undefined,
      preview: "https://reconbot.xyz",
    },
  ];

  return (
    <section id="projects" className="py-16 border-t border-border">
      <Container>
        <h2 className="text-lg font-semibold mb-8">{t.projects.title}</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          {t.projects.disclaimer}
        </p>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="group">
              <div className="flex items-center justify-between gap-3 mb-1">
                <h3 className="font-medium">{project.title}</h3>
                <div className="flex gap-2 shrink-0">
                  {project.preview && (
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                      aria-label="View live preview"
                    >
                      <BsBoxArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {project.source && (
                    <a
                      href={project.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                      aria-label="View source code"
                    >
                      <BsGithub className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {index < projects.length - 1 && (
                <div className="mt-6 border-t border-border/50" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
