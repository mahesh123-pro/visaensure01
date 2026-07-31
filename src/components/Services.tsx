"use client";

import React from "react";
import { GraduationCap, Briefcase, Globe2, Plane, Landmark, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

interface ServicesProps {
  onOpenAssessment: () => void;
  onOpenChecklist: () => void;
}

export default function Services({ onOpenAssessment, onOpenChecklist }: ServicesProps) {
  const services = [
    {
      icon: <GraduationCap className="w-8 h-8 text-orange-600" />,
      title: "Student Visa",
      desc: "Apply to prestigious universities globally. Complete guidance on admissions, I-20, CAS, financial proof audits, and consular interviews.",
      linkId: "student-visa",
      image: "/images/services_student.png",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-orange-600" />,
      title: "Work Visa",
      desc: "Secure Skilled Worker permits, H-1B filings, and opportunity cards. Build a long-term international career with certified sponsorship reviews.",
      linkId: "work-visa",
      image: "/images/services_work.png",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-orange-600" />,
      title: "PR & Migration",
      desc: "Permanent residency pathways through Canada Express Entry/PNP draw and Australia General Skilled Migration (Subclass 189/190).",
      linkId: "migration-visa",
      image: "/images/services_pr.png",
    },
    {
      icon: <Plane className="w-8 h-8 text-orange-600" />,
      title: "Tourist Visa",
      desc: "Leisure, business meetings, and family visits. Detailed customized itineraries, dummy bookings, and strong tie evaluation audits.",
      linkId: "tourist-visa",
      image: "/images/services_tourist.png",
    },
    {
      icon: <Landmark className="w-8 h-8 text-orange-600" />,
      title: "Business Visa",
      desc: "Investor streams, startup pathways, and trade permits. Comprehensive commercial audits for entrepreneurs seeking corporate expansions.",
      linkId: "business-visa",
      image: "/images/services_business.png",
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Dependent Visa",
      desc: "Bring your family abroad. Secure spousal open work permits and child study permissions alongside your primary visa.",
      linkId: "dependent-visa",
      image: "/images/services_dependent.png",
    },
  ];

  return (
    <section id="services" className="section-y bg-transparent relative">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title="Global visa & migration services"
          description="Six specialised practices, each run by consultants who handle that route every day — with pre-submission audits that catch problems before a case officer does."
        />

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="card-interactive flex flex-col group overflow-hidden"
            >
              {/* Image Banner wrapped in Link */}
              {srv.image ? (
                <Link
                  href={`/services/${srv.linkId}`}
                  className="block w-full aspect-[4/3] overflow-hidden relative border-b border-ink-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-ink-900/10 to-transparent" />
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-orange-800 shadow-sm">
                    Verified Route
                  </div>
                  <div className="absolute bottom-3.5 left-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-e2 group-hover:scale-110 transition-transform duration-300">
                    {React.cloneElement(srv.icon as React.ReactElement<any>, {
                      className: "w-5 h-5 text-orange-600",
                    })}
                  </div>
                </Link>
              ) : (
                <div className="w-12 h-12 m-6 mb-0 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center">
                  {srv.icon}
                </div>
              )}

              <div className="flex flex-col flex-1 p-6">
                <Link href={`/services/${srv.linkId}`}>
                  <h3 className="text-lg font-heading text-ink-900 font-bold group-hover:text-orange-600 transition-colors flex items-center justify-between">
                    <span>{srv.title}</span>
                    <ArrowRight className="w-4 h-4 text-orange-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                </Link>
                <p className="mt-2.5 text-ink-600 text-sm leading-relaxed font-body">
                  {srv.desc}
                </p>

                {/* Action Links */}
                <div className="mt-6 pt-4 border-t border-ink-200/80 flex items-center justify-between text-sm font-semibold">
                  <button
                    onClick={onOpenAssessment}
                    className="text-ink-600 hover:text-orange-700 transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold"
                  >
                    Check eligibility
                  </button>
                  <Link
                    href={`/services/${srv.linkId}`}
                    className="text-orange-700 flex items-center gap-1 hover:gap-1.5 transition-all cursor-pointer font-bold text-xs uppercase tracking-wider"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
