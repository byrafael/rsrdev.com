"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1000,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const t = useTranslation();

  return (
    <section id="about" className="py-16">
      <Container className="space-y-12">
        <p className="text-foreground/85 leading-relaxed text-lg">
          {t.about.paragraph}
        </p>

        {/* Stats Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.about.stats.map((stat: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 text-center animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl md:text-6xl font-bold bg-linear-to-br from-foreground to-foreground/50 bg-clip-text text-transparent mb-2 tracking-tight">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix || ""}
                  prefix={stat.prefix || ""}
                  className="tabular-nums"
                />
              </div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
