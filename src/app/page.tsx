"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles } from "lucide-react";

// Components
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Dynamic Imports for below-the-fold sections to drastically improve load time
const Services = dynamic(() => import("@/components/Services"));
const Destinations = dynamic(() => import("@/components/Destinations"));
const WhyChoose = dynamic(() => import("@/components/WhyChoose"));
const Process = dynamic(() => import("@/components/Process"));
const Partners = dynamic(() => import("@/components/Partners"));
const SuccessStories = dynamic(() => import("@/components/SuccessStories"));
const Stats = dynamic(() => import("@/components/Stats"));
const AssessmentCTA = dynamic(() => import("@/components/AssessmentCTA"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));

// Interactive Tools (placed in Digital Visa Lounge)
const ComparisonTool = dynamic(() => import("@/components/ComparisonTool"));
const Calculator = dynamic(() => import("@/components/Calculator"));
const ChecklistGenerator = dynamic(() => import("@/components/ChecklistGenerator"));

// Floating / Modal utilities
import SmoothScroll from "@/components/SmoothScroll";
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
const AIChat = dynamic(() => import("@/components/AIChat"), { ssr: false });

// Modals (Load only when needed, but they are controlled by state, so we just lazy load the component code)
const BookingModal = dynamic(() => import("@/components/BookingModal"), { ssr: false });
const EligibilityChecker = dynamic(() => import("@/components/EligibilityChecker"), { ssr: false });
const StatusTracker = dynamic(() => import("@/components/StatusTracker"), { ssr: false });

// Scroll Transition Wrapper
import SectionReveal from "@/components/SectionReveal";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  // Modal states
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen relative overflow-hidden bg-white">
        {/* Background is intentionally near-white. Colour is carried by the
            sections themselves, not by a full-page wash — the previous
            blur stack desaturated every card sitting on top of it. */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-[15%] -right-[10%] w-[720px] h-[720px] rounded-full bg-orange-100/25 blur-[140px]" />
          <div className="absolute top-[45%] -left-[15%] w-[620px] h-[620px] rounded-full bg-orange-50/40 blur-[150px]" />
        </div>


        {/* Header Block */}
        <TopBar />
        <Navbar
          onOpenAssessment={() => setIsAssessmentOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenTracker={() => setIsTrackerOpen(true)}
        />

        {/* Hero Section */}
        <Hero
          onOpenAssessment={() => setIsAssessmentOpen(true)}
          onOpenBooking={() => setIsBookingOpen(true)}
        />

        {/* Services Section */}
        <SectionReveal className="surface-muted border-y border-ink-200 relative z-10">
          <Services
            onOpenAssessment={() => setIsAssessmentOpen(true)}
            onOpenChecklist={() => {
              const el = document.getElementById("visa-lounge");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </SectionReveal>

        {/* Destinations Section (Featured Countries) — first black beat */}
        <SectionReveal className="section-dark relative z-10">
          <Destinations />
        </SectionReveal>

        {/* Digital Visa Lounge: SaaS Interactive Tools Section */}
        <SectionReveal id="visa-lounge" className="section-y bg-transparent relative overflow-hidden z-10">
          <div className="shell relative z-10">
            <SectionHeading
              eyebrow="Visa Lounge"
              eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
              title="Plan your move with real numbers"
              description="Compare destinations, estimate total cost, and generate a document checklist tailored to your case — instantly, with no sign-up."
            />

            {/* Grid display for the three advanced utilities */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              <ComparisonTool />
              <Calculator />
              <ChecklistGenerator />
            </div>
          </div>
        </SectionReveal>

        {/* Why Choose Section */}
        <SectionReveal className="bg-transparent relative z-10">
          <WhyChoose />
        </SectionReveal>

        {/* Timeline Process */}
        <SectionReveal className="surface-muted border-y border-ink-200 relative z-10">
          <Process />
        </SectionReveal>

        {/* Partner Universities */}
        <SectionReveal className="bg-transparent relative z-10">
          <Partners />
        </SectionReveal>

        {/* Testimonials */}
        <SectionReveal className="bg-transparent relative z-10">
          <SuccessStories />
        </SectionReveal>

        {/* Stats + final CTA — one continuous black block. Rendering them
            as two adjacent dark sections put a visible seam between two
            identical gradients. */}
        <SectionReveal className="section-dark relative z-10">
          <Stats />
          <div className="shell">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-600/25 to-transparent" />
          </div>
          <AssessmentCTA onOpenAssessment={() => setIsAssessmentOpen(true)} />
        </SectionReveal>

        {/* Contact form and business info */}
        <SectionReveal className="surface-muted border-y border-ink-200 relative z-10">
          <Contact />
        </SectionReveal>

        {/* Footer */}
        <Footer />

        {/* Floating Widgets */}
        <WhatsAppButton />
        <AIChat />

        {/* Dialog Overlays */}
        <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        <EligibilityChecker isOpen={isAssessmentOpen} onClose={() => setIsAssessmentOpen(false)} />
        <StatusTracker isOpen={isTrackerOpen} onClose={() => setIsTrackerOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
