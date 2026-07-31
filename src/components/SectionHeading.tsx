"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Render for placement on a dark section */
  tone?: "light" | "dark";
  align?: "center" | "left";
  className?: string;
}

/**
 * The single source of truth for section headers across the site.
 * Every section used to hand-roll its own eyebrow/title/description
 * stack, which is why spacing and type sizes had drifted apart.
 */
export default function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  tone = "light",
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl mb-14 md:mb-20 ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${isDark ? "eyebrow-dark" : ""}`}>
          {eyebrowIcon}
          {eyebrow}
        </span>
      )}

      <h2 className={`mt-5 t-h2 ${isDark ? "text-white" : "text-ink-900"}`}>
        {title}
      </h2>

      {/* The orange rule under every section title — the one piece of
          structural colour that ties the whole site together. */}
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "2.5rem", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`accent-bar mt-6 ${isCenter ? "mx-auto" : ""}`}
      />

      {description && (
        <p
          className={`mt-5 text-base md:text-[1.0625rem] leading-relaxed font-body ${
            isDark ? "text-white/65" : "text-ink-600"
          } ${isCenter ? "mx-auto" : ""} max-w-2xl`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
