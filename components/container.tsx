import React from "react";

export default function Container({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={`max-w-4xl w-full mx-auto px-8 sm:px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
