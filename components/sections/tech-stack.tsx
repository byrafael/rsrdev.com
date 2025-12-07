"use client";

import Container from "@/components/container";
import { Terminal } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function TechStack() {
  const t = useTranslation();

  const categories = [
    {
      name: t.techStack.categories.languages,
      skills: ["Python", "Javascript", "Typescript", "LuaU", "SQL"],
    },
    {
      name: t.techStack.categories.mlData,
      skills: [
        "PyTorch",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "XGBoost",
        "Matplotlib/Pygwalker",
      ],
    },
    {
      name: t.techStack.categories.trading,
      skills: ["Backtrader", "YFinance", "Real-time feeds"],
    },
    {
      name: t.techStack.categories.infrastructure,
      skills: ["AWS", "Docker", "Kubernetes", "MySQL", "Redis", "Colab"],
    },
    {
      name: t.techStack.categories.web,
      skills: ["React", "Tailwind", "Next.js", "Node.js", "Express", "Django"],
    },
    {
      name: t.techStack.categories.tools,
      skills: ["Git", "Linux", "VSCode", "Jupyter", "Grafana"],
    },
    {
      name: t.techStack.categories.sound,
      skills: [
        "Yamaha DM3 Series",
        "Bose Professional Sound Systems",
        "Surge Management",
        "Handheld Wireless Microphones",
        "Lavalier Wireless Microphones",
      ],
    },
  ];

  return (
    <section id="tech-stack" className="py-16">
      <Container>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Terminal className="w-8 h-8 text-primary" />
          {t.techStack.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {category.skills.join(" • ")}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
