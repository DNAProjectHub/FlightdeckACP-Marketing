"use client";

import { useEffect } from "react";

export default function SnapNavigator() {
  useEffect(() => {
    let isScrolling = false;

    const getSections = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(".snap-section")
      );

    const getCurrentIndex = (sections: HTMLElement[]) => {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;
      let currentIdx = 0;
      let smallestDelta = Infinity;
      sections.forEach((section, i) => {
        const center = section.offsetTop + section.offsetHeight / 2;
        const delta = Math.abs(center - viewportCenter);
        if (delta < smallestDelta) {
          smallestDelta = delta;
          currentIdx = i;
        }
      });
      return currentIdx;
    };

    const scrollToSection = (section: HTMLElement) => {
      isScrolling = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      // Lock briefly so rapid keypresses don't fire mid-scroll
      setTimeout(() => {
        isScrolling = false;
      }, 700);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Don't hijack keys when the user is typing
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const isDown =
        e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      const isUp = e.key === "ArrowUp" || e.key === "PageUp";

      if (!isDown && !isUp) return;
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const sections = getSections();
      if (sections.length === 0) return;

      const current = getCurrentIndex(sections);
      const next = isDown
        ? Math.min(current + 1, sections.length - 1)
        : Math.max(current - 1, 0);

      if (next !== current) {
        e.preventDefault();
        scrollToSection(sections[next]);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
