"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Calendar,
  DollarSign,
  Car,
  Clock,
  CheckCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { OrderItem } from "@/app/api/orders/route";
import { DemoDriveBooking } from "@/app/api/test-drives/route";

interface StatsData {
  totalOrders: number;
  totalTestDrives: number;
  totalRevenue: number;
  modelBreakdown: Record<string, number>;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "testdrives">("orders");
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [testDrives, setTestDrives] = useState<DemoDriveBooking[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordRes, tdRes, statsRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/test-drives"),
        fetch("/api/stats"),
      ]);
      const ordData = await ordRes.json();
      const tdData = await tdRes.json();
      const stData = await statsRes.json();

      if (ordData.success) setOrders(ordData.data);
      if (tdData.success) setTestDrives(tdData.data);
      if (stData.success) setStats(stData.data);
    } catch (e) {
      console.error("Failed to load admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Ushbu buyurtmani o'chirishni tasdiqlaysizmi?")) return;
    try {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
                Tesla Boshqaruv Paneli
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
            </div>
          </div>

          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 border border-white/15 hover:bg-zinc-800 text-sm font-medium transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Yangilash</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-zinc-900/90 border border-white/10 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Jami Buyurtmalar</div>
              <div className="text-2xl font-bold text-white">
                {stats?.totalOrders ?? orders.length}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-900/90 border border-white/10 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Test Drayv Bronlari</div>
              <div className="text-2xl font-bold text-white">
                {stats?.totalTestDrives ?? testDrives.length}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-zinc-900/90 border border-white/10 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-zinc-400">Umumiy Buyurtma Summasi</div>
              <div className="text-2xl font-bold text-white">
                ${(stats?.totalRevenue ?? 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 gap-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyurtmalar ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("testdrives")}
            className={`pb-3 text-sm font-semibold border-b-2 transition cursor-pointer flex items-center gap-2 ${
              activeTab === "testdrives"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Test Drayvlar ({testDrives.length})</span>
          </button>
        </div>

        {/* Content Table / Cards */}
        {activeTab === "orders" ? (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 bg-zinc-900/40 rounded-2xl border border-white/10">
                Hozircha hech qanday buyurtma mavjud emas. Konfiguratordan yangi buyurtma berib ko'ring!
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/50">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-zinc-900/90 text-xs uppercase text-zinc-400 border-b border-white/10">
                    <tr>
                      <th className="px-5 py-4">ID & Sana</th>
                      <th className="px-5 py-4">Mijoz</th>
                      <th className="px-5 py-4">Model & Komplektatsiya</th>
                      <th className="px-5 py-4">Summa</th>
                      <th className="px-5 py-4">Holat</th>
                      <th className="px-5 py-4 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-zinc-900/80 transition">
                        <td className="px-5 py-4">
                          <div className="font-mono font-bold text-blue-400">{ord.orderCode}</div>
                          <div className="text-xs text-zinc-500">
                            {new Date(ord.createdAt).toLocaleDateString()} {new Date(ord.createdAt).toLocaleTimeString().slice(0, 5)}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium text-white">{ord.customerName}</div>
                          <div className="text-xs text-zinc-400">{ord.customerPhone}</div>
                          <div className="text-xs text-zinc-500">{ord.customerCity}</div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-semibold text-white">{ord.modelName}</div>
                          <div className="text-xs text-zinc-400">
                            {ord.trim?.name} • {ord.paint?.name}
                          </div>
                          <div className="text-xs text-zinc-500">
                            Disk: {ord.wheel?.name} ({ord.wheel?.size})
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-emerald-400">
                            ${ord.totalPrice.toLocaleString()}
                          </div>
                          <div className="text-xs text-zinc-400 uppercase">{ord.paymentMode}</div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-zinc-800 border border-white/15 text-white focus:outline-none"
                          >
                            <option value="pending">Kutilmoqda (Pending)</option>
                            <option value="confirmed">Tasdiqlangan</option>
                            <option value="delivered">Yetkazildi</option>
                            <option value="cancelled">Bekor qilindi</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {testDrives.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 bg-zinc-900/40 rounded-2xl border border-white/10">
                Hozircha hech qanday test drayv bron qilinmagan.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/50">
                <table className="w-full text-left text-sm text-zinc-300">
                  <thead className="bg-zinc-900/90 text-xs uppercase text-zinc-400 border-b border-white/10">
                    <tr>
                      <th className="px-5 py-4">Bron ID</th>
                      <th className="px-5 py-4">Mijoz</th>
                      <th className="px-5 py-4">Model</th>
                      <th className="px-5 py-4">Shourum Manzili</th>
                      <th className="px-5 py-4">Vaqti</th>
                      <th className="px-5 py-4">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {testDrives.map((td) => (
                      <tr key={td.id} className="hover:bg-zinc-900/80 transition">
                        <td className="px-5 py-4 font-mono font-bold text-emerald-400">
                          {td.bookingCode}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium text-white">{td.customerName}</div>
                          <div className="text-xs text-zinc-400">{td.customerPhone}</div>
                        </td>
                        <td className="px-5 py-4 font-semibold text-white uppercase">
                          {td.modelId}
                        </td>
                        <td className="px-5 py-4 text-zinc-300">{td.location}</td>
                        <td className="px-5 py-4 text-blue-400 font-medium">{td.date}</td>
                        <td className="px-5 py-4">
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                            {td.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
