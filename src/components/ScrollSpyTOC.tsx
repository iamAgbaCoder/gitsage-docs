"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function ScrollSpyTOC() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Automatically find all headings in the main documentation area
    const mainContent = document.querySelector("main");
    if (!mainContent) return;

    const elements = Array.from(mainContent.querySelectorAll("h2, h3"));
    const headingData = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName.substring(1)),
    })).filter(h => h.id); // Only include headings with IDs

    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (el.id) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-4" aria-label="Table of contents">
      <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
        On this page
      </p>
      <ul className="space-y-1">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(h.id);
                  if (target) {
                    window.scrollTo({
                      top: target.offsetTop - 120,
                      behavior: "smooth"
                    });
                  }
                }}
                className={cn(
                  "group block px-4 py-1.5 text-xs font-medium transition-all duration-300 border-l-2",
                  isActive
                    ? "text-sage border-sage/60 bg-sage/5"
                    : "text-slate-500 border-transparent hover:text-slate-300 hover:border-white/10 hover:bg-white/[0.02]"
                )}
                style={{ paddingLeft: `${(h.level - 2) * 1 + 1}rem` }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
