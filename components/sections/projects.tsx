"use client";

import Container from "@/components/container";
import { BsGithub, BsBoxArrowUpRight } from "react-icons/bs";
import { Code } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import {
  transformTranslationToProjects,
  type TranslationProject,
} from "@/lib/content-data";

export default function Projects() {
  const t = useTranslation();

  // Transform and get projects dynamically
  const rawProjects = t.projects.list as unknown as TranslationProject[];
  const projects = transformTranslationToProjects(rawProjects);

  return (
    <section id="projects" className="py-16">
      <Container>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Code className="w-8 h-8 text-primary" />
          {t.projects.title}
        </h2>
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
