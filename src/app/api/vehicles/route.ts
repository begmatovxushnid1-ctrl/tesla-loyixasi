import { NextResponse } from "next/server";
import { VEHICLES } from "@/data/teslaData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("model");

  if (modelId) {
    const vehicle = VEHICLES.find(
      (v) => v.id.toLowerCase() === modelId.toLowerCase()
    );
    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Model topilmadi" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: vehicle });
  }

  return NextResponse.json({
    success: true,
    count: VEHICLES.length,
    data: VEHICLES,
  });
}
