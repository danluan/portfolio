"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Fades its content in the first time it scrolls into view.
 * The hidden state only applies when JS is running (html[data-js]) and the
 * user has not asked for reduced motion; see .fade-in in globals.css.
 */
const Reveal = ({ children, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className ? `fade-in ${className}` : "fade-in"}>
      {children}
    </div>
  );
};

export default Reveal;
