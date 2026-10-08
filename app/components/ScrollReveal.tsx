import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export type ScrollRevealDirection = "up" | "left" | "right" | "none";

const offsetTransforms: Record<ScrollRevealDirection, string> = {
  up: "translate-y-10",
  left: "-translate-x-10",
  right: "translate-x-10",
  none: "",
};

export default function ScrollReveal({
  children,
  delay = "delay-0",
  direction = "up",
}: {
  children: ReactNode;
  delay?: string;
  direction?: ScrollRevealDirection;
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (elementRef.current) observer.unobserve(elementRef.current);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  const hiddenClasses = [
    "opacity-0",
    offsetTransforms[direction],
    "scale-[0.98]",
    "pointer-events-none",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out transform ${delay} ${
        isIntersecting
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : hiddenClasses
      }`}
    >
      {children}
    </div>
  );
}