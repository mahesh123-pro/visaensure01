"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

function Counter({ end, suffix = "", duration = 2, decimals = 0 }: { end: number; suffix?: string; duration?: number; decimals?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      let startTimestamp: number | null = null;
      let animationFrame: number;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        setCount(progress * end);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      animationFrame = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration, hasStarted]);

  return (
    // Vivid brand orange, not the dark text tier — these are huge
    // numerals on black, where #FF6B00 reads at ~6:1.
    <span ref={ref} className="font-heading font-bold text-orange-600">
      {!hasStarted && !isInView ? (
        <span>{end.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
      ) : (
        <span>{count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
      )}
    </span>
  );
}

export default function Stats() {
  return (
    // Transparent — the parent section-dark wrapper supplies the black.
    <section className="section-y pb-14 relative overflow-hidden">
      {/* Subtle orange glow particle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-orange-600/4 blur-[120px] pointer-events-none" />



      <div className="shell relative z-10">
        {/* Hairline dividers between figures read more considered than
            four free-floating columns. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 divide-white/10 lg:divide-x">
          {[
            { end: 10000, suffix: "+", label: "Visa consultations completed" },
            { end: 98.6, suffix: "%", decimals: 1, label: "Historical approval success" },
            { end: 50, suffix: "+", label: "Global destinations covered" },
            { end: 5, suffix: "+ yrs", label: "Flagship agency status" },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <h3 className="text-[2.75rem] md:text-[3.5rem] leading-none tracking-tight">
                <Counter
                  end={s.end}
                  suffix={s.suffix}
                  duration={1.5}
                  decimals={s.decimals ?? 0}
                />
              </h3>
              <p className="mt-3 text-xs md:text-[13px] text-white/65 font-medium max-w-[16ch] mx-auto leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
