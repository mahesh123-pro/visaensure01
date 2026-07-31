"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, ChevronDown, MessageCircle, Globe2, Briefcase, GraduationCap, Plane, ShieldCheck, MapPin, Compass } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { WHATSAPP_URL } from "@/data/contact";

interface NavbarProps {
  onOpenAssessment: () => void;
  onOpenBooking: () => void;
  onOpenTracker: () => void;
}

const megaMenuVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.99 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } // Custom ease-out expo
  },
  exit: { 
    opacity: 0, 
    y: 6, 
    scale: 0.99,
    transition: { duration: 0.15, ease: "easeIn" }
  }
};

export default function Navbar({ onOpenAssessment, onOpenBooking, onOpenTracker }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  // Mobile accordion state
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Scroll detection to trigger Floating Island layout
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const targetId = href.replace(/^\/?#/, "#");
      
      if (pathname !== "/") {
        router.push("/" + targetId);
      } else {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setActiveMenu(null);
    setHoveredIdx(null);
  };

  // Mega Menu Data with detailed descriptions
  const servicesCategories = [
    {
      title: "Study Visas",
      icon: <GraduationCap className="w-5 h-5 text-orange-500" />,
      items: [
        { label: "All Study Programs", desc: "Comprehensive overseas study routes", href: "/services/student-visa" },
        { label: "USA Study Visa", desc: "Top tech universities & F-1 entry", href: "/services/usa-student-visa" },
        { label: "Canada Study Visa", desc: "SDS pathways & student permits", href: "/services/student-visa" },
        { label: "Australia Study Visa", desc: "Subclass 500 visa applications", href: "/services/student-visa" },
        { label: "Europe Study Visa", desc: "Free public university pathways", href: "/services/student-visa" },
      ]
    },
    {
      title: "Work Visas",
      icon: <Briefcase className="w-5 h-5 text-orange-500" />,
      items: [
        { label: "All Work Permits", desc: "Global employment authorizations", href: "/services/work-visa" },
        { label: "US H1B Visa", desc: "Specialty occupation sponsorship", href: "/services/h1b-visa" },
        { label: "UK Skilled Worker Visa", desc: "Sponsored jobs & residency route", href: "/services/uk-work-visa" },
        { label: "Europe Opportunity Card", desc: "Point-based job seeker entrance", href: "/services/europe-job-seeker-visa" },
      ]
    },
    {
      title: "Visitor Visas",
      icon: <Plane className="w-5 h-5 text-orange-500" />,
      items: [
        { label: "USA B1/B2 Tourist", desc: "Tourism & short business meetings", href: "/services/tourist-visa" },
        { label: "UK Visitor Visa", desc: "Standard short-stay permissions", href: "/services/tourist-visa" },
        { label: "Schengen Tourist Visa", desc: "Access 27 European countries", href: "/services/tourist-visa" },
        { label: "Canada Visitor Visa", desc: "Temporary Resident Visas (TRV)", href: "/services/tourist-visa" },
      ]
    },
    {
      title: "Immigration Services",
      icon: <Globe2 className="w-5 h-5 text-orange-500" />,
      items: [
        { label: "PR & Skilled Migration", desc: "Points-based permanent residency", href: "/services/migration-visa" },
        { label: "Canada Express Entry", desc: "FSW, CEC & Provincial streams", href: "/services/canada-pr" },
        { label: "Australia Subclass 189/190", desc: "Skilled independent nominations", href: "/services/australia-pr" },
        { label: "Family Sponsorship", desc: "Bring close family members abroad", href: "/services/dependent-visa" },
      ]
    },
    {
      title: "Additional Services",
      icon: <ShieldCheck className="w-5 h-5 text-orange-500" />,
      items: [
        { label: "English Coaching (IELTS)", desc: "High-score strategies (PTE too)", href: "/services/ielts-coaching" },
        { label: "Business & Investor Visa", desc: "Entrepreneur & start-up entries", href: "/services/business-visa" },
        { label: "SOP & Essay Support", desc: "Crafting winning application text", href: "/services/student-visa" },
        { label: "Interview Preparation", desc: "Mock consulate checkups & tips", href: "/services/student-visa" },
      ]
    }
  ];

  const countriesList = [
    { name: "USA", flag: "🇺🇸", desc: "Top destination for tech & education", visas: ["Study", "H1B", "B1/B2"], href: "/destinations/usa" },
    { name: "Canada", flag: "🇨🇦", desc: "Welcoming immigrants via Express Entry", visas: ["PR", "Study", "Work"], href: "/destinations/canada" },
    { name: "UK", flag: "🇬🇧", desc: "Excellent education & skilled worker routes", visas: ["Study", "Skilled Worker"], href: "/destinations/uk" },
    { name: "Australia", flag: "🇦🇺", desc: "High quality of life & skilled migration", visas: ["PR", "Study", "Work"], href: "/destinations/australia" },
    { name: "Europe", flag: "🇩🇪", desc: "Europe's largest economy & free education", visas: ["Job Seeker", "Study"], href: "/destinations/europe" },
    { name: "New Zealand", flag: "🇳🇿", desc: "Beautiful landscapes & great work-life", visas: ["Study", "Work"], href: "/destinations/new-zealand" },
    { name: "Ireland", flag: "🇮🇪", desc: "Tech hub of Europe with friendly locals", visas: ["Study", "Work"], href: "/destinations/ireland" },
    { name: "Europe", flag: "🇪🇺", desc: "Access 27 countries with Schengen Visa", visas: ["Schengen", "Visit"], href: "/destinations/europe" },
  ];

  const navLinks = [
    { label: "Home", href: "/", isScroll: false },
    { label: "Services", href: "#services-menu", isDropdown: true },
    { label: "Countries", href: "#countries-menu", isDropdown: true },
    { label: "Contact", href: "/#contact", isScroll: true }
  ];

  return (
    <>
      {/* Outer wrapper: Adding dynamic spacing for Floating Island navbar */}
      <header className={`sticky top-0 z-[100] w-full transition-all duration-500 px-4 sm:px-6 md:px-8 pointer-events-none ${
        scrolled ? "pt-3.5" : "pt-0"
      }`}>
        {/* Floating Glassmorphic Island Container */}
        <div 
          onMouseLeave={closeMenu}
          className={`mx-auto max-w-7xl w-full pointer-events-auto transition-all duration-500 border ${
            scrolled 
              ? "bg-white/80 backdrop-blur-xl border-white/40 shadow-[0_12px_30px_rgba(10,10,10,0.06)] rounded-2xl px-6 py-2" 
              : "bg-white/45 backdrop-blur-sm border-transparent py-4 px-2"
          }`}
        >
          <div className="w-full flex items-center justify-between relative">
            {/* Left: Logo Section with interactive shine */}
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-2 group cursor-pointer relative z-10 shrink-0 select-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/visaensureLogoForWebsite/12.png"
                alt="VisaEnsure Globe Logo"
                className="h-[2.8rem] md:h-[3.3rem] w-auto shrink-0 object-contain drop-shadow-[0_2px_4px_rgba(255,107,0,0.12)] group-hover:drop-shadow-[0_4px_12px_rgba(255,107,0,0.25)] group-hover:scale-[1.04] transition-all duration-500"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/visaensureLogoForWebsite/visaensure001.png"
                alt="VisaEnsure Logo"
                className="h-[2.2rem] md:h-[2.45rem] w-auto shrink-0 object-contain group-hover:brightness-95 transition-all duration-300"
              />
            </Link>

            {/* Center Desktop Navigation with sliding background pill */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 px-4 relative">
              {navLinks.map((link, idx) => {
                const isDropdown = link.isDropdown;
                const isItemActive = isDropdown 
                  ? (link.label === "Services" ? activeMenu === "services" || pathname.startsWith("/services") : activeMenu === "countries" || pathname.startsWith("/destinations"))
                  : (link.isScroll ? pathname === "/#contact" : pathname === "/");

                return (
                  <div
                    key={link.label}
                    className="relative py-1"
                    onMouseEnter={() => {
                      setHoveredIdx(idx);
                      if (isDropdown) {
                        setActiveMenu(link.label === "Services" ? "services" : "countries");
                      } else {
                        setActiveMenu(null);
                      }
                    }}
                  >
                    {isDropdown ? (
                      <button className={`flex items-center gap-1.5 px-4.5 py-2 text-sm font-semibold font-body transition-colors duration-300 select-none cursor-pointer relative z-10 ${
                        isItemActive ? "text-orange-600" : "text-ink-700 hover:text-orange-600"
                      }`}>
                        <span>{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          (link.label === "Services" ? activeMenu === "services" : activeMenu === "countries") ? "rotate-180 text-orange-500" : "text-ink-400 group-hover:text-orange-500"
                        }`} />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`px-4.5 py-2 text-sm font-semibold font-body transition-colors duration-300 block relative z-10 ${
                          isItemActive ? "text-orange-600" : "text-ink-700 hover:text-orange-600"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Active Page Indicator Bar */}
                    {isItemActive && (
                      <motion.span 
                        layoutId="activeNavLine"
                        className="absolute bottom-[-2px] left-4.5 right-4.5 h-[2px] bg-orange-500 rounded-full z-20"
                      />
                    )}

                    {/* Sliding Background Highlight Pill */}
                    {hoveredIdx === idx && (
                      <motion.div
                        layoutId="hoveredPill"
                        className="absolute inset-0 bg-orange-500/[0.05] border border-orange-500/10 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-5 relative z-10 shrink-0">
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 text-ink-700 hover:text-orange-600 transition-colors font-semibold text-sm group"
              >
                <MessageCircle className="w-4 h-4 text-ink-400 group-hover:text-orange-500 transition-colors" />
                <span>WhatsApp</span>
              </a>
              
              <button
                onClick={onOpenBooking}
                className="relative overflow-hidden btn btn-primary group px-5.5 py-2.5 text-sm rounded-xl shadow-[0_4px_14px_rgba(255,107,0,0.22)] hover:shadow-[0_6px_22px_rgba(255,107,0,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {/* Button shine animation */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center gap-1.5 font-bold">
                  Free consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center gap-4 lg:hidden relative z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-ink-50 hover:bg-orange-50 rounded-xl text-ink-900 hover:text-orange-700 border border-ink-200/50 hover:border-orange-500/20 transition-all duration-300 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* --- Desktop Mega Menus --- */}
          <AnimatePresence>
            {activeMenu === 'services' && (
              <motion.div
                key="services-mega"
                variants={megaMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-2xl border border-white shadow-[0_15px_45px_rgba(10,10,10,0.08)] rounded-2xl origin-top z-50 top-[calc(100%+12px)] w-[98vw] max-w-7xl overflow-hidden"
              >
                {/* Backlight subtle bloom */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/[0.02] via-transparent to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-8 py-8 relative z-10">
                  <div className="grid grid-cols-5 gap-7">
                    {servicesCategories.map((category, idx) => (
                      <div 
                        key={idx} 
                        className="flex flex-col p-1.5"
                      >
                        <div className="flex items-center gap-2 pb-2 mb-4.5 border-b border-ink-100">
                          <div className="p-1.5 bg-orange-500/5 rounded-lg text-orange-600 shadow-sm shrink-0 border border-orange-500/10">
                            {category.icon}
                          </div>
                          <h3 className="font-heading font-bold text-ink-900 text-[11.5px] tracking-wider uppercase">
                            {category.title}
                          </h3>
                        </div>
                        <ul className="flex flex-col gap-4">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link 
                                href={item.href}
                                onClick={closeMenu}
                                className="group/item flex flex-col transition-all cursor-pointer"
                              >
                                <span className="text-[13px] font-bold text-ink-900 group-hover/item:text-orange-600 transition-colors font-body block relative">
                                  {item.label}
                                </span>
                                <span className="text-[11px] text-ink-400 font-light mt-0.5 leading-normal block">
                                  {item.desc}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeMenu === 'countries' && (
              <motion.div
                key="countries-mega"
                variants={megaMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-1/2 -translate-x-1/2 bg-white/98 backdrop-blur-2xl border border-white shadow-[0_15px_45px_rgba(10,10,10,0.08)] rounded-2xl origin-top z-50 top-[calc(100%+12px)] w-[98vw] max-w-7xl overflow-hidden"
              >
                {/* Backlight subtle bloom */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/[0.02] via-transparent to-transparent pointer-events-none" />

                <div className="max-w-7xl mx-auto px-8 py-8 relative z-10">
                  <div className="grid grid-cols-4 gap-5">
                    {countriesList.map((country, idx) => (
                      <Link 
                        href={country.href} 
                        key={idx}
                        onClick={closeMenu}
                        className="group flex items-start gap-4.5 p-4 rounded-2xl bg-white hover:bg-orange-500/[0.02] border border-ink-200/50 hover:border-orange-500/20 shadow-sm hover:shadow-[0_8px_25px_rgba(255,107,0,0.08)] transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <span className="text-3.5xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0 select-none mt-0.5">{country.flag}</span>
                        <div className="flex flex-col min-w-0">
                          <h3 className="font-heading font-bold text-[14.5px] text-ink-900 group-hover:text-orange-600 transition-colors">
                            {country.name}
                          </h3>
                          <p className="text-[11.5px] text-ink-500 mt-1 mb-3 leading-relaxed font-body font-light line-clamp-1">{country.desc}</p>
                          <div className="flex flex-wrap gap-1 mt-auto">
                            {country.visas.map((visa, vIdx) => (
                              <span 
                                key={vIdx} 
                                className="text-[9px] uppercase font-bold bg-ink-50 border border-ink-200 text-ink-500 px-1.5 py-0.5 rounded-md group-hover:border-orange-500/20 group-hover:text-orange-600 group-hover:bg-orange-500/[0.02] transition-colors font-body"
                              >
                                {visa}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* --- Mobile Drawer Navigation --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[110] bg-white/99 backdrop-blur-xl flex flex-col lg:hidden"
          >
             <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100 bg-white/50">
               <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/visaensureLogoForWebsite/12.png" alt="VisaEnsure Globe" className="h-[2.55rem] w-auto shrink-0 object-contain drop-shadow-md" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/visaensureLogoForWebsite/visaensure001.png" alt="VisaEnsure Logo" className="h-[2.125rem] w-auto shrink-0 object-contain" />
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 bg-ink-100 hover:bg-orange-50 rounded-xl text-ink-600 hover:text-orange-700 border border-ink-200/50 hover:border-orange-500/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <Link 
                href="/" 
                onClick={(e) => handleNavClick(e, "/")} 
                className={`block text-xl font-heading font-semibold transition-colors ${
                  pathname === "/" ? "text-orange-600" : "text-ink-900"
                }`}
              >
                Home
              </Link>
              
              {/* Mobile Services Accordion */}
              <div className="border-t border-ink-100 pt-4">
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center justify-between w-full text-xl font-heading font-semibold py-1 transition-colors ${
                    pathname.startsWith("/services") ? "text-orange-700" : "text-ink-900"
                  }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-orange-600' : 'text-ink-400'}`} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 space-y-5">
                        {servicesCategories.map((cat, idx) => (
                          <div key={idx} className="border-l border-orange-500/20 pl-4 py-1">
                            <h4 className="text-xs font-bold text-orange-700 uppercase tracking-wider mb-2">{cat.title}</h4>
                            <ul className="space-y-2.5">
                              {cat.items.map((item, iIdx) => (
                                <li key={iIdx}>
                                  <Link 
                                    href={item.href} 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="text-sm text-ink-700 hover:text-orange-700 font-semibold block py-1.5 border-b border-ink-100 transition-colors font-body"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Countries Accordion */}
              <div className="border-t border-ink-100 pt-4">
                <button 
                  onClick={() => setMobileCountriesOpen(!mobileCountriesOpen)}
                  className={`flex items-center justify-between w-full text-xl font-heading font-semibold py-1 transition-colors ${
                    pathname.startsWith("/destinations") ? "text-orange-700" : "text-ink-900"
                  }`}
                >
                  <span>Countries</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileCountriesOpen ? 'rotate-180 text-orange-600' : 'text-ink-400'}`} />
                </button>
                <AnimatePresence>
                  {mobileCountriesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 grid grid-cols-2 gap-3">
                        {countriesList.map((country, idx) => (
                          <Link 
                            key={idx}
                            href={country.href} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-3 border border-ink-200 rounded-2xl bg-ink-100 hover:bg-orange-50/50 hover:border-orange-500/20 flex flex-col gap-2 transition-all duration-300"
                          >
                            <span className="text-3xl">{country.flag}</span>
                            <span className="font-bold text-sm text-ink-900">{country.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                href="/#contact" 
                onClick={(e) => handleNavClick(e, "/#contact")} 
                className="block text-xl font-heading font-semibold text-ink-900 border-t border-ink-100 pt-4"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="p-6 bg-ink-50 border-t border-ink-100 space-y-3">
              <a 
                href={WHATSAPP_URL} 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
              >
                <MessageCircle className="w-5 h-5 text-orange-600" />
                <span className="text-sm">WhatsApp</span>
              </a>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn btn-primary w-full"
              >
                <span className="text-sm">Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
