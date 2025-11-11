"use client";

import React from "react";
import { BsGithub, BsLinkedin, BsTwitterX, BsEnvelope } from "react-icons/bs";
import { useTranslation } from "@/hooks/use-translation";

export type SocialItem = Readonly<{
  id: string;
  href: string;
  label?: string;
  icon?: React.ReactNode;
}>;

export default function SocialIcons({
  items,
  size = 18,
  className = "flex gap-4 items-center",
}: Readonly<{
  items?: SocialItem[];
  size?: number;
  className?: string;
}>) {
  const t = useTranslation();

  const defaults: SocialItem[] = [
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/rafael-soley-9832a5327/",
      label: t.social.linkedin,
      icon: <BsLinkedin size={size} />,
    },
    {
      id: "github",
      href: "https://github.com/byrafael",
      label: t.social.github,
      icon: <BsGithub size={size} />,
    },
    {
      id: "x",
      href: "https://x.com",
      label: t.social.x,
      icon: <BsTwitterX size={size} />,
    },
    {
      id: "email",
      href: "mailto:hello@rsrdev.com",
      label: t.social.email,
      icon: <BsEnvelope size={size} />,
    },
  ];

  const list = items && items.length ? items : defaults;

  return (
    <div className={className}>
      {list.map((item) => {
        const isMail = item.href.startsWith("mailto:");
        return (
          <a
            key={item.id}
            href={item.href}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            aria-label={item.label ?? item.id}
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            {item.icon}
          </a>
        );
      })}
    </div>
  );
}
