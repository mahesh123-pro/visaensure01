"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Clock, Coins, Compass, Globe, MapPin, RefreshCw, Smartphone } from "lucide-react";
import worldGeoJson from "@/data/world-countries.json";

interface DestinationMapAndClockProps {
  countryId: string;
}

interface CountryMeta {
  name: string;
  geoJsonNames: string[];
  viewbox: string;
  timezone: string;
  capital: string;
  currencyCode: string;
  currencySymbol: string;
  currencyName: string;
  exchangeRateVsUSD: number; // e.g. 1 USD = X Local
  exchangeRateVsINR: number; // e.g. 1 INR = X Local
}

const COUNTRY_METADATA: Record<string, CountryMeta> = {
  usa: {
    name: "United States",
    geoJsonNames: ["United States of America"],
    viewbox: "50 10 320 200",
    timezone: "America/New_York",
    capital: "Washington, D.C.",
    currencyCode: "USD",
    currencySymbol: "$",
    currencyName: "US Dollar",
    exchangeRateVsUSD: 1,
    exchangeRateVsINR: 0.012,
  },
  canada: {
    name: "Canada",
    geoJsonNames: ["Canada"],
    viewbox: "50 10 320 200",
    timezone: "America/Toronto",
    capital: "Ottawa",
    currencyCode: "CAD",
    currencySymbol: "$",
    currencyName: "Canadian Dollar",
    exchangeRateVsUSD: 1.36,
    exchangeRateVsINR: 0.016,
  },
  uk: {
    name: "United Kingdom",
    geoJsonNames: ["United Kingdom"],
    viewbox: "440 20 180 120",
    timezone: "Europe/London",
    capital: "London",
    currencyCode: "GBP",
    currencySymbol: "£",
    currencyName: "British Pound",
    exchangeRateVsUSD: 0.79,
    exchangeRateVsINR: 0.0095,
  },
  australia: {
    name: "Australia",
    geoJsonNames: ["Australia"],
    viewbox: "650 180 320 220",
    timezone: "Australia/Sydney",
    capital: "Canberra",
    currencyCode: "AUD",
    currencySymbol: "$",
    currencyName: "Australian Dollar",
    exchangeRateVsUSD: 1.52,
    exchangeRateVsINR: 0.018,
  },
  europe: {
    name: "Europe (Germany)",
    geoJsonNames: ["Germany"],
    viewbox: "440 30 180 120",
    timezone: "Europe/Berlin",
    capital: "Berlin",
    currencyCode: "EUR",
    currencySymbol: "€",
    currencyName: "Euro",
    exchangeRateVsUSD: 0.92,
    exchangeRateVsINR: 0.011,
  },
  "new-zealand": {
    name: "New Zealand",
    geoJsonNames: ["New Zealand"],
    viewbox: "800 280 180 140",
    timezone: "Pacific/Auckland",
    capital: "Wellington",
    currencyCode: "NZD",
    currencySymbol: "$",
    currencyName: "New Zealand Dollar",
    exchangeRateVsUSD: 1.65,
    exchangeRateVsINR: 0.02,
  },
  japan: {
    name: "Japan",
    geoJsonNames: ["Japan"],
    viewbox: "750 90 200 150",
    timezone: "Asia/Tokyo",
    capital: "Tokyo",
    currencyCode: "JPY",
    currencySymbol: "¥",
    currencyName: "Japanese Yen",
    exchangeRateVsUSD: 155.4,
    exchangeRateVsINR: 1.86,
  },
  schengen: {
    name: "Europe (Schengen)",
    geoJsonNames: ["Germany", "France", "Italy", "Spain", "Austria", "Belgium", "Netherlands"],
    viewbox: "440 30 180 120",
    timezone: "Europe/Paris",
    capital: "Brussels (EU Hub)",
    currencyCode: "EUR",
    currencySymbol: "€",
    currencyName: "Euro",
    exchangeRateVsUSD: 0.92,
    exchangeRateVsINR: 0.011,
  },
};

export default function DestinationMapAndClock({ countryId }: DestinationMapAndClockProps) {
  const meta = useMemo(() => COUNTRY_METADATA[countryId.toLowerCase()] || COUNTRY_METADATA.usa, [countryId]);
  
  // States
  const [localTime, setLocalTime] = useState("");
  const [localDate, setLocalDate] = useState("");
  const [conversionSource, setConversionSource] = useState<"USD" | "INR">("INR");
  const [sourceValue, setSourceValue] = useState("1000");

  // Local Time Tick
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-US", {
          timeZone: meta.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        const dateStr = now.toLocaleDateString("en-US", {
          timeZone: meta.timezone,
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        setLocalTime(timeStr);
        setLocalDate(dateStr);
      } catch (e) {
        setLocalTime(new Date().toLocaleTimeString());
        setLocalDate(new Date().toLocaleDateString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [meta.timezone]);

  // Projection logic
  const project = (lng: number, lat: number) => {
    const x = ((lng + 180) * 1000) / 360;
    const y = ((90 - lat) * 500) / 180;
    return [x, y];
  };

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

  // Convert source currency to destination local currency
  const convertedValue = useMemo(() => {
    const numericSource = parseFloat(sourceValue) || 0;
    const rate = conversionSource === "USD" ? meta.exchangeRateVsUSD : meta.exchangeRateVsINR;
    const rawResult = numericSource * rate;
    
    // Format JPY differently (usually no decimal)
    if (meta.currencyCode === "JPY") {
      return Math.round(rawResult).toLocaleString("en-US");
    }
    return rawResult.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [sourceValue, conversionSource, meta]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-stretch">
      {/* World Map Highlight Card (7 Columns) */}
      <div className="lg:col-span-7 bg-premium-dark border border-orange-600/20 rounded-3xl overflow-hidden p-6 flex flex-col justify-between relative shadow-lg min-h-[380px]">
        {/* Glow Effects */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-orange-500 animate-spin-slow" />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Geographical Location</h3>
              <p className="text-[10px] text-white/55">Visual map highlight for {meta.name}</p>
            </div>
          </div>
          <div className="text-[10px] text-orange-400 font-semibold px-2 py-0.5 bg-orange-600/10 border border-orange-500/35 rounded-full">
            Active Highlight
          </div>
        </div>

        {/* SVG Map */}
        <div className="flex-1 flex items-center justify-center min-h-[220px]">
          <svg
            viewBox={meta.viewbox}
            className="w-full h-full max-h-[250px] transition-all duration-700 select-none"
          >
            <g stroke="rgba(255, 107, 0, 0.08)" strokeWidth="0.5" fill="none">
              {Array.from({ length: 18 }).map((_, i) => {
                const lng = -180 + i * 20;
                const [x1, y1] = project(lng, -80);
                const [x2, y2] = project(lng, 80);
                return <line key={`lng-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
              })}
            </g>
            <g>
              {worldGeoJson.features.map((feature: any, idx: number) => {
                const countryName = feature.properties.NAME || feature.properties.ADMIN;
                const isSelected = meta.geoJsonNames.includes(countryName);

                const pathData = getPathData(feature.geometry);
                if (!pathData) return null;

                let fill = "#2e323b";
                let stroke = "#3e434f";
                let strokeWidth = "0.5";

                if (isSelected) {
                  fill = "#FF6B00";
                  stroke = "#FFFFFF";
                  strokeWidth = "1.5";
                }

                return (
                  <path
                    key={`${countryName}-${idx}`}
                    d={pathData}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    className="transition-all duration-300"
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <div className="relative z-10 border-t border-white/5 pt-3.5 mt-4 text-[10px] text-white/50 flex justify-between">
          <span>Map Projection: Equirectangular</span>
          <span>Zoom Focus: {meta.name}</span>
        </div>
      </div>

      {/* Local Clock & Currency Card (5 Columns) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* Time Zone Card */}
        <div className="bg-white border border-ink-200 rounded-3xl p-6 relative flex flex-col justify-between flex-1 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-ink-500 uppercase tracking-widest block">Local Capital Time</span>
              <strong className="text-black text-sm">{meta.capital} Time</strong>
            </div>
          </div>

          <div className="my-6">
            <div className="text-4xl font-extrabold font-heading text-black tracking-tight tabular-nums">
              {localTime || "--:--:-- --"}
            </div>
            <div className="text-xs text-orange-700 font-bold tracking-wider mt-1.5 flex items-center gap-1.5">
              <span>{localDate || "----"}</span>
              <span>•</span>
              <span className="bg-orange-50 px-2 py-0.5 rounded text-[10px] border border-orange-100">{meta.timezone}</span>
            </div>
          </div>

          <div className="text-[11px] text-ink-600 leading-relaxed border-t border-ink-150 pt-3">
            Our Hyderabad processing hub syncs document submissions with the local embassy hours of {meta.name} to maximize visa issuance speed.
          </div>
        </div>

        {/* Currency Card with Converter */}
        <div className="bg-black border border-white/10 rounded-3xl p-6 text-white relative flex flex-col justify-between flex-1 shadow-md">
          {/* Subtle Currency icon watermark background */}
          <div className="absolute right-4 bottom-4 w-28 h-28 text-white/[0.03] pointer-events-none select-none">
            <Coins className="w-full h-full" />
          </div>

          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-orange-400 shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-white/55 uppercase tracking-widest block">National Currency</span>
                <strong className="text-white text-sm">{meta.currencyName} ({meta.currencyCode})</strong>
              </div>
            </div>
            <div className="text-2xl font-bold font-heading text-orange-400">
              {meta.currencySymbol}
            </div>
          </div>

          {/* Mini Interactive Converter */}
          <div className="space-y-4 my-2">
            <div className="flex gap-2 p-1.5 bg-white/5 rounded-xl border border-white/10 max-w-xs">
              <button
                type="button"
                onClick={() => setConversionSource("INR")}
                className={`flex-1 py-1 text-center text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  conversionSource === "INR" ? "bg-orange-600 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                INR (₹)
              </button>
              <button
                type="button"
                onClick={() => setConversionSource("USD")}
                className={`flex-1 py-1 text-center text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                  conversionSource === "USD" ? "bg-orange-600 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                USD ($)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-white/40 mb-1 font-semibold">Source Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-white/40 font-bold">
                    {conversionSource === "INR" ? "₹" : "$"}
                  </span>
                  <input
                    type="number"
                    value={sourceValue}
                    onChange={(e) => setSourceValue(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-6 pr-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-all font-semibold"
                  />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[9px] uppercase tracking-wider text-orange-400 font-bold">Local Value</span>
                <span className="text-sm font-bold text-white mt-1.5 font-heading">
                  {meta.currencySymbol} {convertedValue}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-white/40 border-t border-white/5 pt-3.5 mt-4">
            Exchange rates based on standard 2026 economic indexes.
          </div>
        </div>
      </div>
    </div>
  );
}
