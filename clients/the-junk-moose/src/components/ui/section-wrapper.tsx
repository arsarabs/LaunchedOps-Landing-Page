"use client";

import React, { useEffect, useRef } from "react";

export function SectionWrapper({
  children,
  className,
  id,
  reveal = "up",
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  reveal?: "up" | "blur" | "clip" | "scale" | "none";
  stagger?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reveal === "none") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { rootMargin: "-80px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reveal]);

  const revealAttr = reveal !== "up" && reveal !== "none" ? reveal : undefined;

  return (
    <section
      ref={ref}
      id={id}
      data-reveal={revealAttr}
      className={`${reveal !== "none" ? "section-reveal" : ""} ${stagger ? "stagger-children" : ""} ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
