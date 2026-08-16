import { useCallback, useEffect, useRef, useState } from "react";
import { sections } from "./sections";

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dark, setDark] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to a section by index
  const scrollTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, sections.length - 1));
    sectionRefs.current[clamped]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // On mount: read hash and scroll to it
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const idx = parseInt(hash, 10) - 1;
    if (idx >= 0 && idx < sections.length) {
      // Use instant scroll on initial load
      requestAnimationFrame(() => {
        sectionRefs.current[idx]?.scrollIntoView({ behavior: "instant" });
      });
    }
  }, []);

  // IntersectionObserver to track active section + fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = sectionRefs.current.indexOf(
            entry.target as HTMLElement
          );
          if (idx === -1) continue;

          // Fade in/out inner content
          const inner = entry.target.querySelector(".slide-inner");
          if (inner) {
            if (entry.isIntersecting) {
              inner.classList.add("visible");
            } else {
              inner.classList.remove("visible");
            }
          }

          // Track active section
          if (entry.isIntersecting) {
            setActiveIndex(idx);
            window.history.replaceState(null, "", `#${idx + 1}`);
          }
        }
      },
      { threshold: 0.5 }
    );

    const refs = sectionRefs.current;
    refs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      refs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case " ":
          e.preventDefault();
          scrollTo(activeIndex + 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          scrollTo(activeIndex - 1);
          break;
        case "Home":
          e.preventDefault();
          scrollTo(0);
          break;
        case "End":
          e.preventDefault();
          scrollTo(sections.length - 1);
          break;
        case "d":
          setDark((d) => !d);
          break;
        case "n":
          setShowNotes((n) => !n);
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, scrollTo]);

  return (
    <div
      ref={containerRef}
      className={`deck ${dark ? "dark" : "light"}`}
    >
      {sections.map((section, i) => (
        <section
          key={i}
          ref={(el) => { sectionRefs.current[i] = el; }}
          className="slide"
        >
          <div className="slide-inner">{section.content}</div>
        </section>
      ))}

      {/* Dot navigation */}
      <nav className="dots" aria-label="Slide navigation">
        {sections.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === activeIndex ? "active" : ""}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </nav>

      {/* Speaker notes overlay */}
      {showNotes && (
        <div className="notes-overlay">
          <p>{sections[activeIndex].note}</p>
        </div>
      )}
    </div>
  );
}
