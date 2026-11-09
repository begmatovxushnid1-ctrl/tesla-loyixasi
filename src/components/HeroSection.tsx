"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Gauge, Zap, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { VehicleModel } from "@/data/teslaData";
import { useLanguage } from "@/context/LanguageContext";
import CarVisual from "./CarVisual";

interface HeroSectionProps {
  vehicle: VehicleModel;
  onOpenDemoDrive: (modelId: string) => void;
  onScrollNext?: () => void;
}

export default function HeroSection({
  vehicle,
  onOpenDemoDrive,
  onScrollNext,
}: HeroSectionProps) {
  const { lang, t } = useLanguage();
  const [selectedPaintIdx, setSelectedPaintIdx] = useState(0);
  const [showStudioPreview, setShowStudioPreview] = useState(false);

  const topTrim = vehicle.trims[vehicle.trims.length - 1];
  const maxRange = Math.max(...vehicle.trims.map((tr) => tr.rangeKm));
  const isCyber = vehicle.id === "cybertruck";

  return (
    <section
      id={vehicle.id}
      className="relative h-screen w-full snap-start flex flex-col justify-between overflow-hidden select-none bg-black"
    >
      {/* Background Photo with Dark Vignette Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('${vehicle.heroBgImage}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/85" />

      {/* Optional Interactive Studio Overlay when user clicks a paint swatch */}
      {showStudioPreview && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 pt-20 pb-36 animate-in fade-in duration-300">
          <div className="w-full max-w-4xl h-full max-h-[420px] relative">
            <CarVisual
              vehicle={vehicle}
              paint={vehicle.paints[selectedPaintIdx]}
              wheel={vehicle.wheels[0]}
              interior={vehicle.interiors[0]}
              trimId={topTrim.id}
              viewAngle="front"
            />
            <button
              onClick={() => setShowStudioPreview(false)}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white backdrop-blur-md cursor-pointer"
            >
              {lang === "uz" ? "Fon rasmiga qaytish" : "Back to Photo"}
            </button>
          </div>
        </div>
      )}

      {/* Top Heading Content */}
      <div className="relative z-20 pt-24 md:pt-28 text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-zinc-200 mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>{vehicle.subTagline[lang]}</span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white ${
            isCyber ? "tracking-[0.22em] uppercase font-mono" : ""
          }`}
        >
          {vehicle.name}
        </h1>

        <p className="mt-2 text-base sm:text-lg text-zinc-200 font-medium underline decoration-white/40 underline-offset-4">
          {vehicle.tagline[lang]}
        </p>

        {/* Quick Paint Swatch Bar */}
        <div className="mt-4 inline-flex items-center gap-2 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          <span className="text-[11px] text-zinc-300 mr-1">
            {lang === "uz" ? "Rangni sinash:" : "Preview Paint:"}
          </span>
          {vehicle.paints.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPaintIdx(idx);
                setShowStudioPreview(true);
              }}
              title={p.name[lang]}
              className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                selectedPaintIdx === idx && showStudioPreview
                  ? "scale-125 border-white ring-2 ring-blue-400"
                  : "border-white/40 hover:scale-110"
              }`}
              style={{ backgroundColor: p.hex }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Specs + CTA Buttons */}
      <div className="relative z-20 pb-8 md:pb-12 px-4 flex flex-col items-center">
        {/* Key Performance Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-10 mb-7 bg-black/45 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 text-white max-w-3xl w-full">
          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              {maxRange} <span className="text-sm font-normal text-zinc-300">km</span>
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">{t.hero.range}</div>
          </div>

          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              {topTrim.zeroToHundred} <span className="text-sm font-normal text-zinc-300">s</span>
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
              {t.hero.zeroToHundred}
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              {topTrim.topSpeedKmh}{" "}
              <span className="text-sm font-normal text-zinc-300">km/h</span>
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">{t.hero.topSpeed}</div>
          </div>

          <div className="text-center">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-amber-400 hidden sm:inline" />
              {topTrim.peakPowerHp}{" "}
              <span className="text-sm font-normal text-zinc-300">hp</span>
            </div>
            <div className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">{t.hero.peakPower}</div>
          </div>
        </div>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md sm:max-w-xl">
          <Link
            href={`/configure?model=${vehicle.id}`}
            className={`w-full sm:w-64 py-3 px-6 text-sm font-semibold text-center transition-all flex items-center justify-center gap-2 shadow-lg ${
              isCyber
                ? "bg-white text-black hover:bg-zinc-200 rounded-none uppercase tracking-wider"
                : "bg-blue-600 hover:bg-blue-500 text-white rounded-md"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t.hero.orderNow}</span>
          </Link>

          <button
            onClick={() => onOpenDemoDrive(vehicle.id)}
            className={`w-full sm:w-64 py-3 px-6 text-sm font-semibold text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isCyber
                ? "bg-zinc-900/90 hover:bg-zinc-800 text-white border border-white/30 rounded-none uppercase tracking-wider"
                : "bg-white/85 hover:bg-white text-zinc-900 backdrop-blur-md rounded-md"
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>{t.hero.demoDrive}</span>
          </button>
        </div>

        {/* Down Chevron */}
        {onScrollNext && (
          <button
            onClick={onScrollNext}
            aria-label="Scroll to next section"
            className="mt-5 text-white/70 hover:text-white animate-bounce cursor-pointer"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        )}
      </div>
    </section>
  );
}
