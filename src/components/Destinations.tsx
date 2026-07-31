"use client";

import React, { useState } from "react";
import { GraduationCap, Briefcase, Landmark, Compass, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface DestinationInfo {
  name: string;
  slug: string;
  desc: string;
  pathways: { icon: React.ReactNode; title: string; desc: string }[];
  metrics: { label: string; value: string }[];
}

const destinations: Record<string, DestinationInfo> = {
  USA: {
    name: "United States of America",
    slug: "usa-student-visa",
    desc: "Home to the world's most prestigious Ivy League institutions and tech giants in Silicon Valley. Ideal for students, researchers, and tech pioneers.",
    metrics: [
      { label: "Visa Processing", value: "15-30 Days" },
      { label: "Post-Study Work", value: "1 to 3 Years" },
      { label: "Average Entry Salary", value: "$85,000/yr" },
    ],
    pathways: [
      {
        icon: <GraduationCap className="w-5 h-5 text-orange-500" />,
        title: "F-1 Academic Route",
        desc: "Highest acceptance rates at major universities. Full interview coaching included.",
      },
      {
        icon: <Briefcase className="w-5 h-5 text-orange-500" />,
        title: "H-1B Cap Registration",
        desc: "Specialty occupation work visa petitions backed by labor verification auditing.",
      },
    ],
  },
  Canada: {
    name: "Canada",
    slug: "canada-pr",
    desc: "Voted #1 country for quality of life and welcoming social policies. Direct Express Entry permanent residency pathways with fast processing.",
    metrics: [
      { label: "Visa Processing", value: "6-8 Months (PR)" },
      { label: "Post-Study Work", value: "Up to 3 Years" },
      { label: "Average Entry Salary", value: "$65,000/yr" },
    ],
    pathways: [
      {
        icon: <Landmark className="w-5 h-5 text-orange-500" />,
        title: "Express Entry PR Draw",
        desc: "Federal Points System optimization for quick ITAs.",
      },
      {
        icon: <Briefcase className="w-5 h-5 text-orange-500" />,
        title: "Provincial Nominations",
        desc: "Targeted PNP streams for candidates with scores below 500.",
      },
    ],
  },
  UK: {
    name: "United Kingdom",
    slug: "uk-work-visa",
    desc: "Historical global hub with rich cultural heritage. Offers direct Graduate paths and sponsorship options in finance, IT, and medical segments.",
    metrics: [
      { label: "Visa Processing", value: "3-4 Weeks" },
      { label: "Post-Study Work", value: "2 Years (Graduate)" },
      { label: "Average Entry Salary", value: "£45,000/yr" },
    ],
    pathways: [
      {
        icon: <Briefcase className="w-5 h-5 text-orange-500" />,
        title: "Skilled Worker sponsorship",
        desc: "Requires license audits and SOC code/salary matching.",
      },
      {
        icon: <GraduationCap className="w-5 h-5 text-orange-500" />,
        title: "UK Graduate Route",
        desc: "Switch from Tier 4 student visa to 2-year work permit seamlessly.",
      },
    ],
  },
  Australia: {
    name: "Australia",
    slug: "australia-pr",
    desc: "Unmatched weather, high minimum wages, and robust medical systems. Direct PR channels based on work skills criteria.",
    metrics: [
      { label: "Visa Processing", value: "8-10 Months" },
      { label: "Post-Study Work", value: "2 to 4 Years" },
      { label: "Average Entry Salary", value: "$75,000/yr" },
    ],
    pathways: [
      {
        icon: <Landmark className="w-5 h-5 text-orange-500" />,
        title: "Subclass 189 / 190 PR",
        desc: "Skilled migration channels backed by Skills Assessments.",
      },
      {
        icon: <Briefcase className="w-5 h-5 text-orange-500" />,
        title: "Regional Subclass 491",
        desc: "5-year visa allowing living/working in regional Australia with PR pathways.",
      },
    ],
  },
  Europe: {
    name: "Europe",
    slug: "europe-job-seeker-visa",
    desc: "Europe's industrial powerhouse. High tech and engineering opportunities. The new Chancenkarte points visa makes migration easier.",
    metrics: [
      { label: "Visa Processing", value: "6-8 Weeks" },
      { label: "Job Seek Duration", value: "12 to 18 Months" },
      { label: "Average Entry Salary", value: "€55,000/yr" },
    ],
    pathways: [
      {
        icon: <Briefcase className="w-5 h-5 text-orange-500" />,
        title: "Opportunity Card (Chancenkarte)",
        desc: "Enter Europe on a points checklist to find employment.",
      },
      {
        icon: <Landmark className="w-5 h-5 text-orange-500" />,
        title: "EU Blue Card",
        desc: "Fast-track permanent residency for high-earning professionals.",
      },
    ],
  },
};

export default function Destinations() {
  const [activeTab, setActiveTab] = useState("USA");
  const data = destinations[activeTab];

  return (
    // Transparent — the parent section-dark wrapper supplies the black.
    <section id="destinations" className="section-y relative overflow-hidden">
      {/* Subtle orange glow particles */}
      <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-orange-600/4 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-orange-600/4 blur-[130px] pointer-events-none" />

      {/* Global Connection lines / map background */}


      <div className="shell relative z-10">
        <SectionHeading
          tone="dark"
          eyebrow="Global horizons"
          title="Explore top international destinations"
          description="Compare pathways, processing times, and costs for the world's leading economies."
        />

        {/* Tabs selector — elevated pill tabs for crisp selection */}
        <div className="flex gap-2 justify-start lg:justify-center p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl mb-10 overflow-x-auto no-scrollbar max-w-fit mx-auto">
          {Object.keys(destinations).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "text-white shadow-md"
                  : "text-white/50 hover:text-white/90 hover:bg-white/[0.05]"
              }`}
            >
              <span className="relative z-10">{tab === "USA" ? "United States" : tab}</span>
              {activeTab === tab && (
                <motion.span
                  layoutId="destination-tab"
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content Box */}
        <div className="card-dark rounded-2xl p-6 md:p-10 relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Info: Column span 7 */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading text-white flex items-center gap-3">
                    {data.name}
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed mt-3 max-w-2xl font-body">
                    {data.desc}
                  </p>
                </div>

                {/* Pathways */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.12em]">
                    Primary Immigration Channels
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.pathways.map((path, index) => (
                      <div
                        key={index}
                        className="bg-white/[0.04] border border-white/10 p-5 rounded-xl space-y-2.5 hover:border-orange-500/35 hover:bg-white/[0.07] transition-all duration-300"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          {path.icon}
                        </div>
                        <h5 className="text-sm font-bold text-white">{path.title}</h5>
                        <p className="text-[13px] text-white/55 leading-relaxed font-body">
                          {path.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Metrics: Column span 5 */}
              <div className="lg:col-span-5 bg-white/[0.04] border border-white/10 p-6 rounded-2xl space-y-6">
                <h4 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.12em]">
                  Key Metrics (2026)
                </h4>

                <div className="space-y-4">
                  {data.metrics.map((met, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-sm text-white/60">{met.label}</span>
                      <strong className="text-sm font-bold text-white">{met.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-white/60 font-semibold">Ready to choose?</span>
                  <a
                    href={`/services/${data.slug}`}
                    className="btn btn-primary text-sm px-5 py-2.5"
                  >
                    <span>View Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}
