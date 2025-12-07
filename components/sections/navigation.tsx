"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const t = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.education, href: "#education" },
    // { label: t.nav.research, href: "#research" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <Container className="py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hover:text-accent transition-colors flex items-center gap-2"
        >
          Rafael Soley
          {activeSection && activeSection !== "hero" && (
            <>
              <span className="text-muted-foreground/40">/</span>
              <span className="text-muted-foreground font-normal text-base">
                {activeSection}
              </span>
            </>
          )}
        </Link>

        <div className="hidden md:flex gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-muted-foreground hover:text-accent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </Container>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <Container className="py-3">
            <div className="flex flex-wrap gap-x-5 gap-y-2 px-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}
