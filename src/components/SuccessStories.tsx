"use client";

import React, { useState, useEffect } from "react";
import { Quote, ArrowLeft, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface Testimonial {
  name: string;
  avatar: string;
  image?: string;
  country: string;
  visaType: string;
  story: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Aarav Sharma",
    avatar: "AS",
    image: "/images/test_aarav.png",
    country: "USA",
    visaType: "F-1 Student Visa (Stanford)",
    story: "VisaEnsure handled my application to Stanford with absolute elite care. From SOP editing to mock consular interview drills, the process was seamless. I got my F-1 stamped in Hyderabad within 15 days!",
  },
  {
    name: "Sneha Reddy",
    avatar: "SR",
    image: "/images/test_sneha.png",
    country: "Canada",
    visaType: "Express Entry PR",
    story: "My CRS points were at 480, and I was losing hope. VisaEnsure guided me to secure a Provincial Nomination (PNP) from Ontario, boosting my score by 600 points. Today, I am living my dream in Toronto as a Permanent Resident.",
  },
  {
    name: "Mohammed Ibrahim",
    avatar: "MI",
    image: "/images/test_mohammed.png",
    country: "UK",
    visaType: "Skilled Worker Visa (London)",
    story: "Getting a job offer in London was one thing, but auditing the Certificate of Sponsorship (CoS) and filing the UK work permit was stressful. VisaEnsure took over completely, lodging my visa in Priority. Fast approval!",
  },
  {
    name: "Pooja Hegde",
    avatar: "PH",
    image: "/images/test_pooja.png",
    country: "Europe",
    visaType: "Opportunity Card (Chancenkarte)",
    story: "The new Europe Chancenkarte points system was confusing, but VisaEnsure's eligibility questionnaire and document auditing made it simple. My blocked account and visa filing were completed in record time.",
  },
];

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="success-stories" className="section-y bg-white border-t border-ink-200 relative overflow-hidden">
      <div className="shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Client success stories"
          description="Real files, real outcomes — from Hyderabad to Stanford, Toronto, London, and Munich."
        />

        {/* Carousel Window */}
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 md:p-12 relative overflow-hidden flex flex-col items-center">
            <div className="absolute -top-2 left-6 text-orange-100 pointer-events-none select-none">
              <Quote className="w-24 h-24 rotate-180" />
            </div>

            <div className="relative z-10 w-full min-h-[248px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full text-center"
                >
                  {/* Stars */}
                  <div className="flex gap-1 text-orange-500 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {/* Story — the quote is the hero here, so it gets real size */}
                  <p className="mt-6 text-ink-800 text-lg md:text-xl leading-[1.6] font-heading font-medium max-w-2xl mx-auto tracking-[-0.015em]">
                    &ldquo;{current.story}&rdquo;
                  </p>

                  {/* Profile */}
                  <div className="mt-8 flex items-center gap-3 justify-center">
                    <div className="w-11 h-11 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                      {current.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-ink-900">{current.name}</h4>
                      <span className="text-xs text-ink-500 font-medium">
                        {current.visaType}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls — dots convey position, arrows handle navigation */}
            <div className="flex items-center gap-5 mt-8 relative z-20">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-ink-200 text-ink-600 hover:border-orange-300 hover:text-orange-600 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeIndex
                        ? "w-6 bg-orange-600"
                        : "w-1.5 bg-ink-300 hover:bg-ink-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-ink-200 text-ink-600 hover:border-orange-300 hover:text-orange-600 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
