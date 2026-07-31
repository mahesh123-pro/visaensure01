"use client";

import React from "react";
import { UserCheck, Award, Zap, DollarSign, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function WhyChoose() {
  const points = [
    {
      icon: <UserCheck className="w-6 h-6 text-orange-600" />,
      title: "Personalized Support",
      desc: "Every applicant gets a dedicated Senior Case Manager. We evaluate your unique profile to build a custom application strategy, leaving no gaps.",
    },
    {
      icon: <Award className="w-6 h-6 text-orange-600" />,
      title: "Experienced Consultants",
      desc: "Our advisors have spent 15+ years handling complex cases, including Refusals, Gap justifications, Backlogs, and Sponsorship audits.",
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-600" />,
      title: "Fast Processing",
      desc: "We leverage automated check tools, priority filing queues, and direct consulate portal tracking to deliver results weeks ahead of standard schedules.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-orange-600" />,
      title: "Transparent Pricing",
      desc: "No hidden charges, no middleman commissions. We offer flat modular consulting rates and provide verified bank invoices for all transactions.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-orange-600" />,
      title: "High Approval Rate",
      desc: "Our strict pre-auditing checks ensure we only submit files that meet 95%+ criteria, yielding an outstanding historical visa stamp record of 98.6%.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-orange-600" />,
      title: "End-to-End Assistance",
      desc: "From initial IELTS/PTE preparation and bank balance auditing to visa filing, pre-departure briefings, and airport pickup coordinates.",
    },
  ];

  return (
    <section id="why-choose" className="section-y bg-white border-t border-ink-200 relative">
      <div className="shell">
        <SectionHeading
          eyebrow="The difference"
          title="Why applicants choose VisaEnsure"
          description="A dedicated case manager, transparent flat pricing, and a pre-submission audit on every file — the things that actually move approval rates."
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {points.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card card-hover p-7 group"
            >
              {/* Icon wrapper */}
              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-100 group-hover:border-orange-200 transition-colors duration-300">
                {pt.icon}
              </div>

              <h3 className="mt-5 text-lg font-heading text-ink-900 font-bold group-hover:text-orange-700 transition-colors">
                {pt.title}
              </h3>
              <p className="mt-2.5 text-ink-600 text-sm leading-relaxed font-body">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
