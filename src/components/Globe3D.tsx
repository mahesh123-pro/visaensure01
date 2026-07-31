"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, Pause, Sun, Moon } from "lucide-react";
import Globe from "globe.gl";
// Custom country-specific info mapping
const COUNTRY_DETAILS: Record<string, { capital: string; timezone: string; offset: number; visas: string[] }> = {
  "United States of America": { capital: "Washington, D.C.", timezone: "EST", offset: -5, visas: ["F-1 Student", "H-1B Work", "B1/B2 Visitor", "EB-5 Investor"] },
  "United States": { capital: "Washington, D.C.", timezone: "EST", offset: -5, visas: ["F-1 Student", "H-1B Work", "B1/B2 Visitor", "EB-5 Investor"] },
  "Canada": { capital: "Ottawa", timezone: "EST", offset: -5, visas: ["Express Entry PR", "Student Visa", "Work Permit", "Super Visa"] },
  "United Kingdom": { capital: "London", timezone: "GMT", offset: 0, visas: ["Student Visa", "Skilled Worker", "Standard Visitor", "Innovator Founder"] },
  "Australia": { capital: "Canberra", timezone: "AEST", offset: 10, visas: ["Subclass 189 PR", "Subclass 500 Student", "TSS 482 Work"] },
  "Europe": { capital: "Berlin", timezone: "CET", offset: 1, visas: ["Opportunity Card", "Student Visa", "Schengen Visitor", "EU Blue Card"] },
  "Ireland": { capital: "Dublin", timezone: "GMT", offset: 0, visas: ["Stamp 1G / Stamp 4", "Higher Education Student", "C-Visit Visitor"] },
  "New Zealand": { capital: "Wellington", timezone: "NZST", offset: 12, visas: ["Accredited Work", "Fee Paying Student", "Visitor Visa"] },
  "India": { capital: "New Delhi", timezone: "IST", offset: 5.5, visas: ["e-Tourist Visa", "Business Visa", "Employment Visa"] },
  "France": { capital: "Paris", timezone: "CET", offset: 1, visas: ["Talent Passport", "Long-stay Student", "Schengen Tourism"] },
  "Singapore": { capital: "Singapore", timezone: "SGT", offset: 8, visas: ["Employment Pass", "Student Pass", "Social Visit Pass"] },
  "United Arab Emirates": { capital: "Abu Dhabi", timezone: "GST", offset: 4, visas: ["Golden Visa", "Green Visa", "Tourist Visa"] },
  "Schengen Area": { capital: "Brussels", timezone: "CET", offset: 1, visas: ["Schengen Business", "Schengen Tourist", "Long-term Study"] }
};

// Pulse rings destinations mapping
const RINGS_DATA = [
  { lat: 37.0902, lng: -95.7129, maxRadius: 10, color: '#FF6B00' }, // USA
  { lat: 56.1304, lng: -106.3468, maxRadius: 10, color: '#FF6B00' }, // Canada
  { lat: 55.3781, lng: -3.4360, maxRadius: 10, color: '#FF6B00' }, // UK
  { lat: -25.2744, lng: 133.7751, maxRadius: 10, color: '#FF6B00' }, // Australia
  { lat: 51.1657, lng: 10.4515, maxRadius: 10, color: '#FF6B00' } // Europe
];

const DESTINATIONS = [
  { name: "USA", lat: 37.0902, lng: -95.7129, flag: "🇺🇸" },
  { name: "Canada", lat: 56.1304, lng: -106.3468, flag: "🇨🇦" },
  { name: "United Kingdom", lat: 55.3781, lng: -3.4360, flag: "🇬🇧" },
  { name: "Australia", lat: -25.2744, lng: 133.7751, flag: "🇦🇺" },
  { name: "Europe", lat: 51.1657, lng: 10.4515, flag: "🇩🇪" }
];



export default function Globe3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);
  const flyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const [isNightMode, setIsNightMode] = useState(true);
  const geoJsonData = useRef<any>(null);
  const cloudAnimId = useRef<number | null>(null);

  // Removed preload as it may cause React/Next.js Hydration issues if not used inside a supported boundary

  // Helper: ISO code to flag emoji
  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode || countryCode.length !== 2) return "🌐";
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map(char => 127397 + char.charCodeAt(0));
    try {
      return String.fromCodePoint(...codePoints);
    } catch (e) {
      return "🌐";
    }
  };

  // Helper: Local Time computation based on offset
  const getLocalTime = (offset: number) => {
    const date = new Date();
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  };

  // Parse rich country details on hover
  const getCountryInfo = (properties: any) => {
    const name = properties.ADMIN || properties.NAME || "Unknown Country";
    const iso2 = properties.ISO_A2 || "";
    const flag = getFlagEmoji(iso2);

    let detail = COUNTRY_DETAILS[name] || COUNTRY_DETAILS[iso2];

    if (!detail) {
      // Fallback calculation using longitude
      const lng = properties.LABEL_X || 0;
      const offset = Math.round(lng / 15);
      detail = {
        capital: "Info N/A",
        timezone: `GMT${offset >= 0 ? '+' : ''}${offset}`,
        offset,
        visas: ["Study Visa", "Visitor Visa"]
      };
    }

    const localTime = getLocalTime(detail.offset);
    const offsetString = `UTC${detail.offset >= 0 ? '+' : ''}${detail.offset}`;

    return {
      name,
      flag,
      capital: detail.capital,
      timezone: detail.timezone,
      offsetString,
      localTime,
      visas: detail.visas
    };
  };

  useEffect(() => {
    // Load map data asynchronously to prevent blocking the main thread
    fetch('/ne_110m_admin_0_countries.json')
      .then(res => res.json())
      .then(data => {
        geoJsonData.current = data;
        setDataLoaded(true);
        if (globeInstance.current) {
          globeInstance.current
            .polygonsData(data.features)
            .polygonAltitude(0.005)
            .polygonCapColor((d: any) => 'rgba(0, 0, 0, 0)') // fully transparent by default
            .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
            .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.08)'); // ultra subtle borders
        }
      })
      .catch(err => console.error("Error loading map data:", err));
  }, []);

  useEffect(() => {
    if (containerRef.current && !globeInstance.current) {
      // Initialize globe.gl immediately
      const globe = new Globe(containerRef.current)
        .backgroundColor('rgba(0,0,0,0)')
        .showGlobe(true)
        .showAtmosphere(true)
        .atmosphereColor('#FF6B00') // Brand orange halo, not a blue glow
        .atmosphereAltitude(0.22)
        
        // Photorealistic Earth textures
        .globeImageUrl('/images/globe/earth-blue-marble.webp')
        .bumpImageUrl('/images/globe/earth-topology.webp')

        // Continent and ocean text labels - Removed to eliminate DOM sub-pixel rounding vibration jitter
        .labelsData([])

        // Pulsing rings for top destinations
        .ringsData(RINGS_DATA)
        .ringColor((d: any) => d.color)
        .ringMaxRadius((d: any) => d.maxRadius)
        .ringPropagationSpeed(1.8)
        .ringAltitude(0.015)

        // Interactive polygons (for country highlighting)
        .polygonsData(geoJsonData.current ? geoJsonData.current.features : [])
        .polygonAltitude(0.005)
        .polygonCapColor((d: any) => 'rgba(0, 0, 0, 0)') // fully transparent by default
        .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
        .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.08)') // ultra subtle borders

        // Customized elite tooltips
        .polygonLabel((d: any) => {
          const info = getCountryInfo(d.properties);
          return `
            <div style="background: rgba(10, 10, 10, 0.94); border: 1px solid rgba(255, 107, 0, 0.4); padding: 12px 16px; border-radius: 12px; color: #ffffff; font-family: system-ui, -apple-system, sans-serif; font-size: 13px; min-width: 220px; box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.6); backdrop-filter: blur(10px); pointer-events: none;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="font-size: 22px;">${info.flag}</span>
                <div>
                  <strong style="color: #ffffff; font-size: 14px; font-weight: 600; display: block; line-height: 1.2;">${info.name}</strong>
                  <span style="font-size: 11px; color: #a1a1aa; font-weight: 500;">Capital: ${info.capital}</span>
                </div>
              </div>
              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px; display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px;">
                  <span style="color: #a1a1aa;">Local Time:</span>
                  <strong style="color: #FF6B00; font-weight: 600;">${info.localTime}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px;">
                  <span style="color: #a1a1aa;">Timezone:</span>
                  <span style="color: #ffffff; font-weight: 500;">${info.timezone} (${info.offsetString})</span>
                </div>
              </div>
              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; margin-top: 8px;">
                <span style="font-size: 9px; font-weight: 700; color: #FF6B00; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">Visa Services</span>
                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                  ${info.visas.map(v => `<span style="font-size: 9px; background: rgba(255, 107, 0, 0.15); border: 1px solid rgba(255, 107, 0, 0.3); color: #FFA54F; padding: 2px 6px; border-radius: 4px; font-weight: 500;">${v}</span>`).join('')}
                </div>
              </div>
            </div>
          `;
        })
        .onPolygonHover((hoverD: any) => globe
          .polygonCapColor((d: any) => d === hoverD ? 'rgba(255, 107, 0, 0.22)' : 'rgba(0, 0, 0, 0)')
          .polygonStrokeColor((d: any) => d === hoverD ? 'rgba(255, 107, 0, 0.8)' : 'rgba(255, 255, 255, 0.08)')
        )
        .polygonsTransitionDuration(200);

      // Access ThreeJS scene and setup custom lighting + materials
      const scene = globe.scene();
      const globeMaterial = globe.globeMaterial() as any;
      const textureLoader = new THREE.TextureLoader();

      // Specular ocean map (to reflect sunlight)
      const waterTexture = textureLoader.load('/images/globe/earth-water.webp');
      if (globeMaterial.isMeshPhongMaterial) {
        globeMaterial.specularMap = waterTexture;
        globeMaterial.specular = new THREE.Color(0x222222);
        globeMaterial.shininess = 25;
      } else if (globeMaterial.isMeshStandardMaterial) {
        globeMaterial.roughnessMap = waterTexture;
        globeMaterial.roughness = 0.65;
        globeMaterial.metalnessMap = waterTexture;
        globeMaterial.metalness = 0.1;
      }

      // Emissive night city-lights map (visible on shadowed side)
      const nightTexture = textureLoader.load('/images/globe/earth-night.webp');
      globeMaterial.emissiveMap = nightTexture;
      globeMaterial.emissive = new THREE.Color(0xffbb77); // soft amber glow
      globeMaterial.emissiveIntensity = 2.5;

      // Add Custom Dynamic Cloud Layer
      const radius = 100; // standard globe.gl radius
      const cloudGeometry = new THREE.SphereGeometry(radius * 1.010, 64, 64);
      const cloudMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('/images/globe/earth-clouds.webp'),
        transparent: true,
        opacity: 0.35,
        depthWrite: false
      });
      const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      scene.add(clouds);

      // Animate clouds rotation smoothly with high-precision delta-time
      let lastTime = performance.now();
      const animateScene = () => {
        const now = performance.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        if (clouds) {
          clouds.rotation.y += 0.012 * delta; // smooth rotation independent of framerate
        }
        cloudAnimId.current = requestAnimationFrame(animateScene);
      };
      animateScene();

      // Configure Day/Night Cycle Lighting (Statically Aligned Sun)
      const defaultLights = scene.children.filter((c: any) => c.isLight);
      defaultLights.forEach((light: any) => scene.remove(light)); // clear camera-following lights

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.20); // soft night visibility
      scene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xffffff, 2.2); // strong direct daylight
      sunLight.position.set(-150, 40, 100); // sun shines from front-left
      scene.add(sunLight);

      globeInstance.current = globe;
      
      // Setup controls
      globe.controls().autoRotate = autoRotate;
      globe.controls().autoRotateSpeed = -2.5; // Fast and smooth rotation
      globe.controls().enableZoom = false;
      globe.controls().enableDamping = false; // Disabled damping as requested
      globe.pointOfView({ altitude: 2.5 }, 0); // Zoom out to view it completely

      // Responsive sizing
      const handleResize = () => {
        if (containerRef.current && globeInstance.current) {
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          globeInstance.current.width(width).height(height);
        }
      };
      
      window.addEventListener('resize', handleResize);
      setTimeout(handleResize, 100); // Initial resize trigger

      return () => {
        window.removeEventListener('resize', handleResize);
        if (cloudAnimId.current) cancelAnimationFrame(cloudAnimId.current);
        if (scene) {
          if (clouds) scene.remove(clouds);
        }
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
        globeInstance.current = null;
      };
    }
  }, []);

  // Dynamic controls sync
  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    if (globeInstance.current) {
      const globeMaterial = globeInstance.current.globeMaterial();
      if (globeMaterial) {
        globeMaterial.emissiveIntensity = isNightMode ? 2.5 : 0.0;
      }
    }
  }, [isNightMode]);



  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (flyTimeoutRef.current) {
        clearTimeout(flyTimeoutRef.current);
      }
    };
  }, []);

  const handleFlyTo = (dest: typeof DESTINATIONS[0]) => {
    setSelectedDest(dest.name);
    setAutoRotate(false);
    
    if (flyTimeoutRef.current) {
      clearTimeout(flyTimeoutRef.current);
    }

    if (globeInstance.current) {
      globeInstance.current.pointOfView({ lat: dest.lat, lng: dest.lng, altitude: 1.8 }, 1500);
      
      flyTimeoutRef.current = setTimeout(() => {
        setAutoRotate(true);
        setSelectedDest(null);
      }, 8000);
    }
  };

  return (
    <div className="relative w-full h-[500px] md:h-[650px] lg:h-[700px] flex items-center justify-center overflow-visible select-none">
      {/* Elite futuristic radial atmospheric glow under the globe */}
      <div className="absolute w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.18)_0%,transparent_70%)] pointer-events-none z-0 filter blur-xl" />

      {/* Cybernetic ambient orbit ring behind the globe */}
      <div className="absolute w-[360px] h-[360px] md:w-[500px] md:h-[500px] rounded-full border border-orange-600/10 pointer-events-none z-0" />
      <div className="absolute w-[380px] h-[380px] md:w-[530px] md:h-[530px] rounded-full border border-dashed border-orange-600/5 pointer-events-none z-0" />

      {/* Globe Container */}
      <div ref={containerRef} className="w-full h-full relative z-10 cursor-grab active:cursor-grabbing" />

      {/* Dynamic Dashboard Controls */}
      <div className="absolute -bottom-6 lg:-bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3 w-[92%] sm:w-auto">
        {/* Top Destinations Quick Travel */}
        <div className="flex flex-wrap justify-center gap-1.5 bg-black/85 backdrop-blur-lg px-3 py-2 rounded-full border border-white/10 shadow-2xl">
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.name}
              onClick={() => handleFlyTo(dest)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
                selectedDest === dest.name
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/40 font-bold"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{dest.flag}</span>
              <span>{dest.name}</span>
            </button>
          ))}
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-4 bg-black/90 backdrop-blur-lg px-4.5 py-2 rounded-full border border-white/10 shadow-2xl text-[11px] text-white font-sans">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="flex items-center gap-1.5 hover:text-orange-700 transition-colors cursor-pointer font-medium"
          >
            {autoRotate ? (
              <>
                <Pause className="w-3.5 h-3.5 text-orange-600" />
                <span>Pause Rotation</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-orange-600" />
                <span>Auto Rotate</span>
              </>
            )}
          </button>
          
          <div className="w-[1px] h-3.5 bg-white/20" />

          <button
            onClick={() => setIsNightMode(!isNightMode)}
            className="flex items-center gap-1.5 hover:text-orange-700 transition-colors cursor-pointer font-medium"
          >
            {isNightMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-orange-400" />
                <span>Day Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-ink-400" />
                <span>Night Lights</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
