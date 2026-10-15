import { useEffect, useRef } from 'react';

/**
 * useReveal – attaches an IntersectionObserver to the returned ref's container
 * and toggles the "in" class on any child that has "reveal", "reveal-left", or
 * "reveal-right" when it enters the viewport.
 */
export function useReveal(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll
      ? container.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      : [container];

    if (!targets.length) {
      // Treat the container itself as the target
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); } },
        { threshold }
      );
      obs.observe(container);
      return () => obs.disconnect();
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
