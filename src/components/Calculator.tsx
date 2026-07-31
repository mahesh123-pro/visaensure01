"use client";

import React, { useState } from "react";
import { Clock, HelpCircle, AlertCircle, Coins } from "lucide-react";

interface CalcData {
  time: string;
  fees: string;
  window: string;
  fastTrack: string;
}

const calculatorData: Record<string, Record<string, CalcData>> = {
  USA: {
    Student: {
      time: "5 to 6 Months",
      fees: "$185 USD (Visa Fee) + $350 USD (SEVIS Fee)",
      window: "Apply 2-3 months prior to program start date",
      fastTrack: "Not available for F-1. Consular slot expedite available on emergency medical/academic grounds.",
    },
    Worker: {
      time: "6 to 12 Months",
      fees: "$190 USD (Filing Fee) + $460-$2,500+ (Employer Petitions)",
      window: "Apply 6 months prior to employment start date (usually H-1B lottery is in March)",
      fastTrack: "Elite Processing available ($2,805 USD for 15-day USCIS adjudication)",
    },
    PR: {
      time: "12 to 18 Months (EB-2 / EB-3 routes)",
      fees: "$700 USD (I-140 filing) + $1,225 USD (Adjustment of Status)",
      window: "File as soon as employer obtains PERM Labor Certification approval",
      fastTrack: "Elite processing available for certain EB-2/EB-3 I-140 petitions ($2,805 USD)",
    },
    Tourist: {
      time: "5 to 6 Months",
      fees: "$185 USD",
      window: "Apply 3-4 months prior to intended travel (interview wait times vary significantly)",
      fastTrack: "Not available. Standard queue scheduling applies.",
    },
  },
  Canada: {
    Student: {
      time: "6 to 8 Months",
      fees: "$150 CAD (Study Permit) + $85 CAD (Biometrics)",
      window: "Apply immediately upon receiving Letter of Acceptance (LOA)",
      fastTrack: "Student Direct Stream (SDS) provides 20-day processing for eligible countries (requires GIC and paid 1st-yr tuition)",
    },
    Worker: {
      time: "2 to 3 Months",
      fees: "$155 CAD (Work Permit) + $85 CAD (Biometrics)",
      window: "Apply within 3 months of getting LMIA or job offer",
      fastTrack: "Global Skills Strategy (GSS) offers 2-week processing for highly skilled positions",
    },
    PR: {
      time: "8 to 12 Months",
      fees: "$1,525 CAD (Application fee + Right of Permanent Residence Fee per adult)",
      window: "Submit complete PR package within 60 days of receiving Invitation to Apply (ITA)",
      fastTrack: "Provincial Nominee Program (PNP) express streams matching Express Entry processing speeds",
    },
    Tourist: {
      time: "3 to 4 Months",
      fees: "$100 CAD (Visitor Visa) + $85 CAD (Biometrics)",
      window: "Apply 2 months prior to intended departure date",
      fastTrack: "Not available. Applications processed sequentially.",
    },
  },
  UK: {
    Student: {
      time: "3 to 6 Months",
      fees: "£490 GBP (Visa) + £776 GBP per year (Immigration Health Surcharge)",
      window: "Apply up to 6 months before your course starts",
      fastTrack: "Priority Service (£500 for 5-day decision) or Super Priority (£1,000 for next-day decision)",
    },
    Worker: {
      time: "3 to 6 Months",
      fees: "£719 - £1,500 GBP (CoS & Application) + £1,035 GBP per year (IHS Health Surcharge)",
      window: "Apply up to 3 months before your Certificate of Sponsorship (CoS) start date",
      fastTrack: "Priority Service (£500 for 5-day decision) or Super Priority (£1,000 for next-day decision)",
    },
    PR: {
      time: "6 to 12 Months (ILR - Indefinite Leave to Remain)",
      fees: "£2,885 GBP (ILR Application Fee)",
      window: "Apply 28 days before completing the 5-year continuous residence requirement",
      fastTrack: "Super Priority Service (£1,000 for next-working-day decision) is available at select locations",
    },
    Tourist: {
      time: "15 to 20 Days",
      fees: "£115 GBP (Standard 6-month visitor visa)",
      window: "Apply up to 3 months prior to travel dates",
      fastTrack: "Priority Visa Service (£500 for 5-day decision)",
    },
  },
};

export default function Calculator() {
  const [country, setCountry] = useState("USA");
  const [category, setCategory] = useState("Student");

  const normalizedCountry = calculatorData[country] ? country : "USA";
  const normalizedCategory = calculatorData[normalizedCountry][category] ? category : "Student";
  const result = calculatorData[normalizedCountry][normalizedCategory];

  return (
    <div className="w-full card p-7">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-heading text-ink-900 font-bold">
          Processing Time & Fee Calculator
        </h3>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 mb-2">
            Destination Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-white border border-ink-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 transition-all"
          >
            <option value="USA">United States</option>
            <option value="Canada">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 mb-2">
            Visa Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-ink-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 transition-all"
          >
            <option value="Student">Student Visa</option>
            <option value="Worker">Work Visa / Permit</option>
            <option value="PR">PR / Skilled Migration</option>
            <option value="Tourist">Tourist / Visitor Visa</option>
          </select>
        </div>
      </div>

      {/* Results Display */}
      <div className="space-y-4">
        <div className="p-4 bg-ink-50 border border-ink-200 rounded-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500">
              Est. Processing Time
            </span>
            <h4 className="text-lg font-bold font-heading text-orange-700">{result.time}</h4>
          </div>
          <Clock className="w-8 h-8 text-orange-600/30" />
        </div>

        <div className="p-4 bg-ink-50 border border-ink-200 rounded-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500">
              Government Fees (Est.)
            </span>
            <h4 className="text-sm font-semibold text-black leading-relaxed">{result.fees}</h4>
          </div>
          <Coins className="w-8 h-8 text-orange-600/30" />
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-black block font-medium">Recommended Filing Window</strong>
              <span className="text-ink-900">{result.window}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-2 border-t border-ink-200">
            <HelpCircle className="w-4 h-4 text-ink-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-black block font-medium">Fast-Track Channels</strong>
              <span className="text-ink-900">{result.fastTrack}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
