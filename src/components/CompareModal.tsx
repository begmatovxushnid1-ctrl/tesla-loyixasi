"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { VEHICLES } from "@/data/teslaData";
import { useLanguage } from "@/context/LanguageContext";
import CarVisual from "./CarVisual";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareModal({ isOpen, onClose }: CompareModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-white/15 text-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">{t.compare.title}</h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">{t.compare.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {VEHICLES.map((v) => {
            const topTrim = v.trims[v.trims.length - 1];
            const maxRange = Math.max(...v.trims.map((tr) => tr.rangeKm));

            return (
              <div
                key={v.id}
                className="rounded-xl bg-zinc-900/90 border border-white/10 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="h-28 w-full mb-3 rounded-lg overflow-hidden">
                    <CarVisual
                      vehicle={v}
                      paint={v.paints[0]}
                      wheel={v.wheels[0]}
                      interior={v.interiors[0]}
                      trimId={topTrim.id}
                      compact
                    />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">{v.name}</h3>
                  <div className="text-xs text-blue-400 font-medium mb-4">
                    ${v.startingPrice.toLocaleString()}
                  </div>

                  <div className="space-y-3 text-xs border-t border-white/10 pt-3">
                    <div>
                      <div className="text-zinc-400">{t.compare.maxRange}</div>
                      <div className="text-sm font-semibold text-white">{maxRange} km</div>
                    </div>
                    <div>
                      <div className="text-zinc-400">{t.compare.acceleration}</div>
                      <div className="text-sm font-semibold text-white">
                        {topTrim.zeroToHundred} s
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-400">{t.compare.topSpeed}</div>
                      <div className="text-sm font-semibold text-white">
                        {topTrim.topSpeedKmh} km/h
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-400">{t.compare.peakPower}</div>
                      <div className="text-sm font-semibold text-white">
                        {topTrim.peakPowerHp} hp
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-400">{t.compare.cargo}</div>
                      <div className="text-sm font-semibold text-white">
                        {v.cargoLiters} L
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-400">{t.compare.seating}</div>
                      <div className="text-sm font-semibold text-white">{v.seating}</div>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/configure?model=${v.id}`}
                  onClick={onClose}
                  className="mt-5 w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{t.compare.configureModel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
