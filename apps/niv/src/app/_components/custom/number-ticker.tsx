"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "~/lib/utils";

export function NumberTicker({
  value,
  className,
  decimalPlaces = 0,
  loop = false,
}: {
  value: number;
  className?: string;
  decimalPlaces?: number;
  loop?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (loop) {
      interval = setInterval(() => {
        const randomValue = Math.floor(Math.random() * value) + 1;
        motionValue.set(randomValue);
      }, 15);
    } else {
      motionValue.set(value);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [motionValue, value, loop]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [springValue, decimalPlaces]);

  return (
    <span
      className={cn("inline-block tabular-nums tracking-wider", className)}
      ref={ref}
    />
  );
}
