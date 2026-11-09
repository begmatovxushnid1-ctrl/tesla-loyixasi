import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export interface OrderItem {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerCity: string;
  modelId: string;
  modelName: string;
  trim: {
    id: string;
    name: string;
    price: number;
  };
  paint: {
    id: string;
    name: string;
    price: number;
    hex: string;
  };
  wheel: {
    id: string;
    name: string;
    price: number;
    size: string;
  };
  interior: {
    id: string;
    name: string;
    price: number;
  };
  autopilot: {
    id: string;
    name: string;
    price: number;
  };
  chargers: {
    id: string;
    name: string;
    price: number;
  }[];
  paymentMode: "cash" | "lease" | "finance";
  totalPrice: number;
  monthlyEstimate?: number;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  createdAt: string;
}

export async function GET() {
  const orders = readData<OrderItem[]>("orders.json", []);
  return NextResponse.json({
    success: true,
    count: orders.length,
    data: orders,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.modelId) {
      return NextResponse.json(
        {
          success: false,
          error: "Ism, telefon raqami va avtomobil modeli kiritilishi shart.",
        },
        { status: 400 }
      );
    }

    const orders = readData<OrderItem[]>("orders.json", []);

    const newOrder: OrderItem = {
      id: "ord_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      orderCode: body.orderCode || `TSLA-${body.modelId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerCity: body.customerCity || "Toshkent",
      modelId: body.modelId,
      modelName: body.modelName || body.modelId,
      trim: body.trim || { id: "default", name: "Standard", price: 0 },
      paint: body.paint || { id: "default", name: "Default", price: 0, hex: "#000" },
      wheel: body.wheel || { id: "default", name: "Default", price: 0, size: "19" },
      interior: body.interior || { id: "default", name: "Default", price: 0 },
      autopilot: body.autopilot || { id: "basic", name: "Basic", price: 0 },
      chargers: body.chargers || [],
      paymentMode: body.paymentMode || "cash",
      totalPrice: Number(body.totalPrice) || 0,
      monthlyEstimate: body.monthlyEstimate,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    writeData("orders.json", orders);

    return NextResponse.json({
      success: true,
      message: "Buyurtma muvaffaqiyatli saqlandi!",
      data: newOrder,
    }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
