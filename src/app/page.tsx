"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Sun, BatteryCharging, Zap, ShieldCheck, SlidersHorizontal, ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoDriveModal from "@/components/DemoDriveModal";
import CompareModal from "@/components/CompareModal";
import { VEHICLES } from "@/data/teslaData";
import { useLanguage } from "@/context/LanguageContext";

const SECTION_IDS = [
  ...VEHICLES.map((v) => ({ id: v.id, label: v.name })),
  { id: "solar", label: "Solar & Powerwall" },
  { id: "accessories", label: "Accessories" },
];

export default function HomePage() {
  const { lang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>("modely");
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoModelId, setDemoModelId] = useState("modely");
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Interactive Solar & Powerwall Calculator state
  const [roofAreaSqm, setRoofAreaSqm] = useState(120);
  const [powerwallCount, setPowerwallCount] = useState(2);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const viewportHeight = window.innerHeight;
    const index = Math.round(scrollTop / viewportHeight);
    if (SECTION_IDS[index]) {
      setActiveSection(SECTION_IDS[index].id);
    }
  };

  const handleOpenDemoDrive = (modelId = "modely") => {
    setDemoModelId(modelId);
    setDemoModalOpen(true);
  };

  const solarKw = Math.round(roofAreaSqm * 0.14 * 10) / 10;
  const backupKwh = Math.round(powerwallCount * 13.5 * 10) / 10;
  const estPrice = Math.round(solarKw * 1450 + powerwallCount * 7500);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <Navbar
        onOpenDemoDrive={handleOpenDemoDrive}
        onOpenCompare={() => setCompareModalOpen(true)}
        onSelectSection={scrollToSection}
      />

      {/* Right Side Quick-Jump Dots */}
      <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2.5 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/10">
        {SECTION_IDS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              title={sec.label}
              className="group relative flex items-center justify-end cursor-pointer"
            >
              <span className="mr-3 px-2 py-0.5 rounded bg-zinc-900/90 border border-white/10 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {sec.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2.5 h-6 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white"
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* Main Full-Screen Snap-Scroll Container */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      >
        {/* 5 Vehicle Sections */}
        {VEHICLES.map((vehicle, index) => {
          const nextId = SECTION_IDS[index + 1]?.id;
          return (
            <HeroSection
              key={vehicle.id}
              vehicle={vehicle}
              onOpenDemoDrive={handleOpenDemoDrive}
              onScrollNext={nextId ? () => scrollToSection(nextId) : undefined}
            />
          );
        })}

        {/* Solar Panels & Powerwall 3 Section */}
        <section
          id="solar"
          className="relative h-screen w-full snap-start flex flex-col justify-between overflow-hidden bg-zinc-950"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/90" />

          {/* Top Title */}
          <div className="relative z-20 pt-24 md:pt-28 text-center px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs mb-3">
              <Sun className="w-3.5 h-3.5" />
              <span>Tesla Energy • 24/7 Toza Energiya</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {t.hero.solarTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
              {t.hero.solarSubtitle}
            </p>
          </div>

          {/* Interactive Solar & Powerwall Configurator Card */}
          <div className="relative z-20 px-4 max-w-3xl mx-auto w-full my-auto">
            <div className="rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-white/15 p-5 sm:p-7 text-white shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                      <span className="text-zinc-300">
                        {lang === "uz" ? "Tom maydoni (m²):" : "Roof Area (m²):"}
                      </span>
                      <span className="font-bold text-amber-400">{roofAreaSqm} m²</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={300}
                      step={10}
                      value={roofAreaSqm}
                      onChange={(e) => setRoofAreaSqm(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                      <span className="text-zinc-300">
                        {lang === "uz" ? "Powerwall 3 batareyalar soni:" : "Powerwall 3 Units:"}
                      </span>
                      <span className="font-bold text-emerald-400">{powerwallCount}x</span>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          onClick={() => setPowerwallCount(num)}
                          className={`flex-1 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            powerwallCount === num
                              ? "bg-emerald-500/25 border-emerald-400 text-white"
                              : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {num} Powerwall
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-zinc-900/90 border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      {lang === "uz" ? "Quyosh stansiyasi quvvati" : "Solar Array Output"}
                    </span>
                    <span className="font-bold text-base">{solarKw} kW</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                      {lang === "uz" ? "Zaxira batareya sig'imi" : "Backup Storage"}
                    </span>
                    <span className="font-bold text-base">{backupKwh} kWh</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-zinc-400">
                      {lang === "uz" ? "Taxminiy to'plam narxi:" : "Estimated System Price:"}
                    </span>
                    <span className="text-lg font-bold text-white">
                      ${estPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="relative z-20 pb-10 px-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => handleOpenDemoDrive("modely")}
              className="w-full sm:w-64 py-3 px-6 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all cursor-pointer"
            >
              {t.hero.solarCtaPrimary}
            </button>
            <button
              onClick={() => scrollToSection("accessories")}
              className="w-full sm:w-64 py-3 px-6 rounded-md bg-white/85 hover:bg-white text-zinc-900 text-sm font-semibold transition-all cursor-pointer"
            >
              {t.hero.solarCtaSecondary}
            </button>
          </div>
        </section>

        {/* Accessories & Footer Section */}
        <section
          id="accessories"
          className="relative h-screen w-full snap-start flex flex-col justify-between overflow-hidden bg-zinc-950"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=2000&q=85')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/95" />

          <div className="relative z-20 pt-24 md:pt-28 text-center px-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              {t.hero.accessoriesTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-300">
              {t.hero.accessoriesSubtitle}
            </p>
          </div>

          {/* Featured Charging & Gear Cards */}
          <div className="relative z-20 max-w-5xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4 my-auto">
            <div className="rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">Wall Connector Gen 3</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {lang === "uz"
                    ? "Soatiga 71 km gacha masofa qo'shadi. Uy va garaj uchun eng tez Wi-Fi quvvatlagich."
                    : "Up to 71 km of range added per hour. Sleek glass faceplate with Wi-Fi connectivity."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-bold text-white">$450</span>
                <Link
                  href="/configure?model=modely"
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  {t.nav.orderNow} →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">Mobile Connector</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {lang === "uz"
                    ? "Har qanday 220V uy rozetkasidan safarda xavfsiz quvvatlash uchun ko'chma to'plam."
                    : "Portable charging cable kit with standard and high-output outlet adapters."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-bold text-white">$250</span>
                <Link
                  href="/configure?model=model3"
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  {t.nav.orderNow} →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-zinc-900/85 backdrop-blur-md border border-white/10 p-5 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">All-Weather Interior Liners</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {lang === "uz"
                    ? "Lazer o'lchamli termoplastik gilamchalar — salonni chang, qor va suvdan himoyalaydi."
                    : "Laser-measured custom fit thermoplastic liners for maximum cabin protection."}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-bold text-white">$225</span>
                <Link
                  href="/configure?model=cybertruck"
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                >
                  {t.nav.orderNow} →
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom CTA & Footer */}
          <div className="relative z-20 pb-6 px-4 flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <Link
                href="/configure?model=modely"
                className="py-3 px-8 rounded-md bg-white text-black hover:bg-zinc-200 font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>{t.hero.shopNow}</span>
              </Link>
              <button
                onClick={() => scrollToSection("modely")}
                className="py-3 px-4 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowUp className="w-4 h-4" />
                <span>{lang === "uz" ? "Yuqoriga" : "Top"}</span>
              </button>
            </div>

            <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 border-t border-white/10 pt-4 w-full max-w-4xl">
              <span>Tesla © 2026 Clone (Next.js)</span>
              <button
                onClick={() => setCompareModalOpen(true)}
                className="hover:text-white cursor-pointer"
              >
                {t.nav.compare}
              </button>
              <button
                onClick={() => handleOpenDemoDrive("modely")}
                className="hover:text-white cursor-pointer"
              >
                {t.nav.demoDrive}
              </button>
              <Link href="/configure?model=modely" className="hover:text-white">
                {t.nav.configure}
              </Link>
              <span>Toshkent • Samarqand • Global</span>
            </footer>
          </div>
        </section>
      </main>

      {/* Modals */}
      <DemoDriveModal
        isOpen={demoModalOpen}
        initialModelId={demoModelId}
        onClose={() => setDemoModalOpen(false)}
      />
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
      />
    </div>
  );
}
