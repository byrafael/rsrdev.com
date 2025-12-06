"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";
import {
  transformTranslationToResearchPosts,
  sortResearchByDate,
  type TranslationResearchPost,
} from "@/lib/content-data";

export default function Research() {
  const t = useTranslation();

  // Transform and sort research posts dynamically
  const rawPosts = t.research.list as unknown as TranslationResearchPost[];
  const postsData = transformTranslationToResearchPosts(rawPosts);
  const posts = sortResearchByDate(postsData);

  return (
    <section id="research" className="py-16 border-t border-border">
      <Container>
        <h2 className="text-lg font-semibold mb-8">{t.research.title}</h2>

        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t.research.noResearch}
          </p>
        ) : (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                className="block group hover:opacity-75 transition-opacity"
              >
                <div className="flex justify-between items-baseline gap-4 mb-2">
                  <h3 className="font-medium group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {post.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                {index < posts.length - 1 && (
                  <div className="mt-6 border-t border-border/50" />
                )}
              </a>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
