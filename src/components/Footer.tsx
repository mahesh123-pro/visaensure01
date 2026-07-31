"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Send, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-premium-dark pt-24 pb-12 text-sm text-white/60 font-body relative overflow-hidden border-t border-white/[0.06]">
      
      {/* Subtle Airplane Trail Animation */}
      <div className="absolute right-[-100px] top-[12%] opacity-15 pointer-events-none select-none">
        <svg
          width="400"
          height="120"
          viewBox="0 0 400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-orange-500/40"
        >
          <path
            d="M10 80 Q 150 10, 300 90 T 390 20"
            strokeWidth="1.5"
            strokeDasharray="6,6"
            className="path-anim"
          />
          {/* Animated plane node */}
          <circle r="4.5" fill="#FF6B00">
            <animateMotion dur="12s" repeatCount="indefinite" path="M10 80 Q 150 10, 300 90 T 390 20" />
          </circle>
        </svg>
      </div>

      <div className="shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 relative z-10">
        
        {/* Brand: Column span 4 */}
        <div className="lg:col-span-4 space-y-6">
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, "#hero")}
            className="inline-flex items-center gap-3.5 group px-5 py-3.5 rounded-2xl bg-white shadow-[0_0_15px_rgba(255,107,0,0.15)] hover:shadow-[0_0_25px_rgba(255,107,0,0.3)] transition-all duration-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/visaensureLogoForWebsite/12.png"
              alt="VisaEnsure Globe Logo"
              className="h-[3.25rem] w-auto shrink-0 object-contain group-hover:scale-105 transition-transform duration-500"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/visaensureLogoForWebsite/visaensure001.png"
              alt="VisaEnsure Text Logo"
              className="h-[2.35rem] w-auto shrink-0 object-contain"
            />
          </a>

          {/* Contact Details with custom styles */}
          <div className="space-y-3.5 text-[13px] text-white/60">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">Flat no 402, 4th floor, Avasa&apos;s VPR Komitla Residency, Chintalkunta, Hyderabad, Telangana 500074</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <a href="mailto:apply@visaensure.com" className="hover:text-orange-400 transition-colors font-medium">apply@visaensure.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Mon to Sat — 9:00 AM to 8:00 PM</span>
            </div>
          </div>
          
          {/* Enhanced Social Links */}
          <div className="flex items-center gap-3 pt-2">
            {[
              { href: "https://facebook.com/visaensure", label: "Facebook", svgPath: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/> },
              { href: "https://instagram.com/visaensure", label: "Instagram", svgPath: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></> },
              { href: "https://linkedin.com/company/visaensure", label: "LinkedIn", svgPath: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></> },
              { href: "https://x.com/visaensure", label: "Twitter", svgPath: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/> }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-orange-600 hover:border-orange-600 hover:shadow-[0_0_12px_rgba(255,107,0,0.45)] transition-all duration-300"
                aria-label={social.label}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {social.svgPath}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Services: Column span 2 */}
        <div className="lg:col-span-2 space-y-5 lg:pl-4">
          <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.18em] relative inline-block pb-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-6 after:h-[2px] after:bg-orange-500">
            Services
          </h4>
          <ul className="space-y-3 text-[13.5px] text-white/60">
            {[
              { href: "/services/student-visa", text: "Student Visa" },
              { href: "/services/work-visa", text: "Work Visas" },
              { href: "/services/migration-visa", text: "PR & Migration" },
              { href: "/services/tourist-visa", text: "Tourist Visas" },
              { href: "/services/ielts-coaching", text: "IELTS/PTE Coaching" }
            ].map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} className="hover:text-orange-400 hover:translate-x-1 flex items-center transition-all duration-300">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Destinations: Column span 2 */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.18em] relative inline-block pb-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-6 after:h-[2px] after:bg-orange-500">
            Destinations
          </h4>
          <ul className="space-y-3 text-[13.5px] text-white/60">
            {[
              { href: "/destinations/usa", text: "United States" },
              { href: "/destinations/canada", text: "Canada" },
              { href: "/destinations/uk", text: "United Kingdom" },
              { href: "/destinations/australia", text: "Australia" },
              { href: "/destinations/europe", text: "Europe" }
            ].map((item, idx) => (
              <li key={idx}>
                <Link href={item.href} className="hover:text-orange-400 hover:translate-x-1 flex items-center transition-all duration-300">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company: Column span 2 */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.18em] relative inline-block pb-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-6 after:h-[2px] after:bg-orange-500">
            Company
          </h4>
          <ul className="space-y-3 text-[13.5px] text-white/60">
            {[
              { href: "#success-stories", text: "Success Stories", isScroll: true },
              { href: "#blog", text: "Blog", isScroll: true }
            ].map((item, idx) => (
              <li key={idx}>
                {item.isScroll ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="hover:text-orange-400 hover:translate-x-1 flex items-center transition-all duration-300 cursor-pointer"
                  >
                    {item.text}
                  </a>
                ) : (
                  <Link href={item.href} className="hover:text-orange-400 hover:translate-x-1 flex items-center transition-all duration-300">
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter: Column span 2 */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.18em] relative inline-block pb-1.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-6 after:h-[2px] after:bg-orange-500">
            Newsletter
          </h4>
          <p className="text-[12.5px] leading-relaxed text-white/65">
            Get weekly updates on current PR scores, visa rules, and processing lists.
          </p>
          {subscribed ? (
            <p className="text-xs text-orange-400 font-semibold min-h-[40px] flex items-center">
              Joined successfully!
            </p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex gap-2 min-h-[40px]">
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 min-w-0 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-[12.5px] text-white focus:outline-none focus:border-orange-500 placeholder-white/35 focus:ring-1 focus:ring-orange-500/20"
              />
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white px-3 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Animated Divider Line with glowing light streak */}
      <div className="shell w-full">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent relative my-8 overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
          />
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="shell flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 relative z-10">
        <div>
          &copy; {currentYear} VisaEnsure Platform. All rights reserved. Registered Office Hyderabad, India.
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition-colors">Disclaimers</a>
        </div>
      </div>

      {/* Soft orange base glow at the bottom center of the footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-orange-600/[0.08] rounded-full blur-[120px] pointer-events-none" />


      
    </footer>
  );
}
