"use client";

import React, { useState } from "react";
import { Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface PartnerUni {
  name: string;
  location: string;
  rank: string;
}

const partners: Record<string, PartnerUni[]> = {
  USA: [
    { name: "Stanford University", location: "California, USA", rank: "QS Rank #5" },
    { name: "Massachusetts Institute of Tech", location: "Boston, USA", rank: "QS Rank #1" },
    { name: "New York University", location: "New York, USA", rank: "QS Rank #38" },
    { name: "University of Southern California", location: "Los Angeles, USA", rank: "QS Rank #116" },
  ],
  UK: [
    { name: "University of Oxford", location: "Oxford, UK", rank: "QS Rank #3" },
    { name: "University of Cambridge", location: "Cambridge, UK", rank: "QS Rank #2" },
    { name: "Imperial College London", location: "London, UK", rank: "QS Rank #6" },
    { name: "University of Manchester", location: "Manchester, UK", rank: "QS Rank #32" },
  ],
  Canada: [
    { name: "University of Toronto", location: "Toronto, Canada", rank: "QS Rank #21" },
    { name: "University of British Columbia", location: "Vancouver, Canada", rank: "QS Rank #34" },
    { name: "McGill University", location: "Montreal, Canada", rank: "QS Rank #30" },
    { name: "University of Waterloo", location: "Waterloo, Canada", rank: "QS Rank #112" },
  ],
  Australia: [
    { name: "University of Melbourne", location: "Melbourne, Australia", rank: "QS Rank #14" },
    { name: "University of Sydney", location: "Sydney, Australia", rank: "QS Rank #19" },
    { name: "Australian National University", location: "Canberra, Australia", rank: "QS Rank #30" },
    { name: "University of Queensland", location: "Brisbane, Australia", rank: "QS Rank #43" },
  ],
  Europe: [
    { name: "Technical University of Munich", location: "Munich, Europe", rank: "QS Rank #37" },
    { name: "Heidelberg University", location: "Heidelberg, Europe", rank: "QS Rank #79" },
    { name: "ETH Zurich", location: "Zurich, Europe", rank: "QS Rank #7" },
    { name: "Sorbonne University", location: "Paris, France", rank: "QS Rank #59" },
  ],
};

export default function Partners() {
  const [activeRegion, setActiveRegion] = useState("USA");
  const list = partners[activeRegion] || [];

  return (
    <section className="section-y bg-white relative">
      <div className="shell">
        <SectionHeading
          eyebrow="Global network"
          title="Partner universities & institutions"
          description="Direct application pathways and priority credit transfers with 350+ accredited schools worldwide."
        />

        {/* Region selector — a proper segmented control rather than
            free-floating pills. */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 p-1 bg-ink-100 rounded-xl overflow-x-auto no-scrollbar">
            {Object.keys(partners).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeRegion === region
                    ? "bg-white text-orange-700 shadow-e1"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="wait">
            {list.map((uni, index) => (
              <motion.div
                key={`${activeRegion}-${uni.name}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card card-hover p-5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-ink-50 group-hover:bg-orange-50 flex items-center justify-center text-ink-500 group-hover:text-orange-600 transition-colors">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-ink-900 group-hover:text-orange-700 transition-colors leading-snug">
                    {uni.name}
                  </h3>
                  <p className="text-xs text-ink-500 mt-1">{uni.location}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-ink-200 flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-ink-400 uppercase tracking-wider">Ranking</span>
                  <span className="text-ink-900">{uni.rank}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
