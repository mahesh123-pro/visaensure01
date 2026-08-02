"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    visaType: "Student Visa",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Invalid phone number";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="section-y bg-transparent border-t border-ink-200 relative">
      <div className="shell">
        <SectionHeading
          eyebrow="Get in touch"
          title="Schedule a private consultation"
          description="Contact our Hyderabad office or send the form — a senior counsellor responds within 15 minutes during business hours."
        />

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Form: Column span 7 */}
          <div className="lg:col-span-7 card p-6 md:p-9">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-ink-800 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                      className={`field ${errors.name ? '!border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-ink-800 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`field ${errors.email ? '!border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-ink-800 mb-2">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                      className={`field ${errors.phone ? '!border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-ink-800 mb-2">
                      Visa Type
                    </label>
                    <select
                      value={formData.visaType}
                      onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                      className="field"
                    >
                      <option value="Student Visa">Student Visa</option>
                      <option value="Work Visa">Work Visa</option>
                      <option value="PR & Migration">PR & Migration</option>
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Business Visa">Business Visa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-ink-800 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements..."
                    rows={4}
                    className="field"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary w-full ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing…</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit inquiry</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-14 text-center">
                <div className="w-16 h-16 status-success rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="mt-5 text-xl font-heading text-ink-900 font-bold">
                  Inquiry received
                </h4>
                <p className="mt-3 text-sm text-ink-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-ink-900">{formData.name}</strong>. A
                  case specialist has your enquiry for{" "}
                  <strong className="text-ink-900">{formData.visaType}</strong> and will
                  call within 15 minutes.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary mt-7"
                >
                  Submit another inquiry
                </button>
              </div>
            )}
          </div>

          {/* Details: Column span 5 */}
          <div className="lg:col-span-5 card p-6 md:p-9 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-heading text-ink-900 font-bold">
                Contact coordinates
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-ink-900">
                    Flat no 402, 4th floor, Avasa's VPR Komitla Residency, Sri Sai Nagar, Jahangir Nagar Colony, Chintalkunta, Hyderabad, Telangana 500074
                  </span>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <a href="mailto:apply@visaensure.com" className="text-ink-900 hover:text-orange-700 transition-colors">
                    apply@visaensure.com
                  </a>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <a href="tel:+919642442227" className="block text-ink-900 hover:text-orange-700 transition-colors">
                      +91 9642442227
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <span className="text-ink-900">
                    Monday to Saturday — 9:00 AM to 8:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Simple Visual Map Placeholder */}
            <div className="relative h-32 rounded-xl overflow-hidden border border-ink-200 bg-white flex items-center justify-center text-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.16)_0%,transparent_75%)]" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] tracking-wider text-orange-700 uppercase font-bold">MAP DIRECTIONS</span>
                <p className="text-[11px] text-ink-500">Sri Sai Nagar, Jahangir Nagar Colony, Chintalkunta</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-ink-900 underline hover:text-orange-700 block mt-1"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
