import { useEffect, useRef } from "react";

// Adds the .in-view class when an element scrolls into the viewport.
// Used sparingly (see frontend design principle: one orchestrated
// treatment, not fade-ups on every single card).
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
