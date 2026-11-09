"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, MapPin, User, Phone } from "lucide-react";
import { VEHICLES } from "@/data/teslaData";
import { useLanguage } from "@/context/LanguageContext";

interface DemoDriveModalProps {
  isOpen: boolean;
  initialModelId?: string;
  onClose: () => void;
}

export default function DemoDriveModal({
  isOpen,
  initialModelId = "modely",
  onClose,
}: DemoDriveModalProps) {
  const { lang, t } = useLanguage();
  const [selectedModel, setSelectedModel] = useState(initialModelId);
  const [location, setLocation] = useState("Tashkent City Mall — Tesla Center");
  const [date, setDate] = useState("2026-10-20 14:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/test-drives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: selectedModel,
          location,
          date,
          customerName: name,
          customerPhone: phone,
        }),
      });
      const data = await res.json();
      if (data.success && data.data?.bookingCode) {
        setBookingCode(data.data.bookingCode);
      }
    } catch (err) {
      console.error("Test drive booking failed:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-950 border border-white/15 text-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold">{t.demoModal.successTitle}</h3>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              {t.demoModal.successDesc}
            </p>
            <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-left text-xs space-y-1.5 max-w-sm mx-auto">
              {bookingCode && (
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-zinc-400">Bron ID:</span>
                  <span className="font-mono font-bold text-emerald-400">{bookingCode}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-400">Model:</span>
                <span className="font-semibold text-white uppercase">{selectedModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Manzil / Location:</span>
                <span className="font-semibold text-white">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Vaqt / Time:</span>
                <span className="font-semibold text-blue-400">{date}</span>
              </div>
            </div>
            <button
              onClick={resetAndClose}
              className="mt-4 px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-sm cursor-pointer"
            >
              {t.configurator.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{t.demoModal.title}</h2>
              <p className="text-xs text-zinc-400 mt-1">{t.demoModal.subtitle}</p>
            </div>

            {/* Model Selector Pills */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                {t.demoModal.selectVehicle}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {VEHICLES.map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setSelectedModel(v.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedModel === v.id
                        ? "bg-blue-600/25 border-blue-500 text-white"
                        : "bg-zinc-900 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Showroom Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                <MapPin className="w-3.5 h-3.5 inline mr-1 text-blue-400" />
                {t.demoModal.selectLocation}
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Tashkent City Mall — Tesla Center">
                  Toshkent — Tashkent City Mall Showroom
                </option>
                <option value="Tashkent Sergeli EV Hub">
                  Toshkent — Sergeli EV & Supercharger Hub
                </option>
                <option value="Samarkand Silk Road Center">
                  Samarqand — Silk Road Tesla Lounge
                </option>
                <option value="Dubai Sheikh Zayed Road">
                  Dubai — Sheikh Zayed Road Tesla Center
                </option>
              </select>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-blue-400" />
                {t.demoModal.selectDate}
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  <User className="w-3.5 h-3.5 inline mr-1 text-zinc-400" />
                  {t.demoModal.yourName}
                </label>
                <input
                  required
                  type="text"
                  placeholder={lang === "uz" ? "Sardor Aliyev" : "Alex Mercer"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-zinc-400" />
                  {t.demoModal.yourPhone}
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm transition-colors cursor-pointer mt-2"
            >
              {loading ? (lang === "uz" ? "Yuborilmoqda..." : "Submitting...") : t.demoModal.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
