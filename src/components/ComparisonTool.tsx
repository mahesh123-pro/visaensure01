"use client";

import React, { useState } from "react";
import { Scale, Check, HelpCircle, ArrowRight } from "lucide-react";

interface CountryDetail {
  name: string;
  code: string;
  prEase: string;
  processingTime: string;
  livingCost: string;
  postStudyWork: string;
  topIndustries: string[];
  avgSalary: string;
  visaRoutes: string[];
}

const countriesData: Record<string, CountryDetail> = {
  USA: {
    name: "United States",
    code: "US",
    prEase: "Moderate to Difficult (EB-2/EB-3 cap limits)",
    processingTime: "Student: 5-6 Mos | Tourist: 5-6 Mos | Work: 6-12 Mos",
    livingCost: "High ($1,500 - $2,500/mo)",
    postStudyWork: "12-36 Months (OPT / STEM extension)",
    topIndustries: ["Technology", "Finance", "Healthcare", "Engineering"],
    avgSalary: "$75,000 - $110,000/yr",
    visaRoutes: ["F-1 Student", "H-1B Specialty", "L-1 Intracompany Transfer"],
  },
  Canada: {
    name: "Canada",
    code: "CA",
    prEase: "Very Easy (Express Entry / PNP Points Framework)",
    processingTime: "Student: 6-8 Mos | Tourist: 3-4 Mos | PR: 8-12 Mos",
    livingCost: "Medium-High ($1,200 - $1,800/mo)",
    postStudyWork: "Up to 3 Years (PGWP)",
    topIndustries: ["Software Dev", "Engineering", "Nursing", "Finance"],
    avgSalary: "$60,000 - $85,000/yr",
    visaRoutes: ["Express Entry PR", "Provincial Nominee Program (PNP)", "Study Permit"],
  },
  UK: {
    name: "United Kingdom",
    code: "GB",
    prEase: "Moderate (Skilled Worker route leads to ILR after 5 yrs)",
    processingTime: "Student: 3-6 Mos | Tourist: 15-20 Days | Work: 3-6 Mos",
    livingCost: "High (£1,100 - £1,800/mo)",
    postStudyWork: "2 Years (Graduate Visa route)",
    topIndustries: ["Finance", "Technology", "Healthcare (NHS)", "Business Admin"],
    avgSalary: "£45,000 - £70,000/yr",
    visaRoutes: ["Skilled Worker Visa", "Graduate Visa (PSW)", "Student Visa"],
  },
  Australia: {
    name: "Australia",
    code: "AU",
    prEase: "Easy (General Skilled Migration - Subclass 189/190)",
    processingTime: "Student: 4-6 Mos | Tourist: 3-4 Mos | Work: 3-4 Mos | PR: 6-12 Mos",
    livingCost: "High ($1,400 - $2,200/mo)",
    postStudyWork: "2-4 Years (Subclass 485 Temporary Graduate)",
    topIndustries: ["Mining", "Healthcare", "Engineering", "IT Services"],
    avgSalary: "$70,000 - $95,000/yr",
    visaRoutes: ["Subclass 189 Skilled Independent", "Subclass 190 Skilled Nominated", "Student Visa"],
  },
  Europe: {
    name: "Europe",
    code: "DE",
    prEase: "Easy (Opportunity Card + Blue Card fast-track)",
    processingTime: "Student: 4-6 Mos | Tourist: 15-20 Days | Work: 3-6 Mos",
    livingCost: "Medium (€900 - €1,300/mo)",
    postStudyWork: "18 Months (Job Seeker allowance)",
    topIndustries: ["Automotive", "Engineering", "IT", "Renewable Energy"],
    avgSalary: "€50,000 - €75,000/yr",
    visaRoutes: ["Opportunity Card (Chancenkarte)", "EU Blue Card", "Student Visa"],
  },
};

export default function ComparisonTool() {
  const [countryA, setCountryA] = useState("USA");
  const [countryB, setCountryB] = useState("Canada");

  const detailA = countriesData[countryA];
  const detailB = countriesData[countryB];

  return (
    <div className="w-full card p-7">
      <div className="flex items-center gap-2 mb-6">
        <Scale className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-heading text-ink-900 font-bold">
          Country Pathway Comparison
        </h3>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 mb-2">
            Compare Country A
          </label>
          <select
            value={countryA}
            onChange={(e) => setCountryA(e.target.value)}
            className="w-full bg-white border border-ink-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 transition-all"
          >
            {Object.keys(countriesData)
              .filter((c) => c !== countryB)
              .map((c) => (
                <option key={c} value={c} className="bg-white">
                  {countriesData[c].name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-500 mb-2">
            Compare Country B
          </label>
          <select
            value={countryB}
            onChange={(e) => setCountryB(e.target.value)}
            className="w-full bg-white border border-ink-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/15 transition-all"
          >
            {Object.keys(countriesData)
              .filter((c) => c !== countryA)
              .map((c) => (
                <option key={c} value={c} className="bg-white">
                  {countriesData[c].name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Side-by-side Table */}
      <div className="space-y-4 text-xs">
        {/* Processing Time */}
        <div className="grid grid-cols-5 border-b border-ink-200 pb-3 items-center">
          <div className="col-span-1 text-ink-500 font-semibold uppercase text-[11px] tracking-wide">
            Processing Speed
          </div>
          <div className="col-span-2 text-black font-medium pl-2">{detailA.processingTime}</div>
          <div className="col-span-2 text-black font-medium pl-2">{detailB.processingTime}</div>
        </div>

        {/* PR Ease */}
        <div className="grid grid-cols-5 border-b border-ink-200 pb-3 items-center">
          <div className="col-span-1 text-ink-500 font-semibold uppercase text-[11px] tracking-wide">
            PR Pathway Ease
          </div>
          <div className="col-span-2 text-orange-700 font-medium pl-2">{detailA.prEase}</div>
          <div className="col-span-2 text-orange-700 font-medium pl-2">{detailB.prEase}</div>
        </div>

        {/* Post-Study Work */}
        <div className="grid grid-cols-5 border-b border-ink-200 pb-3 items-center">
          <div className="col-span-1 text-ink-500 font-semibold uppercase text-[11px] tracking-wide">
            Post-Study Work
          </div>
          <div className="col-span-2 text-black font-medium pl-2">{detailA.postStudyWork}</div>
          <div className="col-span-2 text-black font-medium pl-2">{detailB.postStudyWork}</div>
        </div>

        {/* Living Cost */}
        <div className="grid grid-cols-5 border-b border-ink-200 pb-3 items-center">
          <div className="col-span-1 text-ink-500 font-semibold uppercase text-[11px] tracking-wide">
            Est. Living Cost
          </div>
          <div className="col-span-2 text-black font-medium pl-2">{detailA.livingCost}</div>
          <div className="col-span-2 text-black font-medium pl-2">{detailB.livingCost}</div>
        </div>

        {/* Avg. Salary */}
        <div className="grid grid-cols-5 border-b border-ink-200 pb-3 items-center">
          <div className="col-span-1 text-ink-500 font-semibold uppercase text-[11px] tracking-wide">
            Average Salary
          </div>
          <div className="col-span-2 text-ink-900 font-semibold pl-2">{detailA.avgSalary}</div>
          <div className="col-span-2 text-ink-900 font-semibold pl-2">{detailB.avgSalary}</div>
        </div>

        {/* Top Industries */}
        <div className="grid grid-cols-5 border-b border-ink-200 pb-3 items-center">
          <div className="col-span-1 text-ink-500 font-semibold uppercase text-[11px] tracking-wide">
            Hot Job Markets
          </div>
          <div className="col-span-2 pl-2">
            <div className="flex flex-wrap gap-1">
              {detailA.topIndustries.map((ind) => (
                <span
                  key={ind}
                  className="bg-ink-50 border border-ink-200 px-2 py-0.5 rounded text-[11px] text-ink-800"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-2 pl-2">
            <div className="flex flex-wrap gap-1">
              {detailB.topIndustries.map((ind) => (
                <span
                  key={ind}
                  className="bg-ink-50 border border-ink-200 px-2 py-0.5 rounded text-[11px] text-ink-800"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Visa Routes */}
        <div className="grid grid-cols-5 pb-1 items-center">
          <div className="col-span-1 text-ink-500 font-semibold uppercase text-[11px] tracking-wide">
            Visa Channels
          </div>
          <div className="col-span-2 pl-2 space-y-1">
            {detailA.visaRoutes.map((route) => (
              <div key={route} className="flex items-center gap-1 text-black">
                <Check className="w-3 h-3 text-orange-600 shrink-0" />
                <span>{route}</span>
              </div>
            ))}
          </div>
          <div className="col-span-2 pl-2 space-y-1">
            {detailB.visaRoutes.map((route) => (
              <div key={route} className="flex items-center gap-1 text-black">
                <Check className="w-3 h-3 text-orange-600 shrink-0" />
                <span>{route}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-ink-200 text-center">
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 text-xs text-orange-700 hover:text-black font-bold transition-all"
        >
          <span>Request Detailed Comparison Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
