"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Intersection Observer — trigger once when in view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          setTimeout(() => setHasStarted(true), delay * 1000);
        }
      },
      { rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  // Spring-like animation using requestAnimationFrame
  useEffect(() => {
    if (!hasStarted || !ref.current) return;

    const startValue = direction === "down" ? value : 0;
    const endValue = direction === "down" ? 0 : value;

    let current = startValue;
    let velocity = 0;
    const stiffness = 100;
    const damping = 60;
    let animationId: number;

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    const step = () => {
      const displacement = endValue - current;
      const springForce = stiffness * displacement;
      const dampingForce = damping * velocity;
      const acceleration = springForce - dampingForce;

      // Using a fixed time step for stability
      const dt = 1 / 60;
      velocity += acceleration * dt;
      current += velocity * dt;

      if (ref.current) {
        ref.current.textContent = formatter.format(
          Number(current.toFixed(decimalPlaces))
        );
      }

      // Stop when close enough and velocity is negligible
      if (Math.abs(displacement) < 0.01 && Math.abs(velocity) < 0.01) {
        if (ref.current) {
          ref.current.textContent = formatter.format(endValue);
        }
        return;
      }

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [hasStarted, value, direction, decimalPlaces]);

  return (
    <span
      className={cn("inline-block tabular-nums tracking-wider", className)}
      ref={ref}
    />
  );
}
