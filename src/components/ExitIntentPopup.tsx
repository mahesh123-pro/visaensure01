"use client";

import React, { useState, useEffect } from "react";
import { X, MessageCircle, CheckCircle2, Shield, Sparkles, Clock, ArrowRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_URL } from "@/data/contact";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastClosedTime, setLastClosedTime] = useState<number | null>(null);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("visaensure_popup_submitted");
    if (isOpen || hasSubmitted) return;

    // Initial popup after 10 minutes (600,000ms), recurring popup every 10 minutes (600,000ms)
    const delay = lastClosedTime === null ? 600000 : 600000;

    const timer = setTimeout(() => {
      const currentlySubmitted = localStorage.getItem("visaensure_popup_submitted");
      if (!currentlySubmitted) {
        setIsOpen(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen, lastClosedTime]);

  const handleClose = () => {
    setIsOpen(false);
    setLastClosedTime(Date.now());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    localStorage.setItem("visaensure_popup_submitted", "true");
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={handleClose}
        />

        {/* Main Luxury Split Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-2xl bg-white border border-ink-200/80 rounded-3xl shadow-[0_25px_60px_-15px_rgba(255,107,0,0.25)] overflow-hidden z-10 grid grid-cols-1 md:grid-cols-12"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-ink-100/80 hover:bg-orange-50 text-ink-600 hover:text-orange-600 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Dark Luxury Brand Banner */}
          <div className="md:col-span-5 bg-gradient-to-br from-ink-900 via-black to-ink-900 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden text-white">
            {/* Ambient Orange Glow Blooms */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-orange-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                VIP Fast-Track
              </div>

              <h4 className="text-xl md:text-2xl font-heading font-extrabold text-white leading-tight">
                Get Your Visa Approved with <span className="text-orange-400">98.6%</span> Success Rate
              </h4>
            </div>

            <div className="relative z-10 mt-6 space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <Shield className="w-4 h-4 text-orange-400 shrink-0" />
                <span>100% Confidential & Secure</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Free 15-Min Direct Evaluation</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-amber-400 font-medium pt-1">
                <div className="flex -space-x-1 mr-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>4.9/5 from 1,200+ clients</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Conversion Form */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center bg-white">
            {!isSubmitted ? (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Visa Experts Available
                  </div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-ink-900">
                    Claim Your Free Consultation
                  </h3>
                  <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                    Speak directly with an accredited visa consultant. No obligation required.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-ink-50/50 border border-ink-200 rounded-xl px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15 transition-all font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-ink-50/50 border border-ink-200 rounded-xl px-3.5 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15 transition-all font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-primary py-3 rounded-xl shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span className="font-bold text-sm">Book Free Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="relative flex items-center justify-center my-1">
                  <div className="border-t border-ink-200/60 w-full" />
                  <span className="bg-white px-2 text-[10px] uppercase font-bold text-ink-400 shrink-0">OR</span>
                  <div className="border-t border-ink-200/60 w-full" />
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat Instantly on WhatsApp</span>
                </a>
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-ink-900">
                  You&apos;re All Set, {name}!
                </h3>
                <p className="text-xs text-ink-600 leading-relaxed max-w-xs mx-auto">
                  Our senior visa consultant will call or WhatsApp you at <strong className="text-ink-900">{phone}</strong> shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="btn btn-secondary px-6 py-2 text-xs rounded-xl"
                >
                  Close & Continue
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
