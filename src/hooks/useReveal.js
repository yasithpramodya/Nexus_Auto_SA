import { useEffect, useRef } from 'react';

/**
 * useReveal – attaches an IntersectionObserver to the returned ref's container
 * and toggles the "in" class on any child that has "reveal", "reveal-left", or
 * "reveal-right" when it enters the viewport.
 */
export function useReveal(threshold = 0.02, rootMargin = '150px 0px 50px 0px') {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll
      ? container.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      : [container];

    const elementList = targets.length ? Array.from(targets) : [container];

    // Immediately reveal anything already near or inside viewport
    const vh = window.innerHeight || 800;
    elementList.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh + 150) {
        el.classList.add('in');
      }
    });

    if (typeof IntersectionObserver === 'undefined') {
      elementList.forEach((el) => el.classList.add('in'));
      return;
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
      { threshold, rootMargin }
    );

    elementList.forEach((t) => {
      if (!t.classList.contains('in')) {
        obs.observe(t);
      }
    });

    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
