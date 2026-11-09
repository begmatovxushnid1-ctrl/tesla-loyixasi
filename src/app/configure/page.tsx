"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Globe,
  Sparkles,
  Shield,
  Zap,
  Eye,
  X,
} from "lucide-react";
import {
  VEHICLES,
  AUTOPILOT_PACKAGES,
  CHARGING_ACCESSORIES,
  VehicleModel,
} from "@/data/teslaData";
import { useLanguage } from "@/context/LanguageContext";
import CarVisual from "@/components/CarVisual";

function ConfiguratorContent() {
  const searchParams = useSearchParams();
  const { lang, setLang, t } = useLanguage();

  const initialModelSlug = searchParams.get("model") || "modely";
  const foundInitial =
    VEHICLES.find((v) => v.id === initialModelSlug) || VEHICLES[0];

  const [vehicle, setVehicle] = useState<VehicleModel>(foundInitial);
  const [trimIdx, setTrimIdx] = useState(0);
  const [paintIdx, setPaintIdx] = useState(0);
  const [wheelIdx, setWheelIdx] = useState(0);
  const [interiorIdx, setInteriorIdx] = useState(0);
  const [autopilotId, setAutopilotId] = useState("basic");
  const [selectedChargers, setSelectedChargers] = useState<string[]>([
    "wall-connector",
  ]);
  const [paymentMode, setPaymentMode] = useState<"cash" | "lease" | "finance">(
    "cash"
  );
  const [viewAngle, setViewAngle] = useState<
    "front" | "side" | "rear" | "interior" | "autopilot"
  >("front");

  // Checkout Modal State
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("Toshkent");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderCode, setOrderCode] = useState("TSLA-UZ-8492");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const paramModel = searchParams.get("model");
    if (paramModel) {
      const matched = VEHICLES.find((v) => v.id === paramModel);
      if (matched && matched.id !== vehicle.id) {
        setVehicle(matched);
        setTrimIdx(0);
        setPaintIdx(0);
        setWheelIdx(0);
        setInteriorIdx(0);
      }
    }
  }, [searchParams, vehicle.id]);

  const handleSelectModel = (newModel: VehicleModel) => {
    setVehicle(newModel);
    setTrimIdx(0);
    setPaintIdx(0);
    setWheelIdx(0);
    setInteriorIdx(0);
    if (viewAngle === "interior" || viewAngle === "autopilot") {
      setViewAngle("front");
    }
  };

  const currentTrim = vehicle.trims[trimIdx] || vehicle.trims[0];
  const currentPaint = vehicle.paints[paintIdx] || vehicle.paints[0];
  const currentWheel = vehicle.wheels[wheelIdx] || vehicle.wheels[0];
  const currentInterior =
    vehicle.interiors[interiorIdx] || vehicle.interiors[0];
  const currentAutopilot =
    AUTOPILOT_PACKAGES.find((a) => a.id === autopilotId) ||
    AUTOPILOT_PACKAGES[0];

  const chargersTotal = CHARGING_ACCESSORIES.filter((c) =>
    selectedChargers.includes(c.id)
  ).reduce((sum, item) => sum + item.price, 0);

  const totalCashPrice =
    currentTrim.price +
    currentPaint.price +
    currentWheel.price +
    currentInterior.price +
    currentAutopilot.price +
    chargersTotal;

  const monthlyLease = Math.round(totalCashPrice * 0.0108);
  const monthlyFinance = Math.round((totalCashPrice * 0.85) / 60);

  const calculatedRangeKm = currentTrim.rangeKm + currentWheel.rangeDeltaKm;

  const toggleCharger = (id: string) => {
    setSelectedChargers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = `TSLA-${vehicle.id.toUpperCase()}-${randomNum}`;
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderCode: generatedCode,
          customerName,
          customerPhone,
          customerCity,
          modelId: vehicle.id,
          modelName: vehicle.name,
          trim: {
            id: currentTrim.id,
            name: currentTrim.name[lang],
            price: currentTrim.price,
          },
          paint: {
            id: currentPaint.id,
            name: currentPaint.name[lang],
            price: currentPaint.price,
            hex: currentPaint.hex,
          },
          wheel: {
            id: currentWheel.id,
            name: currentWheel.name[lang],
            price: currentWheel.price,
            size: currentWheel.size,
          },
          interior: {
            id: currentInterior.id,
            name: currentInterior.name[lang],
            price: currentInterior.price,
          },
          autopilot: {
            id: currentAutopilot.id,
            name: currentAutopilot.name[lang],
            price: currentAutopilot.price,
          },
          chargers: CHARGING_ACCESSORIES.filter((c) => selectedChargers.includes(c.id)).map((c) => ({
            id: c.id,
            name: c.name[lang],
            price: c.price,
          })),
          paymentMode,
          totalPrice: totalCashPrice,
          monthlyEstimate: paymentMode === "lease" ? monthlyLease : paymentMode === "finance" ? monthlyFinance : undefined,
        }),
      });

      const result = await response.json();
      if (result.success && result.data?.orderCode) {
        setOrderCode(result.data.orderCode);
      } else {
        setOrderCode(generatedCode);
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      setOrderCode(generatedCode);
    } finally {
      setIsSubmitting(false);
      setOrderComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Top Studio Header */}
      <header className="sticky top-0 z-40 h-16 px-4 sm:px-8 bg-zinc-950/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t.configurator.backHome}</span>
          </Link>

          <div className="h-4 w-px bg-white/15 hidden sm:block" />

          <Link href="/" aria-label="Tesla Home">
            <svg
              className="h-3 w-24 fill-current text-white"
              viewBox="0 0 342 35"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" />
            </svg>
          </Link>
        </div>

        {/* Center Model Switcher Tabs */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-white/10">
          {VEHICLES.map((m) => (
            <button
              key={m.id}
              onClick={() => handleSelectModel(m)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                vehicle.id === m.id
                  ? "bg-white text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Language Toggle */}
        <div className="flex items-center bg-zinc-900 rounded-full p-0.5 border border-white/15">
          <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-zinc-400" />
          <button
            onClick={() => setLang("uz")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${
              lang === "uz" ? "bg-white text-black" : "text-zinc-400"
            }`}
          >
            UZ
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${
              lang === "en" ? "bg-white text-black" : "text-zinc-400"
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Mobile Model Selector Bar */}
      <div className="md:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 bg-zinc-900/80 border-b border-white/10">
        {VEHICLES.map((m) => (
          <button
            key={m.id}
            onClick={() => handleSelectModel(m)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer ${
              vehicle.id === m.id
                ? "bg-white text-black"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Main Split Studio Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Column: Sticky Interactive Visualizer */}
        <div className="lg:w-[64%] xl:w-[68%] lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex flex-col justify-between p-4 sm:p-8 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
          {/* Top Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
                Tesla Design Studio
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {vehicle.name}{" "}
                <span className="text-zinc-400 font-normal text-lg">
                  — {currentTrim.name[lang]}
                </span>
              </h1>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
              {currentPaint.name[lang]} • {currentWheel.size}
            </div>
          </div>

          {/* Center Vehicle Visualizer */}
          <div className="my-4 flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[360px]">
            <CarVisual
              vehicle={vehicle}
              paint={currentPaint}
              wheel={currentWheel}
              interior={currentInterior}
              trimId={currentTrim.id}
              viewAngle={viewAngle}
            />
          </div>

          {/* Camera Angle Switcher + Telemetry Bar */}
          <div className="space-y-4">
            {/* View Angle Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {(
                ["front", "side", "rear", "interior", "autopilot"] as const
              ).map((angle) => (
                <button
                  key={angle}
                  onClick={() => setViewAngle(angle)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewAngle === angle
                      ? "bg-white text-black border-white shadow-md"
                      : "bg-zinc-900/90 text-zinc-300 border-white/15 hover:border-white/40"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.configurator.viewAngles[angle]}</span>
                </button>
              ))}
            </div>

            {/* Bottom Live Specs & Price Telemetry Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-white">
                  {calculatedRangeKm}{" "}
                  <span className="text-xs font-normal text-zinc-400">km</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  {t.configurator.estRange}
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-white">
                  {currentTrim.topSpeedKmh}{" "}
                  <span className="text-xs font-normal text-zinc-400">
                    km/h
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  {t.configurator.topSpeed}
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-white">
                  {currentTrim.zeroToHundred}{" "}
                  <span className="text-xs font-normal text-zinc-400">s</span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  {t.configurator.zeroToHundred}
                </div>
              </div>

              <div className="hidden sm:block text-center border-l border-white/10 pl-3">
                <div className="text-lg sm:text-2xl font-bold text-blue-400">
                  {paymentMode === "cash" &&
                    `$${totalCashPrice.toLocaleString()}`}
                  {paymentMode === "lease" &&
                    `$${monthlyLease.toLocaleString()}${t.configurator.perMonth}`}
                  {paymentMode === "finance" &&
                    `$${monthlyFinance.toLocaleString()}${t.configurator.perMonth}`}
                </div>
                <div className="text-[11px] text-zinc-400">
                  {t.configurator.orderSummary}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scrollable Configuration Options */}
        <div className="lg:w-[36%] xl:w-[32%] border-l border-white/10 bg-zinc-950 p-6 sm:p-8 space-y-8">
          {/* Payment Mode Selector (Cash / Lease / Finance) */}
          <div className="grid grid-cols-3 bg-zinc-900 p-1 rounded-xl border border-white/10">
            {(["cash", "lease", "finance"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPaymentMode(mode)}
                className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  paymentMode === mode
                    ? "bg-zinc-800 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {t.configurator[mode]}
              </button>
            ))}
          </div>

          {/* 1. Trim Selection */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              {t.configurator.selectTrim}
            </h2>
            <div className="space-y-2.5">
              {vehicle.trims.map((trim, idx) => {
                const isSelected = trimIdx === idx;
                return (
                  <button
                    key={trim.id}
                    onClick={() => setTrimIdx(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600/15 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "bg-zinc-900/70 border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm sm:text-base text-white">
                          {trim.name[lang]}
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5">
                          {trim.drive[lang]} • {trim.rangeKm} km
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm sm:text-base text-white">
                          ${trim.price.toLocaleString()}
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          0-100: {trim.zeroToHundred}s
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Exterior Paint Selection */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                {t.configurator.paintTitle}
              </h2>
              <span className="text-xs text-blue-400 font-medium">
                {currentPaint.price === 0
                  ? t.configurator.included
                  : `+$${currentPaint.price.toLocaleString()}`}
              </span>
            </div>

            <p className="text-sm font-medium text-white">
              {currentPaint.name[lang]}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              {vehicle.paints.map((paint, idx) => {
                const active = paintIdx === idx;
                return (
                  <button
                    key={paint.id}
                    onClick={() => {
                      setPaintIdx(idx);
                      if (viewAngle === "interior" || viewAngle === "autopilot") {
                        setViewAngle("front");
                      }
                    }}
                    className={`w-11 h-11 rounded-full p-0.5 transition-transform cursor-pointer ${
                      active
                        ? "scale-110 ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950"
                        : "opacity-80 hover:opacity-100 hover:scale-105"
                    }`}
                    title={paint.name[lang]}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-white/25 shadow-inner"
                      style={{
                        background: `linear-gradient(135deg, ${paint.hex} 0%, ${paint.secondaryHex} 100%)`,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Wheels Selection */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                {t.configurator.wheelsTitle}
              </h2>
              <span className="text-xs text-blue-400 font-medium">
                {currentWheel.price === 0
                  ? t.configurator.included
                  : `+$${currentWheel.price.toLocaleString()}`}
              </span>
            </div>

            <div className="space-y-2.5">
              {vehicle.wheels.map((wheel, idx) => {
                const active = wheelIdx === idx;
                return (
                  <button
                    key={wheel.id}
                    onClick={() => {
                      setWheelIdx(idx);
                      if (viewAngle === "interior" || viewAngle === "autopilot") {
                        setViewAngle("side");
                      }
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      active
                        ? "bg-blue-600/15 border-blue-500"
                        : "bg-zinc-900/70 border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-white">
                        {wheel.name[lang]}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {t.configurator.estRange}:{" "}
                        <span className="text-zinc-200 font-medium">
                          {currentTrim.rangeKm + wheel.rangeDeltaKm} km
                        </span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-zinc-200">
                      {wheel.price === 0
                        ? t.configurator.included
                        : `+$${wheel.price.toLocaleString()}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Interior Selection */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                {t.configurator.interiorTitle}
              </h2>
              <span className="text-xs text-blue-400 font-medium">
                {currentInterior.price === 0
                  ? t.configurator.included
                  : `+$${currentInterior.price.toLocaleString()}`}
              </span>
            </div>

            <p className="text-sm font-medium text-white">
              {currentInterior.name[lang]}
            </p>

            <div className="flex items-center gap-3 pt-1">
              {vehicle.interiors.map((interior, idx) => {
                const active = interiorIdx === idx;
                return (
                  <button
                    key={interior.id}
                    onClick={() => {
                      setInteriorIdx(idx);
                      setViewAngle("interior");
                    }}
                    className={`w-11 h-11 rounded-full p-0.5 transition-transform cursor-pointer ${
                      active
                        ? "scale-110 ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    title={interior.name[lang]}
                  >
                    <span
                      className="block w-full h-full rounded-full border border-white/30"
                      style={{
                        background: `linear-gradient(135deg, ${interior.hex} 55%, ${interior.accentHex} 100%)`,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Autopilot & Full Self-Driving */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-400" />
                {t.configurator.autopilotTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {AUTOPILOT_PACKAGES.map((pkg) => {
                const active = autopilotId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      setAutopilotId(pkg.id);
                      setViewAngle("autopilot");
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? "bg-blue-600/15 border-blue-500"
                        : "bg-zinc-900/70 border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-sm text-white">
                        {pkg.name[lang]}
                      </div>
                      <div className="text-xs font-semibold text-blue-400 whitespace-nowrap">
                        {pkg.price === 0
                          ? t.configurator.included
                          : `+$${pkg.price.toLocaleString()}`}
                      </div>
                    </div>

                    <ul className="mt-2.5 space-y-1.5 text-xs text-zinc-300">
                      {pkg.features[lang].map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. Charging Equipment */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              {t.configurator.chargingTitle}
            </h2>

            <div className="space-y-2.5">
              {CHARGING_ACCESSORIES.map((item) => {
                const checked = selectedChargers.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCharger(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      checked
                        ? "bg-blue-600/15 border-blue-500"
                        : "bg-zinc-900/70 border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 border ${
                        checked
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-white/30"
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm font-semibold">
                        <span>{item.name[lang]}</span>
                        <span>+${item.price}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        {item.desc[lang]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7. Order Summary & Place Order CTA */}
          <div className="pt-6 border-t border-white/15 space-y-4">
            <h3 className="text-lg font-bold">{t.configurator.orderSummary}</h3>

            <div className="space-y-2 text-xs text-zinc-300 bg-zinc-900/90 p-4 rounded-xl border border-white/10">
              <div className="flex justify-between">
                <span>
                  {vehicle.name} — {currentTrim.name[lang]}
                </span>
                <span className="font-semibold">
                  ${currentTrim.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{currentPaint.name[lang]}</span>
                <span>
                  {currentPaint.price === 0
                    ? t.configurator.included
                    : `+$${currentPaint.price.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{currentWheel.name[lang]}</span>
                <span>
                  {currentWheel.price === 0
                    ? t.configurator.included
                    : `+$${currentWheel.price.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{currentInterior.name[lang]}</span>
                <span>
                  {currentInterior.price === 0
                    ? t.configurator.included
                    : `+$${currentInterior.price.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{currentAutopilot.name[lang]}</span>
                <span>
                  {currentAutopilot.price === 0
                    ? t.configurator.included
                    : `+$${currentAutopilot.price.toLocaleString()}`}
                </span>
              </div>
              {chargersTotal > 0 && (
                <div className="flex justify-between">
                  <span>{t.configurator.chargingTitle}</span>
                  <span>+${chargersTotal.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-3 mt-2 flex justify-between items-baseline text-sm font-bold text-white">
                <span>
                  {paymentMode === "cash"
                    ? t.configurator.cash
                    : paymentMode === "lease"
                    ? t.configurator.lease
                    : t.configurator.finance}
                </span>
                <span className="text-xl text-blue-400">
                  {paymentMode === "cash" &&
                    `$${totalCashPrice.toLocaleString()}`}
                  {paymentMode === "lease" &&
                    `$${monthlyLease.toLocaleString()}${t.configurator.perMonth}`}
                  {paymentMode === "finance" &&
                    `$${monthlyFinance.toLocaleString()}${t.configurator.perMonth}`}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.configurator.estimatedDelivery}</span>
            </p>

            <button
              onClick={() => {
                setOrderComplete(false);
                setCheckoutOpen(true);
              }}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
            >
              {t.configurator.continueToOrder}
            </button>
          </div>
        </div>
      </div>

      {/* Checkout / Reservation Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-zinc-950 border border-white/15 p-6 sm:p-8 text-white shadow-2xl">
            <button
              onClick={() => setCheckoutOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.configurator.orderSuccessTitle}
                </h3>
                <p className="text-xs text-zinc-400">
                  {t.configurator.orderSuccessDesc}
                </p>

                <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">ID:</span>
                    <span className="font-mono font-bold text-blue-400">
                      {orderCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Avtomobil:</span>
                    <span className="font-semibold">
                      {vehicle.name} ({currentTrim.name[lang]})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Rang:</span>
                    <span>{currentPaint.name[lang]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Jami narx:</span>
                    <span className="font-bold text-emerald-400">
                      ${totalCashPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-sm cursor-pointer"
                >
                  {t.configurator.close}
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">
                    {t.configurator.orderModalTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {t.configurator.orderModalSubtitle}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white text-sm">
                      {vehicle.name}
                    </div>
                    <div className="text-zinc-400">
                      {currentTrim.name[lang]} • {currentPaint.name[lang]}
                    </div>
                  </div>
                  <div className="font-bold text-base text-blue-400">
                    ${totalCashPrice.toLocaleString()}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    {t.configurator.fullName}
                  </label>
                  <input
                    required
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Sardor Aliyev"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    {t.configurator.phone}
                  </label>
                  <input
                    required
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 mb-1">
                    {t.configurator.city}
                  </label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Toshkent">Toshkent</option>
                    <option value="Samarqand">Samarqand</option>
                    <option value="Buxoro">Buxoro</option>
                    <option value="Farg'ona">Farg&apos;ona</option>
                    <option value="Namangan">Namangan</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-sm cursor-pointer"
                >
                  {isSubmitting ? (lang === "uz" ? "Saqlanmoqda..." : "Processing...") : t.configurator.confirmOrder}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ConfigurePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center text-sm">
          Loading Tesla Design Studio...
        </div>
      }
    >
      <ConfiguratorContent />
    </Suspense>
  );
}
