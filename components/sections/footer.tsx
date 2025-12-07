"use client";

import { useEffect, useState, useRef } from "react";
import { GitCommit, Heart } from "lucide-react";
import Link from "next/link";
import Container from "@/components/container";

export default function Footer() {
  const [commit, setCommit] = useState<{ sha: string; url: string } | null>(
    null
  );
  const [views, setViews] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    setMounted(true);

    if (initialized.current) return;
    initialized.current = true;

    // Fetch latest commit
    fetch("https://api.github.com/repos/byrafael/rsrdev.com/commits?per_page=1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCommit({
            sha: data[0].sha.substring(0, 7),
            url: data[0].html_url,
          });
        }
      })
      .catch((err) => console.error("Failed to fetch commit", err));

    // Fetch page views
    fetch("https://abacus.jasoncameron.dev/hit/rsrdev.com/main")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.value === "number") {
          setViews(data.value);
        }
      })
      .catch((err) => console.error("Failed to fetch views", err));
  }, []);

  if (!mounted) return null;

  return (
    <footer className="w-full py-8 mt-12">
      <Container>
        <div className="bg-muted/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          {/* Left: Copyright */}
          <div className="flex items-center order-2 md:order-1">
            <span>&copy; {new Date().getFullYear()} Rafael Soley.</span>
          </div>

          {/* Center: Made with */}
          <div className="flex items-center gap-1.5 order-1 md:order-2">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5" />
            <span>and Next.js</span>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-3 order-3">
            <div className="flex items-center gap-1">
              {views !== null ? (
                <Link
                  href="https://abacus.jasoncameron.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  <span>{views.toLocaleString("en-US")} views</span>
                </Link>
              ) : (
                <span className="animate-pulse">...</span>
              )}
            </div>

            {commit && views !== null && (
              <div className="h-4 w-px bg-border hidden md:block" />
            )}

            {commit && (
              <Link
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <GitCommit className="h-3.5 w-3.5" />
                <span className="font-mono text-xs">{commit.sha}</span>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
