import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { OrderItem } from "@/app/api/orders/route";
import { DemoDriveBooking } from "@/app/api/test-drives/route";

export async function GET() {
  const orders = readData<OrderItem[]>("orders.json", []);
  const testDrives = readData<DemoDriveBooking[]>("testdrives.json", []);

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalPrice || 0), 0);

  const modelBreakdown: Record<string, number> = {};
  orders.forEach((ord) => {
    modelBreakdown[ord.modelName || ord.modelId] =
      (modelBreakdown[ord.modelName || ord.modelId] || 0) + 1;
  });

  return NextResponse.json({
    success: true,
    data: {
      totalOrders: orders.length,
      totalTestDrives: testDrives.length,
      totalRevenue,
      modelBreakdown,
      recentOrders: orders.slice(0, 5),
      recentTestDrives: testDrives.slice(0, 5),
    },
  });
}
