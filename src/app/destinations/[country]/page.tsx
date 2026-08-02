import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { 
  GraduationCap, 
  Briefcase, 
  Building, 
  Globe2, 
  Plane,
  ArrowRight,
  HelpCircle,
  CheckCircle,
  MapPin,
  ArrowLeft
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { destinationsData, DestinationData } from "@/data/destinationsData";
import DestinationMapAndClock from "@/components/DestinationMapAndClock";

// Type definition for page props in Next.js App Router dynamic routes
interface DestinationPageProps {
  params: Promise<{
    country: string;
  }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const data = destinationsData[resolvedParams.country.toLowerCase()];
  
  if (!data) {
    return {
      title: "Destination Not Found | VisaEnsure",
    };
  }

  return {
    title: `${data.name} Visa & Immigration Guide | VisaEnsure`,
    description: data.description,
  };
}

// Map string icon names to Lucide components
const IconMapper = ({ name, className }: { name: string; className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className={className} />,
    Briefcase: <Briefcase className={className} />,
    Building: <Building className={className} />,
    Globe2: <Globe2 className={className} />,
    Plane: <Plane className={className} />,
  };
  return icons[name] || <CheckCircle className={className} />;
};

export default async function DestinationPage({ params }: DestinationPageProps) {
  const resolvedParams = await params;
  const countryKey = resolvedParams.country.toLowerCase();
  const data = destinationsData[countryKey];

  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-muted text-ink-900 overflow-hidden font-body">
      <TopBar />

      <main className="flex-1 pb-20 relative">
        {/* Background Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-8">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-orange-700 transition-colors group"
            >
              <div className="p-1.5 rounded-full bg-white shadow-sm border border-ink-200 group-hover:border-orange-500/30 group-hover:bg-orange-50 transition-all duration-300">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              </div>
              Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <div className="card p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />

            <div className="flex-1 space-y-6">
              <div className="eyebrow">
                <MapPin className="w-3.5 h-3.5" />
                <span>Destination Guide</span>
              </div>

              <h1 className="t-display text-ink-900">
                {data.name} <span className="text-[0.85em] align-middle ml-2 drop-shadow-md">{data.flag}</span>
              </h1>

              <span className="accent-bar" />

              <p className="t-lead font-medium text-ink-800">
                {data.tagline}
              </p>

              <p className="t-body max-w-2xl">
                {data.description}
              </p>
            </div>
            
            {/* Quick Stats Grid */}
            <div className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-4 shrink-0">
              {data.stats.map((stat, idx) => (
                <div key={idx} className="bg-ink-50 border border-ink-200 rounded-2xl p-5 flex flex-col gap-1 items-start md:min-w-[200px]">
                  <span className="text-[11px] font-bold text-ink-500 uppercase tracking-[0.1em]">{stat.label}</span>
                  <span className="text-xl font-heading font-extrabold text-orange-700">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Geographical Map, Local Time & Currency Section */}
          <DestinationMapAndClock countryId={countryKey} />

          {/* Visa Pathways Grid */}
          <div className="mt-16 space-y-8">
            <div className="text-center space-y-3 flex flex-col items-center">
              <span className="accent-bar" />
              <h2 className="t-h2 text-ink-900">Available Pathways</h2>
              <p className="t-body">Explore the primary visa options for {data.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.visas.map((visa, idx) => (
                <div key={idx} className="card card-hover p-8 group">
                  <div className="w-14 h-14 bg-orange-50 border border-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconMapper name={visa.iconName} className="w-7 h-7" />
                  </div>
                  <h3 className="t-h3 text-ink-900 mb-3">{visa.title}</h3>
                  <p className="t-body">{visa.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Section */}
          {data.faqs.length > 0 && (
            <div className="mt-16 max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3 flex flex-col items-center">
                <span className="accent-bar" />
                <h2 className="t-h2 text-ink-900">Frequently Asked Questions</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {data.faqs.map((faq, idx) => (
                  <div key={idx} className="card p-6 flex gap-4">
                    <HelpCircle className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="t-h4 text-ink-900 mb-2">{faq.q}</h4>
                      <p className="t-body">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="section-dark mt-16 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
              <span className="accent-bar" />
              <h2 className="t-h2">Ready to move to {data.name}?</h2>
              <p className="t-lead">
                Get a free consultation from our immigration experts to assess your eligibility and plan your relocation.
              </p>
              <Link href="/#contact" className="btn btn-primary mt-2 group">
                <span>Start Your Assessment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
