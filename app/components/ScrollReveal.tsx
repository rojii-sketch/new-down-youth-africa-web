import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type ScrollRevealDirection = "up" | "left" | "right" | "none";

export default function ScrollReveal({
  children,
  delay = "delay-0",
  direction = "up",
}: {
  children: ReactNode;
  delay?: string;
  direction?: ScrollRevealDirection;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || direction === "none" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.revealed = "true";
      observer.disconnect();
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [direction]);

  return (
    <div ref={elementRef} className={`scroll-reveal ${delay}`} data-direction={direction}>
      {children}
    </div>
  );
}
