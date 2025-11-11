"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";

export default function Blog() {
  const t = useTranslation();
  const posts: Array<{
    title: string;
    excerpt: string;
    date: string;
    link: string;
  }> = [
    // {
    //   title: "Building Low-Latency Trading Systems in 2024",
    //   excerpt:
    //     "A deep dive into modern approaches to sub-millisecond order execution and the trade-offs between latency and complexity.",
    //   date: "Nov 15, 2024",
    //   link: "https://cdn.rsrdev.com/papers/low-latency-trading-2024.pdf",
    // },
    // {
    //   title:
    //     "Machine Learning for Market Prediction: What Works & What Doesn't",
    //   excerpt:
    //     "Lessons learned from deploying ML models in production. Common pitfalls, overfitting traps, and realistic performance expectations.",
    //   date: "Nov 8, 2024",
    //   link: "https://cdn.rsrdev.com/papers/ml-market-prediction.pdf",
    // },
    // {
    //   title: "Statistical Arbitrage in Modern Markets",
    //   excerpt:
    //     "How statistical arbitrage strategies have evolved in an increasingly efficient market. Data sources and execution logistics.",
    //   date: "Oct 28, 2024",
    //   link: "https://cdn.rsrdev.com/papers/statistical-arbitrage.pdf",
    // },
  ];

  return (
    <section id="blog" className="py-16 border-t border-border">
      <Container>
        <h2 className="text-lg font-semibold mb-8">{t.blog.title}</h2>

        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t.blog.noResearch}</p>
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
