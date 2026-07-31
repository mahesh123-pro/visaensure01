"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ZoomIn, ZoomOut, Maximize2, Compass, CheckCircle2, 
  MapPin, GraduationCap, Briefcase, Landmark, ChevronRight, 
  AlertCircle, ArrowRight, DollarSign, Calendar, LandmarkIcon
} from "lucide-react";
import Link from "next/link";
import worldGeoJson from "@/data/world-countries.json";

// Define TypeScript interfaces
export interface University {
  name: string;
  ranking: string;
  location: string;
}

export interface JobRole {
  role: string;
  salary: string;
  demand: string;
}

export interface MigrationPathway {
  name: string;
  type: string;
  duration: string;
  desc: string;
}

export interface CountryVisaDetails {
  name: string;
  code: string; // ISO 2-letter code
  headline: string;
  desc: string;
  stats: { label: string; value: string }[];
  accentColor: string;
  universities?: University[];
  jobs?: JobRole[];
  pathways?: MigrationPathway[];
  link: string;
}

interface InteractivePlaneWorldMapProps {
  visaType: "student" | "work" | "migration";
}

// Region viewbox settings
const REGION_VIEWBOXES = {
  world: { x: 0, y: 0, w: 1000, h: 500 },
  northAmerica: { x: 50, y: 15, w: 320, h: 220 },
  europe: { x: 440, y: 30, w: 180, h: 140 },
  asiaPacific: { x: 550, y: 60, w: 410, h: 320 },
};

// Target countries configuration for each visa type
const HIGHLIGHTED_COUNTRIES: Record<"student" | "work" | "migration", string[]> = {
  student: ["United States of America", "Canada", "United Kingdom", "Australia", "Europe"],
  work: ["United States of America", "Canada", "United Kingdom", "Australia", "Europe"],
  migration: ["Canada", "Australia", "United Kingdom", "New Zealand", "Europe"],
};

export default function InteractivePlaneWorldMap({ visaType }: InteractivePlaneWorldMapProps) {
  const [activeRegion, setActiveRegion] = useState<keyof typeof REGION_VIEWBOXES>("world");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "benefits">("overview");

  // Load target countries
  const targetCountries = useMemo(() => HIGHLIGHTED_COUNTRIES[visaType], [visaType]);

  // Country Visa details data
  const countriesDetailsData: Record<string, CountryVisaDetails> = useMemo(() => ({
    "United States of America": {
      name: "United States of America",
      code: "US",
      accentColor: "#3B82F6", // Blue
      headline: visaType === "student" ? "World-Class Academic Powerhouse" : "Innovative Tech & Global Enterprise Hub",
      desc: visaType === "student" 
        ? "The premier global destination for higher education, offering top-ranking Ivy League universities, cutting-edge research facilities, and generous STEM OPT extension opportunities."
        : "Home to the world's largest companies in tech, finance, and biotech. Offers competitive salaries and highly prestigious visa routes like H-1B, L-1, and O-1 for exceptional talents.",
      stats: visaType === "student"
        ? [
            { label: "Visa Success Rate", value: "98.4%" },
            { label: "Avg. Processing", value: "15-30 Days" },
            { label: "Post-Study Work", value: "1-3 Years OPT" }
          ]
        : [
            { label: "Average Salary", value: "$95,000/yr" },
            { label: "Job Growth", value: "+8.5% YoY" },
            { label: "H-1B Cap Approvals", value: "94.8%" }
          ],
      universities: [
        { name: "Massachusetts Institute of Technology (MIT)", ranking: "#1 Globally", location: "Cambridge, MA" },
        { name: "Stanford University", ranking: "#3 Globally", location: "Stanford, CA" },
        { name: "Harvard University", ranking: "#4 Globally", location: "Cambridge, MA" },
        { name: "University of California, Berkeley", ranking: "#10 Globally", location: "Berkeley, CA" }
      ],
      jobs: [
        { role: "Software Engineer / AI Architect", salary: "$125,000 - $190,000", demand: "Critical" },
        { role: "Data Scientist & Analytics Lead", salary: "$115,000 - $175,000", demand: "High" },
        { role: "Product Manager (Tech/Bio)", salary: "$110,000 - $160,000", demand: "High" }
      ],
      link: visaType === "student" ? "/services/usa-student-visa" : "/services/h1b-visa"
    },
    "Canada": {
      name: "Canada",
      code: "CA",
      accentColor: "#EF4444", // Red
      headline: visaType === "migration" 
        ? "Express Entry & Provincial Nomination Programs (PNP)" 
        : visaType === "student" 
          ? "Welcoming & Straightforward PR Pathways" 
          : "Robust Work Rights & Spousal Open Permits",
      desc: visaType === "migration"
        ? "The gold standard of skilled migration. Points are awarded based on age, education, language, and experience, leading to permanent residency with access to universal healthcare and free public education."
        : visaType === "student"
          ? "Renowned for its high quality of life, friendly student cities, and clear paths from graduation to permanent residency via the Post-Graduation Work Permit (PGWP)."
          : "Offering strong employee protections and high employment rates. Skilled work experience gained here accelerates eligibility for Express Entry permanent residence.",
      stats: visaType === "migration"
        ? [
            { label: "Express Entry Target", value: "110k+/yr" },
            { label: "Avg. Processing", value: "6 Months" },
            { label: "Citizenship Path", value: "3 Years" }
          ]
        : visaType === "student"
          ? [
              { label: "Visa Success Rate", value: "96.2%" },
              { label: "Avg. Processing", value: "6-8 Weeks" },
              { label: "Work Rights", value: "Up to 3 Years" }
            ]
          : [
              { label: "Average Salary", value: "$72,000 CAD/yr" },
              { label: "LMIA Approval", value: "91%" },
              { label: "Standard Workweek", value: "37.5 - 40 hrs" }
            ],
      universities: [
        { name: "University of Toronto", ranking: "#21 Globally", location: "Toronto, ON" },
        { name: "University of British Columbia (UBC)", ranking: "#34 Globally", location: "Vancouver, BC" },
        { name: "McGill University", ranking: "#30 Globally", location: "Montreal, QC" },
        { name: "University of Waterloo", ranking: "#112 Globally", location: "Waterloo, ON" }
      ],
      jobs: [
        { role: "IT Solutions / Cloud Architect", salary: "$80,000 - $115,000 CAD", demand: "High" },
        { role: "Construction Project Manager", salary: "$85,000 - $120,000 CAD", demand: "Critical" },
        { role: "Mechanical / Civil Engineer", salary: "$75,000 - $105,000 CAD", demand: "High" }
      ],
      pathways: [
        { name: "Federal Skilled Worker (FSW)", type: "Points-based PR", duration: "6 Months", desc: "For skilled professionals residing outside Canada with strong language and education credentials." },
        { name: "Canadian Experience Class (CEC)", type: "In-Country PR", duration: "4 Months", desc: "Fast-track PR for skilled workers or graduates with at least 1 year of Canadian experience." },
        { name: "Provincial Nominee Program (PNP)", type: "State Sponsored", duration: "6-12 Months", desc: "Provinces nominate applicants matching local economic gaps, adding 600 CRS points." }
      ],
      link: "/services/canada-pr"
    },
    "United Kingdom": {
      name: "United Kingdom",
      code: "GB",
      accentColor: "#8B5CF6", // Purple
      headline: visaType === "migration"
        ? "Global Talent & Settled Status (ILR) Route"
        : visaType === "student"
          ? "Accelerated Degree Pipelines & Heritage"
          : "Skilled Worker Route & Financial Hubs",
      desc: visaType === "migration"
        ? "Secure permanent settlement via Indefinite Leave to Remain (ILR) after 5 years of skilled work, or enter directly under the prestigious Global Talent program without needing sponsor employer restrictions."
        : visaType === "student"
          ? "Featuring top historical universities, shorter course durations (1-year Masters, 3-year Bachelors), and the new 2-year Graduate Route for post-study employment."
          : "Relocate quickly under the Skilled Worker Visa program with a Certificate of Sponsorship (CoS). It offers a direct pathway to settlement and citizenship.",
      stats: visaType === "migration"
        ? [
            { label: "Settle Time (ILR)", value: "5 Years (Skilled)" },
            { label: "Global Talent ILR", value: "3 Years" },
            { label: "Citizenship Delay", value: "1 Year after ILR" }
          ]
        : visaType === "student"
          ? [
              { label: "Visa Success Rate", value: "97.1%" },
              { label: "Avg. Processing", value: "3 Weeks" },
              { label: "Post-Study Work", value: "2 Years Graduate" }
            ]
          : [
              { label: "Average Salary", value: "£52,000/yr" },
              { label: "Visa Processing", value: "15 Days" },
              { label: "Sponsor Licences", value: "100k+ Companies" }
            ],
      universities: [
        { name: "University of Oxford", ranking: "#2 Globally", location: "Oxford, Oxfordshire" },
        { name: "University of Cambridge", ranking: "#5 Globally", location: "Cambridge, Cambridgeshire" },
        { name: "Imperial College London", ranking: "#6 Globally", location: "London" },
        { name: "London School of Economics (LSE)", ranking: "#45 Globally", location: "London" }
      ],
      jobs: [
        { role: "Software Developer / Engineer", salary: "£45,000 - £75,000", demand: "High" },
        { role: "Healthcare / Medical Consultant", salary: "£40,000 - £65,000", demand: "Critical" },
        { role: "Financial / Investment Analyst", salary: "£50,000 - £85,000", demand: "High" }
      ],
      pathways: [
        { name: "Global Talent Visa", type: "Fast-track Residency", duration: "3-8 Weeks", desc: "For exceptional leaders or emerging talents in fields of research, tech, or arts." },
        { name: "Skilled Worker Route to ILR", type: "Employment PR", duration: "5 Years", desc: "Permanent residency after continuous, legal employment with a licensed sponsor." }
      ],
      link: "/services/uk-work-visa"
    },
    "Australia": {
      name: "Australia",
      code: "AU",
      accentColor: "#F59E0B", // Amber
      headline: visaType === "migration"
        ? "General Skilled Migration (Subclass 189/190/491)"
        : visaType === "student"
          ? "Extended Post-Study Rights & Sunshine"
          : "Employer-Sponsored Subclass 482 & High Wages",
      desc: visaType === "migration"
        ? "A points-tested program that allows you to migrate without requiring an employer sponsor. Settle permanently in Australia's highly liveable major cities or regional areas."
        : visaType === "student"
          ? "Combining highly ranked Group of Eight institutions, beautiful regional campuses, and post-study work rights extending up to 4-6 years in designated regions."
          : "Work for certified Australian employers under the Temporary Skill Shortage (TSS) visa, with pathways to Employer Nominated permanent residency.",
      stats: visaType === "migration"
        ? [
            { label: "Skilled Quota", value: "130k+/yr" },
            { label: "Min points", value: "65 Points" },
            { label: "Citizenship Path", value: "4 Years" }
          ]
        : visaType === "student"
          ? [
              { label: "Visa Success Rate", value: "95.5%" },
              { label: "Avg. Processing", value: "4 Weeks" },
              { label: "Post-Study Work", value: "2-4 Years" }
            ]
          : [
              { label: "Average Salary", value: "$85,000 AUD/yr" },
              { label: "Min Wage / Hour", value: "$23.23 AUD" },
              { label: "Processing Time", value: "25-45 Days" }
            ],
      universities: [
        { name: "University of Melbourne", ranking: "#14 Globally", location: "Melbourne, VIC" },
        { name: "University of Sydney", ranking: "#19 Globally", location: "Sydney, NSW" },
        { name: "University of New South Wales (UNSW)", ranking: "#19 Globally", location: "Sydney, NSW" },
        { name: "Australian National University (ANU)", ranking: "#30 Globally", location: "Canberra, ACT" }
      ],
      jobs: [
        { role: "Civil / Structural Engineer", salary: "$90,000 - $135,000 AUD", demand: "Critical" },
        { role: "ICT Security & Network Architect", salary: "$95,000 - $145,000 AUD", demand: "High" },
        { role: "Registered Nurse / Clinical Manager", salary: "$75,000 - $98,000 AUD", demand: "Critical" }
      ],
      pathways: [
        { name: "Skilled Independent (Subclass 189)", type: "Federal PR", duration: "8-10 Months", desc: "A direct permanent visa allowing you to live, work, and study anywhere with zero sponsor restrictions." },
        { name: "Skilled Nominated (Subclass 190)", type: "State Nominated PR", duration: "8-12 Months", desc: "State governments sponsor you, requiring residence in that state for the initial 2 years." },
        { name: "Skilled Work Regional (Subclass 491)", type: "Provisional PR", duration: "6-9 Months", desc: "5-year visa for regional areas, with a direct pathway to permanent residence after 3 years." }
      ],
      link: "/services/australia-pr"
    },
    "Europe": {
      name: "Europe",
      code: "DE",
      accentColor: "#10B981", // Green
      headline: visaType === "migration"
        ? "Fast-Track Settlement Permits & Blue Card Routes"
        : visaType === "student"
          ? "Tuition-Free Public Higher Education"
          : "Opportunity Card (Chancenkarte) & Jobs",
      desc: visaType === "migration"
        ? "Europe has modernized its residency laws, allowing university graduates and skilled workers to qualify for a Settlement Permit in as little as 21-24 months of working."
        : visaType === "student"
          ? "Unlocks top-tier German universities at public institutions which charge zero tuition fees, coupled with an 18-month job seeker visa extension post-graduation."
          : "Move directly to Europe on the points-based Opportunity Card to search for qualified work in tech, mechanical engineering, and automotive sectors.",
      stats: visaType === "migration"
        ? [
            { label: "Blue Card PR Settle", value: "21-27 Months" },
            { label: "Graduate Settle Time", value: "2 Years" },
            { label: "Citizenship Time", value: "5 Years" }
          ]
        : visaType === "student"
          ? [
              { label: "Visa Success Rate", value: "94.8%" },
              { label: "Avg. Processing", value: "6-8 Weeks" },
              { label: "Job Search Visa", value: "18 Months" }
            ]
          : [
              { label: "Average Salary", value: "€58,000/yr" },
              { label: "Card Validity", value: "1 Year" },
              { label: "Language Level", value: "English B2 / German A1" }
            ],
      universities: [
        { name: "Technical University of Munich (TUM)", ranking: "#37 Globally", location: "Munich, Bavaria" },
        { name: "Ludwig Maximilian University of Munich", ranking: "#54 Globally", location: "Munich, Bavaria" },
        { name: "Heidelberg University", ranking: "#79 Globally", location: "Heidelberg, Baden-Württemberg" },
        { name: "Humboldt University of Berlin", ranking: "#120 Globally", location: "Berlin" }
      ],
      jobs: [
        { role: "Embedded Systems / Robotics Engineer", salary: "€60,000 - €85,000", demand: "High" },
        { role: "Full Stack Developer", salary: "€55,000 - €80,000", demand: "High" },
        { role: "Automotive / Mechanical Specialist", salary: "€65,000 - €90,000", demand: "Critical" }
      ],
      pathways: [
        { name: "EU Blue Card PR Fast-Track", type: "Settlement Permit", duration: "2 Months", desc: "Blue Card holders qualify for permanent residence in 21 months with B1 German, or 27 months with A1 German." },
        { name: "Skilled Settlement Permit", type: "Permanent Residence", duration: "3 Months", desc: "For vocational/degree holders who have worked legally in Europe for 4 years." }
      ],
      link: "/services/europe-job-seeker-visa"
    },
    "New Zealand": {
      name: "New Zealand",
      code: "NZ",
      accentColor: "#06B6D4", // Cyan
      headline: "Green List & 6-Point Skilled Resident Pathways",
      desc: "Featuring a highly progressive Green List system that grants direct Straight to Residence visas for highly in-demand technical, clinical, and engineering practitioners.",
      stats: [
        { label: "SMC Target", value: "6 Points" },
        { label: "Straight to Residence", value: "Green List Roles" },
        { label: "Path to Citizenship", value: "5 Years" }
      ],
      pathways: [
        { name: "Green List Straight to Residence", type: "Direct Residency", duration: "3 Months", desc: "For priority roles like engineering, medical doctors, and ICT managers with NZ jobs." },
        { name: "Skilled Migrant Category (SMC)", type: "Points-based PR", duration: "6-9 Months", desc: "Points are accumulated based NZ qualifications, registration, and salary levels." }
      ],
      link: "/services/australia-pr" // Fallback link
    }
  }), [visaType]);

  // Handle projection coordinates for world map
  const project = (lng: number, lat: number) => {
    // Equirectangular projection
    // Input coordinates range from [-180, 180] (lng) and [-90, 90] (lat)
    // Map width = 1000, height = 500
    const x = ((lng + 180) * 1000) / 360;
    const y = ((90 - lat) * 500) / 180;
    return [x, y];
  };

  // Convert GeoJSON geometry to SVG Path string
  const getPathData = (geometry: any) => {
    if (!geometry) return "";
    
    if (geometry.type === "Polygon") {
      return geometry.coordinates
        .map((ring: any[]) => "M" + ring.map(([lng, lat]) => project(lng, lat).join(",")).join("L") + "Z")
        .join(" ");
    } else if (geometry.type === "MultiPolygon") {
      return geometry.coordinates
        .map((polygon: any[][]) =>
          polygon.map((ring) => "M" + ring.map(([lng, lat]) => project(lng, lat).join(",")).join("L") + "Z").join(" ")
        )
        .join(" ");
    }
    return "";
  };

  // SVG viewBox string
  const currentViewBox = useMemo(() => {
    const box = REGION_VIEWBOXES[activeRegion];
    return `${box.x} ${box.y} ${box.w} ${box.h}`;
  }, [activeRegion]);

  // Selected country details object
  const activeCountryDetails = useMemo(() => {
    if (!selectedCountry) return null;
    return countriesDetailsData[selectedCountry] || null;
  }, [selectedCountry, countriesDetailsData]);

  // Set default selection when visaType changes
  React.useEffect(() => {
    const defaultCountry = targetCountries[0];
    setSelectedCountry(defaultCountry);
    setActiveTab("overview");
  }, [visaType, targetCountries]);

  return (
    <div className="w-full space-y-8">
      {/* Region Presets and Title Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-ink-50 border border-ink-200/80 p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-orange-600 animate-spin-slow" />
          <span className="text-xs font-bold uppercase tracking-wider text-ink-800">
            Interactive Navigation Control
          </span>
        </div>
        
        {/* Preset Controls */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "world", label: "World View" },
            { id: "northAmerica", label: "North America" },
            { id: "europe", label: "Europe" },
            { id: "asiaPacific", label: "Asia-Pacific" }
          ].map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeRegion === region.id
                  ? "bg-black border-black text-white shadow-md"
                  : "bg-white border-ink-200 text-ink-700 hover:bg-ink-100"
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Section */}
      <div className="relative bg-premium-dark border border-orange-600/20 rounded-3xl overflow-hidden shadow-e4 p-4 md:p-8 min-h-[300px] md:min-h-[480px]">
        {/* Floating live indicator */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-orange-600/30 text-[10px] font-semibold text-orange-400 uppercase tracking-wider backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping"></span>
          <span>{visaType} destination mapping</span>
        </div>

        {/* Dynamic Zoom Preset Info */}
        <div className="absolute top-4 right-4 z-10 text-[10px] text-white/40 font-mono hidden md:block">
          Viewbox: {currentViewBox}
        </div>

        {/* SVG Container */}
        <svg
          viewBox={currentViewBox}
          className="w-full h-full transition-all duration-700 ease-out select-none"
          style={{ maxHeight: "450px" }}
        >
          {/* Graticule lines (subtle mesh background for elite feel) */}
          <g stroke="rgba(255, 107, 0, 0.09)" strokeWidth="0.5" fill="none">
            {Array.from({ length: 18 }).map((_, i) => {
              const lng = -180 + i * 20;
              const [x1, y1] = project(lng, -80);
              const [x2, y2] = project(lng, 80);
              return <line key={`lng-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
            {Array.from({ length: 9 }).map((_, i) => {
              const lat = -80 + i * 20;
              const [x1, y1] = project(-180, lat);
              const [x2, y2] = project(180, lat);
              return <line key={`lat-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>

          {/* Render Countries */}
          <g>
            {worldGeoJson.features.map((feature: any, idx: number) => {
              const countryName = feature.properties.NAME || feature.properties.ADMIN;
              const isTarget = targetCountries.includes(countryName);
              const isSelected = selectedCountry === countryName;
              const isHovered = hoveredCountry === countryName;

              const pathData = getPathData(feature.geometry);
              if (!pathData) return null;

              // Colour styles — dark landmass relief on a black ocean so
              // the orange destination states are the only thing that pops.
              let fill = "#1C1C1C";
              let stroke = "#2E2E2E";
              let strokeWidth = "0.5";

              if (isTarget) {
                // One brand orange for every target; per-country accent
                // colours are what made this map look like five brands.
                if (isSelected) {
                  fill = "#FF6B00";
                  stroke = "#FFB380";
                  strokeWidth = "1.5";
                } else if (isHovered) {
                  fill = "#FF6B00CC";
                  stroke = "#FF9147";
                  strokeWidth = "1.0";
                } else {
                  fill = "#FF6B0055";
                  stroke = "#FF6B00AA";
                  strokeWidth = "0.8";
                }
              }

              return (
                <path
                  key={`${countryName}-${idx}`}
                  d={pathData}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  className={`transition-all duration-300 ${isTarget ? "cursor-pointer" : "pointer-events-none"}`}
                  onMouseEnter={() => isTarget && setHoveredCountry(countryName)}
                  onMouseLeave={() => isTarget && setHoveredCountry(null)}
                  onClick={() => {
                    if (isTarget) {
                      setSelectedCountry(countryName);
                      setActiveTab("overview");
                    }
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* Hovered Tooltip Overlay */}
        <AnimatePresence>
          {hoveredCountry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute pointer-events-none bg-black-soft/95 border border-orange-600/30 px-3.5 py-2 rounded-xl text-xs text-white shadow-e4 flex items-center gap-2 backdrop-blur-md"
              style={{
                bottom: "20px",
                left: "20px",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse"></span>
              <strong className="font-heading font-bold">{hoveredCountry}</strong>
              <span className="text-white/65 font-medium">| Top Destination</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Details Panel Grid */}
      <AnimatePresence mode="wait">
        {activeCountryDetails && (
          <motion.div
            key={activeCountryDetails.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-ink-200/90 rounded-3xl p-6 md:p-10 shadow-lg"
          >
            {/* Left Column: Description & Stats (6 cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {/* Flag emoji representation */}
                  <span className="text-4xl shadow-sm filter drop-shadow">
                    {activeCountryDetails.code === "US" && "🇺🇸"}
                    {activeCountryDetails.code === "CA" && "🇨🇦"}
                    {activeCountryDetails.code === "GB" && "🇬🇧"}
                    {activeCountryDetails.code === "AU" && "🇦🇺"}
                    {activeCountryDetails.code === "DE" && "🇩🇪"}
                    {activeCountryDetails.code === "NZ" && "🇳🇿"}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-black">
                      {activeCountryDetails.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-orange-700">
                      {visaType === "student" && "Study Destination"}
                      {visaType === "work" && "Employment Opportunity"}
                      {visaType === "migration" && "Permanent Residency Pathway"}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold font-heading text-ink-900 leading-snug">
                  {activeCountryDetails.headline}
                </h4>
                <p className="text-ink-600 text-xs md:text-sm leading-relaxed font-body">
                  {activeCountryDetails.desc}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                {activeCountryDetails.stats.map((stat, i) => (
                  <div 
                    key={i} 
                    className="bg-ink-50 border border-ink-100 p-4 rounded-xl text-center md:text-left hover:border-orange/20 transition-colors"
                  >
                    <span className="text-[9px] text-ink-500 uppercase tracking-wider font-semibold block">{stat.label}</span>
                    <strong className="text-base md:text-lg font-heading text-orange-700 font-bold block mt-1">{stat.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Tabbed Lists (6 cols) */}
            <div className="lg:col-span-6 bg-black border border-white/10 p-6 rounded-2xl flex flex-col justify-between text-white">
              <div className="space-y-6">
                {/* Tab buttons */}
                <div className="flex border-b border-white/10 pb-2.5 gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`pb-1.5 border-b-2 cursor-pointer transition-all ${
                      activeTab === "overview"
                        ? "border-orange-500 text-orange-400"
                        : "border-transparent text-white/55 hover:text-white"
                    }`}
                  >
                    {visaType === "student" && "Top Institutions"}
                    {visaType === "work" && "In-Demand Jobs"}
                    {visaType === "migration" && "PR Pipelines"}
                  </button>
                  <button
                    onClick={() => setActiveTab("benefits")}
                    className={`pb-1.5 border-b-2 cursor-pointer transition-all ${
                      activeTab === "benefits"
                        ? "border-orange-500 text-orange-400"
                        : "border-transparent text-white/55 hover:text-white"
                    }`}
                  >
                    Destination Benefits
                  </button>
                </div>

                {/* Tab Contents */}
                <div>
                  {activeTab === "overview" && (
                    <div className="space-y-4">
                      {visaType === "student" && activeCountryDetails.universities && (
                        <div className="grid grid-cols-1 gap-3.5">
                          {activeCountryDetails.universities.map((uni, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-black-soft border border-white/[0.08] p-3 rounded-xl">
                              <div className="w-7 h-7 rounded-lg bg-orange-600/10 border border-orange-500/25 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                <GraduationCap className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5">
                                <h5 className="text-xs font-bold text-white leading-snug">{uni.name}</h5>
                                <div className="flex gap-2 text-[10px] text-white/55">
                                  <span>QS Rank: <span className="text-orange-400 font-semibold">{uni.ranking}</span></span>
                                  <span>•</span>
                                  <span>{uni.location}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {visaType === "work" && activeCountryDetails.jobs && (
                        <div className="grid grid-cols-1 gap-3.5">
                          {activeCountryDetails.jobs.map((job, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-black-soft border border-white/[0.08] p-3 rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-orange-600/10 border border-orange-500/25 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">
                                  <Briefcase className="w-4 h-4" />
                                </div>
                                <div>
                                  <h5 className="text-xs font-bold text-white">{job.role}</h5>
                                  <span className="text-[10px] text-white/55">Median Salary: {job.salary}</span>
                                </div>
                              </div>
                              <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-orange-600/12 border border-orange-500/30 text-orange-400">
                                {job.demand} Demand
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {visaType === "migration" && activeCountryDetails.pathways && (
                        <div className="grid grid-cols-1 gap-3.5">
                          {activeCountryDetails.pathways.map((path, idx) => (
                            <div key={idx} className="flex items-start gap-3 bg-black-soft border border-white/[0.08] p-3.5 rounded-xl space-y-1">
                              <div className="w-7 h-7 rounded-lg bg-orange-600/10 border border-orange-500/25 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                                <Landmark className="w-4 h-4" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h5 className="text-xs font-bold text-white leading-none">{path.name}</h5>
                                  <span className="text-[8px] uppercase font-bold px-1.5 py-0.5 rounded bg-orange-600/12 text-orange-400">
                                    {path.type}
                                  </span>
                                </div>
                                <p className="text-[10px] text-white/55 leading-relaxed font-body">{path.desc}</p>
                                <span className="text-[9px] font-mono text-orange-400 block">Processing: {path.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "benefits" && (
                    <ul className="space-y-3">
                      {[
                        visaType === "student" && "Access to globally recognized top-tier academic degrees",
                        visaType === "student" && "Permission to work part-time (typically 20 hours/week) during sessions",
                        visaType === "student" && "Post-study job search visa extension ranging from 1 to 4 years",
                        visaType === "work" && "High median salaries with excellent employee protection rights",
                        visaType === "work" && "Opportunity to bring dependents (spouse gets work permit in major areas)",
                        visaType === "work" && "Accumulate points to easily transition into Permanent Settlement",
                        visaType === "migration" && "Full resident rights with access to free universal healthcare",
                        visaType === "migration" && "Free high-quality primary and secondary schooling for children",
                        visaType === "migration" && "Fastest pathways to obtain strong passports and full citizenship"
                      ]
                        .filter(Boolean)
                        .map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Portal CTA Section */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase font-bold text-white/60 font-mono tracking-wider">Ready to Proceed?</span>
                  <p className="text-[11px] text-white/70">Explore complete requirements on our country portal.</p>
                </div>
                
                <Link
                  href={activeCountryDetails.link}
                  className="btn btn-primary text-xs px-5 py-2.5 rounded-full"
                >
                  <span>Go to Country Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
