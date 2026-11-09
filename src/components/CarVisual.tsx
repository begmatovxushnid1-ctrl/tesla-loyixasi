"use client";

import React from "react";
import { InteriorOption, PaintOption, VehicleModel, WheelOption } from "@/data/teslaData";

interface CarVisualProps {
  vehicle: VehicleModel;
  paint: PaintOption;
  wheel: WheelOption;
  interior: InteriorOption;
  trimId: string;
  viewAngle?: "front" | "side" | "rear" | "interior" | "autopilot";
  compact?: boolean;
}

export default function CarVisual({
  vehicle,
  paint,
  wheel,
  interior,
  trimId,
  viewAngle = "front",
  compact = false,
}: CarVisualProps) {
  const isPerformance =
    trimId === "performance" || trimId === "plaid" || trimId === "cyberbeast";
  const isCybertruck = vehicle.bodyStyle === "cybertruck";
  const isSUV = vehicle.bodyStyle === "suv";

  // Render Wheel Spokes based on wheel.style
  const renderWheel = (cx: number, cy: number, r: number) => {
    return (
      <g key={`${cx}-${cy}`}>
        {/* Outer Tire */}
        <circle cx={cx} cy={cy} r={r + 8} fill="#121316" stroke="#262930" strokeWidth="3" />
        {/* Tire tread subtle ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r + 4}
          fill="none"
          stroke="#1e2026"
          strokeWidth="2"
          strokeDasharray={isCybertruck ? "8 4" : "none"}
        />
        {/* Rim Base */}
        <circle cx={cx} cy={cy} r={r} fill="#1b1d22" stroke="#525866" strokeWidth="2" />

        {/* Brake Disc & Red Performance Caliper */}
        <circle cx={cx} cy={cy} r={r * 0.68} fill="none" stroke="#3c4049" strokeWidth="4" />
        {isPerformance && (
          <path
            d={`M ${cx - r * 0.55} ${cy - r * 0.35} A ${r * 0.65} ${r * 0.65} 0 0 1 ${
              cx - r * 0.2
            } ${cy - r * 0.62}`}
            stroke="#e82127"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Spokes by style */}
        {wheel.style === "aero" && (
          <g stroke="#7c8494" strokeWidth="4">
            {[0, 51, 102, 153, 204, 255, 306].map((deg) => (
              <line
                key={deg}
                x1={cx}
                y1={cy}
                x2={cx + r * 0.92 * Math.cos((deg * Math.PI) / 180)}
                y2={cy + r * 0.92 * Math.sin((deg * Math.PI) / 180)}
              />
            ))}
            <circle cx={cx} cy={cy} r={r * 0.45} fill="#282b33" stroke="#636978" strokeWidth="2" />
          </g>
        )}

        {wheel.style === "sport" && (
          <g stroke="#9ea6b8" strokeWidth="3">
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <line
                key={deg}
                x1={cx}
                y1={cy}
                x2={cx + r * 0.95 * Math.cos((deg * Math.PI) / 180)}
                y2={cy + r * 0.95 * Math.sin((deg * Math.PI) / 180)}
              />
            ))}
          </g>
        )}

        {(wheel.style === "uberturbine" || wheel.style === "arachnid") && (
          <g stroke="#2f333d" strokeWidth="3.5">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1={cx + r * 0.2 * Math.cos(((deg - 15) * Math.PI) / 180)}
                y1={cy + r * 0.2 * Math.sin(((deg - 15) * Math.PI) / 180)}
                x2={cx + r * 0.95 * Math.cos((deg * Math.PI) / 180)}
                y2={cy + r * 0.95 * Math.sin((deg * Math.PI) / 180)}
              />
            ))}
          </g>
        )}

        {wheel.style === "cyber" && (
          <g>
            <polygon
              points={[0, 51, 102, 153, 204, 255, 306]
                .map(
                  (deg) =>
                    `${cx + r * 0.85 * Math.cos((deg * Math.PI) / 180)},${
                      cy + r * 0.85 * Math.sin((deg * Math.PI) / 180)
                    }`
                )
                .join(" ")}
              fill="#202227"
              stroke="#555b66"
              strokeWidth="2.5"
            />
          </g>
        )}

        {/* Center Hub Cap */}
        <circle cx={cx} cy={cy} r={6} fill="#141518" stroke="#8e96a8" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={2} fill="#e82127" />
      </g>
    );
  };

  if (viewAngle === "interior") {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#0b0d13] via-[#131722] to-[#0a0b0e] p-4">
        <svg viewBox="0 0 900 500" className="w-full h-full max-h-[440px] drop-shadow-2xl">
          <defs>
            <linearGradient id="skyWindshield" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="seatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={interior.hex} />
              <stop offset="100%" stopColor={interior.accentHex} />
            </linearGradient>
          </defs>

          {/* Panoramic Glass Roof & Windshield */}
          <path
            d="M 80 40 L 820 40 L 880 280 L 20 280 Z"
            fill="url(#skyWindshield)"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Highway Perspective Lines through Windshield */}
          <path d="M 450 150 L 220 280" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" />
          <path d="M 450 150 L 680 280" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.4" />
          <path
            d="M 450 150 L 450 280"
            stroke="#f8fafc"
            strokeWidth="2"
            strokeDasharray="10 10"
            strokeOpacity="0.35"
          />

          {/* Minimalist Full-Width Dashboard & Ambient LED Strip */}
          <path
            d="M 10 275 Q 450 255 890 275 L 900 370 L 0 370 Z"
            fill="#14161b"
            stroke="#2a2e39"
            strokeWidth="2"
          />
          {/* Ambient Light Bar */}
          <path
            d="M 25 282 Q 450 264 875 282"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            className="animate-pulse"
          />
          {/* Dashboard Trim Wood / Alcantara / White Decor */}
          <path
            d="M 40 292 Q 450 276 860 292 L 850 318 Q 450 304 50 318 Z"
            fill={interior.hex}
            opacity="0.9"
          />

          {/* Left & Right Sculpted Seats */}
          <path
            d="M 70 490 L 110 350 Q 190 330 270 350 L 310 490 Z"
            fill="url(#seatGrad)"
            stroke="#3f4454"
            strokeWidth="2"
          />
          <path
            d="M 590 490 L 630 350 Q 710 330 790 350 L 830 490 Z"
            fill="url(#seatGrad)"
            stroke="#3f4454"
            strokeWidth="2"
          />

          {/* Steering Wheel (Yoke for Plaid / Cybertruck, Round for 3/Y) */}
          {vehicle.id === "models" || vehicle.id === "modelx" || isCybertruck ? (
            <g transform="translate(230, 315)">
              {/* Yoke Steering */}
              <rect
                x="-75"
                y="-32"
                width="150"
                height="68"
                rx="18"
                fill="none"
                stroke="#0f1014"
                strokeWidth="14"
              />
              <rect
                x="-75"
                y="-32"
                width="150"
                height="20"
                rx="8"
                fill="#13161c"
                opacity="0.15"
              />
              <rect x="-28" y="-12" width="56" height="32" rx="8" fill="#181a20" stroke="#333842" />
              <line x1="-70" y1="6" x2="-28" y2="6" stroke="#181a20" strokeWidth="12" />
              <line x1="28" y1="6" x2="70" y2="6" stroke="#181a20" strokeWidth="12" />
            </g>
          ) : (
            <g transform="translate(230, 315)">
              <circle cx="0" cy="0" r="64" fill="none" stroke="#111318" strokeWidth="14" />
              <circle cx="0" cy="4" r="22" fill="#1b1e26" stroke="#323744" strokeWidth="2" />
              <line x1="-60" y1="4" x2="-20" y2="4" stroke="#181a20" strokeWidth="11" />
              <line x1="20" y1="4" x2="60" y2="4" stroke="#181a20" strokeWidth="11" />
              <line x1="0" y1="24" x2="0" y2="60" stroke="#181a20" strokeWidth="11" />
            </g>
          )}

          {/* Center 15.4" / 18.5" Tesla Touchscreen Display */}
          <g transform="translate(450, 310)">
            <rect
              x="-135"
              y="-78"
              width="270"
              height="162"
              rx="10"
              fill="#0b0e14"
              stroke="#475569"
              strokeWidth="4"
            />
            {/* FSD Visualization side of screen (Left) */}
            <rect x="-129" y="-72" width="95" height="150" rx="6" fill="#111827" />
            {/* Mini road & ego car */}
            <line x1="-105" y1="70" x2="-88" y2="-40" stroke="#38bdf8" strokeWidth="2" />
            <line x1="-58" y1="70" x2="-75" y2="-40" stroke="#38bdf8" strokeWidth="2" />
            <rect x="-90" y="20" width="16" height="30" rx="4" fill={paint.hex} />
            <text x="-120" y="-52" fill="#f8fafc" fontSize="14" fontWeight="bold">
              {isPerformance ? "P  D  R" : "D  92 km/h"}
            </text>
            <text x="-120" y="-36" fill="#38bdf8" fontSize="9">
              Autopilot Active
            </text>

            {/* Navigation Map side of screen (Right) */}
            <rect x="-30" y="-72" width="159" height="150" rx="6" fill="#0f172a" />
            {/* Map grid & route */}
            <path
              d="M -10 60 Q 30 10 55 -20 T 105 -55"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
            />
            <circle cx="105" cy="-55" r="5" fill="#ef4444" />
            <text x="-18" y="-50" fill="#94a3b8" fontSize="10">
              Tashkent Supercharger • 84%
            </text>
            {/* Bottom climate dock */}
            <rect x="-129" y="58" width="258" height="20" fill="#090b10" />
            <text x="-10" y="72" fill="#e2e8f0" fontSize="10" textAnchor="middle">
              21.5°C   •   🎵 Spotify   •   🔋 {vehicle.trims[0].rangeKm} km
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (viewAngle === "autopilot") {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#070b14] p-4">
        <svg viewBox="0 0 900 500" className="w-full h-full max-h-[440px]">
          <defs>
            <radialGradient id="radarPulse" cx="50%" cy="65%" r="55%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#1d4ed8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#070b14" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Radar / Vision Dome */}
          <ellipse cx="450" cy="330" rx="390" ry="150" fill="url(#radarPulse)" />
          <ellipse
            cx="450"
            cy="330"
            rx="290"
            ry="105"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            opacity="0.5"
          />
          <ellipse
            cx="450"
            cy="330"
            rx="190"
            ry="68"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* 3D Neural Net Highway Lanes */}
          <path d="M 380 80 L 140 480" stroke="#334155" strokeWidth="2" />
          <path d="M 425 80 L 290 480" stroke="#38bdf8" strokeWidth="4" />
          <path d="M 475 80 L 610 480" stroke="#38bdf8" strokeWidth="4" />
          <path d="M 520 80 L 760 480" stroke="#334155" strokeWidth="2" />

          {/* Planned Path Carpet */}
          <polygon
            points="430,110 470,110 585,460 315,460"
            fill="#3b82f6"
            fillOpacity="0.18"
          />

          {/* Detected Surrounding Vehicles (Bounding Boxes) */}
          <g transform="translate(450, 145)">
            <rect
              x="-28"
              y="-18"
              width="56"
              height="36"
              rx="6"
              fill="#1e293b"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <text x="0" y="-24" fill="#38bdf8" fontSize="10" textAnchor="middle">
              95 km/h • 42m
            </text>
          </g>

          <g transform="translate(275, 235)">
            <rect
              x="-32"
              y="-22"
              width="64"
              height="44"
              rx="6"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="2"
            />
            <text x="0" y="-28" fill="#94a3b8" fontSize="10" textAnchor="middle">
              Lane 1 • 88 km/h
            </text>
          </g>

          {/* Ego Tesla Car (Top-down 3D perspective) */}
          <g transform="translate(450, 345)">
            <rect
              x="-44"
              y="-75"
              width="88"
              height="150"
              rx={isCybertruck ? "4" : "24"}
              fill={paint.hex}
              stroke="#f8fafc"
              strokeWidth="2"
            />
            {/* Glass Roof */}
            <rect
              x="-34"
              y="-38"
              width="68"
              height="82"
              rx={isCybertruck ? "2" : "12"}
              fill="#0f172a"
            />
          </g>

          {/* HUD Overlay */}
          <rect
            x="30"
            y="24"
            width="250"
            height="74"
            rx="10"
            fill="#0f172a"
            stroke="#1e293b"
            strokeWidth="1.5"
          />
          <text x="48" y="48" fill="#38bdf8" fontSize="12" fontWeight="bold">
            TESLA VISION NEURAL NET V13
          </text>
          <text x="48" y="68" fill="#cbd5e1" fontSize="11">
            8 Cameras • 360° Vector Space
          </text>
          <text x="48" y="84" fill="#22c55e" fontSize="10">
            ● Full Self-Driving Ready
          </text>
        </svg>
      </div>
    );
  }

  // Exterior Views: Front / Side / Rear
  const scaleRotate =
    viewAngle === "rear" ? "scale(-1, 1)" : viewAngle === "front" ? "scale(1.03)" : "scale(1)";

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden rounded-2xl ${
        compact
          ? "bg-gradient-to-b from-zinc-900 to-zinc-950 p-2"
          : "bg-gradient-to-b from-[#14171f] via-[#1d222d] to-[#0d0f14] p-4"
      }`}
    >
      {/* Subtle Studio Horizon Spotlight */}
      {!compact && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 52%, ${paint.hex}55 0%, transparent 65%)`,
          }}
        />
      )}

      <svg
        viewBox="0 0 800 360"
        className="w-full h-auto max-h-[380px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-transform duration-500"
      >
        <defs>
          <linearGradient id={`bodyGrad-${vehicle.id}-${paint.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={paint.hex} />
            <stop offset="55%" stopColor={paint.hex} />
            <stop offset="100%" stopColor={paint.secondaryHex} />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090c12" />
          </linearGradient>
        </defs>

        {/* Floor Shadow */}
        <ellipse cx="400" cy="296" rx="310" ry="18" fill="#050608" opacity="0.85" />
        <ellipse cx="400" cy="296" rx="220" ry="8" fill={paint.hex} opacity="0.18" />

        <g transform="translate(400, 180)">
          <g transform={scaleRotate}>
            <g transform="translate(-400, -180)">
              {isCybertruck ? (
                /* CYBERTRUCK ANGULAR EXOSKELETON */
                <g>
                  {/* Main Stainless Wedge Silhouette */}
                  <polygon
                    points="95,225 220,175 395,112 695,165 710,248 635,258 145,258 88,242"
                    fill={`url(#bodyGrad-${vehicle.id}-${paint.id})`}
                    stroke="#8e95a2"
                    strokeWidth="2"
                  />
                  {/* Angular Side Crease Line */}
                  <line
                    x1="95"
                    y1="220"
                    x2="702"
                    y2="190"
                    stroke="#ffffff"
                    strokeOpacity="0.35"
                    strokeWidth="2"
                  />
                  {/* Armor Glass Cabin */}
                  <polygon
                    points="238,173 395,120 558,148 545,186 232,192"
                    fill="url(#glassGrad)"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                  {/* B-Pillar */}
                  <line x1="400" y1="121" x2="395" y2="190" stroke="#1e293b" strokeWidth="5" />
                  {/* Lower Rocker Cladding */}
                  <polygon
                    points="135,248 655,248 665,264 125,264"
                    fill="#141619"
                  />
                  {/* Cybertruck Full-Width LED Lightbar (Front & Rear) */}
                  <line
                    x1="92"
                    y1="222"
                    x2="132"
                    y2="215"
                    stroke="#e0f2fe"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <line
                    x1="696"
                    y1="168"
                    x2="707"
                    y2="195"
                    stroke="#ef4444"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Trapezoidal Wheel Arches */}
                  <polygon points="150,262 172,198 258,198 278,262" fill="#090a0d" />
                  <polygon points="522,262 544,198 630,198 650,262" fill="#090a0d" />
                </g>
              ) : isSUV ? (
                /* MODEL Y / MODEL X SUV SILHOUETTE */
                <g>
                  {/* Sculpted SUV Body */}
                  <path
                    d="M 98 232 Q 105 190 195 176 L 305 118 Q 415 95 545 122 L 668 168 Q 708 188 705 242 L 665 256 L 135 256 Z"
                    fill={`url(#bodyGrad-${vehicle.id}-${paint.id})`}
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1.5"
                  />
                  {/* Greenhouse Windows */}
                  <path
                    d="M 218 174 L 312 126 Q 415 106 528 128 L 622 168 Q 450 176 218 174 Z"
                    fill="url(#glassGrad)"
                    stroke={interior.hex}
                    strokeWidth="2"
                  />
                  {/* Pillars */}
                  <line x1="365" y1="115" x2="355" y2="175" stroke="#111318" strokeWidth="6" />
                  <line x1="505" y1="124" x2="495" y2="173" stroke="#111318" strokeWidth="5" />
                  {/* Specular Character Line */}
                  <path
                    d="M 130 205 Q 400 192 680 196"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.28"
                    strokeWidth="2"
                  />
                  {/* Flush Door Handles */}
                  <rect x="315" y="192" width="24" height="4" rx="2" fill="#1e2028" />
                  <rect x="455" y="190" width="24" height="4" rx="2" fill="#1e2028" />
                  {/* Carbon Spoiler on Performance/Plaid */}
                  {isPerformance && (
                    <path
                      d="M 658 164 L 696 158 L 690 168 Z"
                      fill="#141519"
                      stroke="#ef4444"
                      strokeWidth="1"
                    />
                  )}
                  {/* Matrix LED Headlight & Taillight */}
                  <path
                    d="M 102 212 Q 130 202 158 206"
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 668 182 Q 692 184 702 196"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Wheel Wells */}
                  <circle cx="215" cy="252" r="56" fill="#08090c" />
                  <circle cx="585" cy="252" r="56" fill="#08090c" />
                </g>
              ) : (
                /* MODEL 3 / MODEL S SLEEK FASTBACK SEDAN SILHOUETTE */
                <g>
                  <path
                    d="M 92 238 Q 102 198 205 184 L 325 134 Q 430 116 555 140 L 678 178 Q 708 192 704 244 L 665 256 L 130 256 Z"
                    fill={`url(#bodyGrad-${vehicle.id}-${paint.id})`}
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1.5"
                  />
                  {/* Fastback Glass Canopy */}
                  <path
                    d="M 225 182 L 330 140 Q 430 124 538 144 L 625 178 Q 430 184 225 182 Z"
                    fill="url(#glassGrad)"
                    stroke={interior.hex}
                    strokeWidth="2"
                  />
                  {/* B-Pillar */}
                  <line x1="382" y1="133" x2="372" y2="183" stroke="#111318" strokeWidth="6" />
                  <line x1="512" y1="140" x2="502" y2="181" stroke="#111318" strokeWidth="5" />
                  {/* Character Highlight Line */}
                  <path
                    d="M 125 212 Q 400 200 682 202"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.28"
                    strokeWidth="2"
                  />
                  {/* Flush Door Handles */}
                  <rect x="328" y="198" width="24" height="4" rx="2" fill="#1e2028" />
                  <rect x="462" y="196" width="24" height="4" rx="2" fill="#1e2028" />
                  {/* Carbon Fiber Lip Spoiler for Performance / Plaid */}
                  {isPerformance && (
                    <path
                      d="M 665 174 L 702 168 L 696 178 Z"
                      fill="#141519"
                      stroke="#ef4444"
                      strokeWidth="1"
                    />
                  )}
                  {/* Highland / Plaid Razor LED Headlight & Taillight */}
                  <path
                    d="M 98 218 Q 132 208 164 212"
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 672 188 Q 695 190 702 202"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Wheel Wells */}
                  <circle cx="215" cy="252" r="54" fill="#08090c" />
                  <circle cx="585" cy="252" r="54" fill="#08090c" />
                </g>
              )}

              {/* Render Front & Rear Wheels */}
              {renderWheel(215, 252, isCybertruck ? 44 : 42)}
              {renderWheel(585, 252, isCybertruck ? 44 : 42)}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
