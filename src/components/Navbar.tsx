"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, Menu, X, SlidersHorizontal, Calendar, ArrowRight, Zap, Sun, BatteryCharging } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { VEHICLES } from "@/data/teslaData";
import CarVisual from "./CarVisual";

interface NavbarProps {
  onOpenDemoDrive?: (defaultModelId?: string) => void;
  onOpenCompare?: () => void;
  onSelectSection?: (sectionId: string) => void;
}

export default function Navbar({
  onOpenDemoDrive,
  onOpenCompare,
  onSelectSection,
}: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState<"vehicles" | "energy" | "charging" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setActiveDropdown(null);
    setMobileOpen(false);
    if (onSelectSection) {
      onSelectSection(sectionId);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Top Bar */}
      <div
        className={`flex items-center justify-between px-6 lg:px-12 h-14 transition-colors duration-300 ${
          activeDropdown || mobileOpen
            ? "bg-zinc-950/95 text-white border-b border-white/10"
            : "bg-black/30 backdrop-blur-md text-white"
        }`}
      >
        {/* Tesla Official Wordmark SVG */}
        <Link
          href="/"
          onClick={() => handleNavClick("modely")}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="Tesla Home"
        >
          <svg
            className="h-3.5 w-32 fill-current tracking-widest"
            viewBox="0 0 342 35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" />
          </svg>
        </Link>

        {/* Center Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onMouseEnter={() => setActiveDropdown("vehicles")}
            onClick={() =>
              setActiveDropdown(activeDropdown === "vehicles" ? null : "vehicles")
            }
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeDropdown === "vehicles" ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            {t.nav.vehicles}
          </button>

          <button
            onMouseEnter={() => setActiveDropdown("energy")}
            onClick={() =>
              setActiveDropdown(activeDropdown === "energy" ? null : "energy")
            }
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeDropdown === "energy" ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            {t.nav.energy}
          </button>

          <button
            onMouseEnter={() => setActiveDropdown("charging")}
            onClick={() =>
              setActiveDropdown(activeDropdown === "charging" ? null : "charging")
            }
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              activeDropdown === "charging" ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            {t.nav.charging}
          </button>

          {onOpenCompare && (
            <button
              onMouseEnter={() => setActiveDropdown(null)}
              onClick={onOpenCompare}
              className="px-4 py-1.5 rounded-md text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
            >
              {t.nav.compare}
            </button>
          )}

          {onOpenDemoDrive && (
            <button
              onMouseEnter={() => setActiveDropdown(null)}
              onClick={() => onOpenDemoDrive("modely")}
              className="px-4 py-1.5 rounded-md text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer"
            >
              {t.nav.demoDrive}
            </button>
          )}

          <Link
            href="/configure?model=modely"
            onMouseEnter={() => setActiveDropdown(null)}
            className="px-4 py-1.5 rounded-md text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors ml-1"
          >
            {t.nav.configure}
          </Link>

          <Link
            href="/admin"
            onMouseEnter={() => setActiveDropdown(null)}
            className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Admin
          </Link>
        </nav>

        {/* Right Controls: Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* UZ / EN Switcher */}
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/15">
            <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-zinc-300" />
            <button
              onClick={() => setLang("uz")}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                lang === "uz"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Desktop Mega-Menu Dropdown */}
      {activeDropdown && (
        <div className="hidden lg:block bg-zinc-950/95 backdrop-blur-2xl border-b border-white/10 text-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-10 py-8">
            {activeDropdown === "vehicles" && (
              <div className="grid grid-cols-12 gap-8">
                {/* 5 Vehicle Cards */}
                <div className="col-span-9 grid grid-cols-5 gap-4">
                  {VEHICLES.map((v) => (
                    <div
                      key={v.id}
                      className="group rounded-xl bg-zinc-900/70 hover:bg-zinc-900 border border-white/5 hover:border-white/20 p-3 transition-all flex flex-col justify-between"
                    >
                      <div
                        onClick={() => handleNavClick(v.id)}
                        className="cursor-pointer"
                      >
                        <div className="h-28 w-full mb-2 overflow-hidden rounded-lg">
                          <CarVisual
                            vehicle={v}
                            paint={v.paints[0]}
                            wheel={v.wheels[0]}
                            interior={v.interiors[0]}
                            trimId={v.trims[0].id}
                            compact
                          />
                        </div>
                        <h4 className="font-semibold text-center text-sm tracking-wide">
                          {v.name}
                        </h4>
                        <p className="text-center text-xs text-zinc-400 mt-0.5">
                          ${v.startingPrice.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-center gap-3 mt-3 pt-2 border-t border-white/10 text-xs">
                        <button
                          onClick={() => handleNavClick(v.id)}
                          className="text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
                        >
                          {t.nav.learnMore}
                        </button>
                        <Link
                          href={`/configure?model=${v.id}`}
                          onClick={() => setActiveDropdown(null)}
                          className="text-blue-400 hover:text-blue-300 font-medium underline underline-offset-4"
                        >
                          {t.nav.orderNow}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Side Quick Actions */}
                <div className="col-span-3 border-l border-white/10 pl-8 flex flex-col justify-center space-y-3 text-sm">
                  <Link
                    href="/configure?model=modely"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors font-medium"
                  >
                    <span className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                      {t.nav.designYours}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </Link>

                  {onOpenCompare && (
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenCompare();
                      }}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors font-medium text-left cursor-pointer"
                    >
                      <span>{t.hero.compareModels}</span>
                      <ArrowRight className="w-4 h-4 text-zinc-400" />
                    </button>
                  )}

                  {onOpenDemoDrive && (
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        onOpenDemoDrive("modely");
                      }}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors font-medium text-left cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        {t.hero.demoDrive}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-400" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeDropdown === "energy" && (
              <div className="grid grid-cols-3 gap-6">
                <div
                  onClick={() => handleNavClick("solar")}
                  className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-amber-400/50 cursor-pointer transition-all"
                >
                  <Sun className="w-8 h-8 text-amber-400 mb-3" />
                  <h4 className="font-semibold text-base">
                    {lang === "uz" ? "Quyosh Panellari (Solar Roof)" : "Solar Panels & Solar Roof"}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lang === "uz"
                      ? "Uyingiz uchun ekologik toza quyosh elektr stansiyasi"
                      : "Produce clean solar energy for your home"}
                  </p>
                </div>

                <div
                  onClick={() => handleNavClick("solar")}
                  className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-emerald-400/50 cursor-pointer transition-all"
                >
                  <BatteryCharging className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-semibold text-base">Powerwall 3</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lang === "uz"
                      ? "13.5 kVt·soat uy batareyasi — chiroq o'chganda uzluksiz elektr"
                      : "13.5 kWh compact home battery backup system"}
                  </p>
                </div>

                <div
                  onClick={() => handleNavClick("solar")}
                  className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-blue-400/50 cursor-pointer transition-all"
                >
                  <Zap className="w-8 h-8 text-blue-400 mb-3" />
                  <h4 className="font-semibold text-base">Megapack</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lang === "uz"
                      ? "Sanoat va shahar elektr tarmoqlari uchun ulkan energiya saqlagich"
                      : "Massive utility-scale energy storage"}
                  </p>
                </div>
              </div>
            )}

            {activeDropdown === "charging" && (
              <div className="grid grid-cols-3 gap-6">
                <div
                  onClick={() => handleNavClick("accessories")}
                  className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/30 cursor-pointer transition-all"
                >
                  <h4 className="font-semibold text-base">Wall Connector</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lang === "uz"
                      ? "Uyda soatiga 71 km masofa qo'shuvchi Wi-Fi quvvatlagich • $450"
                      : "Fast Wi-Fi home charging up to 44 mi/hr • $450"}
                  </p>
                </div>
                <div
                  onClick={() => handleNavClick("accessories")}
                  className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/30 cursor-pointer transition-all"
                >
                  <h4 className="font-semibold text-base">Supercharger V4</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lang === "uz"
                      ? "15 daqiqada 280 km gacha tezkor quvvatlash shoxobchalari"
                      : "Charge up to 280 km in just 15 minutes"}
                  </p>
                </div>
                <div
                  onClick={() => handleNavClick("accessories")}
                  className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/30 cursor-pointer transition-all"
                >
                  <h4 className="font-semibold text-base">Mobile Connector</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {lang === "uz"
                      ? "Safarda 220V rozetkadan quvvatlash to'plami • $250"
                      : "Portable charging bundle for any standard outlet • $250"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-zinc-950/98 text-white border-b border-white/10 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {VEHICLES.map((v) => (
              <button
                key={v.id}
                onClick={() => handleNavClick(v.id)}
                className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-left"
              >
                <div className="font-semibold text-sm">{v.name}</div>
                <div className="text-xs text-zinc-400">${v.startingPrice.toLocaleString()}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link
              href="/configure?model=modely"
              onClick={() => setMobileOpen(false)}
              className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-center text-sm"
            >
              {t.nav.designYours}
            </Link>
            {onOpenDemoDrive && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenDemoDrive("modely");
                }}
                className="w-full py-3 rounded-lg bg-zinc-800 text-white font-medium text-sm"
              >
                {t.hero.demoDrive}
              </button>
            )}
            {onOpenCompare && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCompare();
                }}
                className="w-full py-3 rounded-lg bg-zinc-900 border border-white/10 text-white font-medium text-sm"
              >
                {t.hero.compareModels}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
