import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export interface DemoDriveBooking {
  id: string;
  bookingCode: string;
  modelId: string;
  location: string;
  date: string;
  customerName: string;
  customerPhone: string;
  status: "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

export async function GET() {
  const bookings = readData<DemoDriveBooking[]>("testdrives.json", []);
  return NextResponse.json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.modelId) {
      return NextResponse.json(
        {
          success: false,
          error: "Ism, telefon raqami va avtomobil modeli ko'rsatilishi lozim.",
        },
        { status: 400 }
      );
    }

    const bookings = readData<DemoDriveBooking[]>("testdrives.json", []);

    const newBooking: DemoDriveBooking = {
      id: "td_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      bookingCode: `DRIVE-${Math.floor(1000 + Math.random() * 9000)}`,
      modelId: body.modelId,
      location: body.location || "Tashkent City Mall — Tesla Center",
      date: body.date || new Date().toISOString().slice(0, 16).replace("T", " "),
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    writeData("testdrives.json", bookings);

    return NextResponse.json({
      success: true,
      message: "Test Drayv muvaffaqiyatli band qilindi!",
      data: newBooking,
    }, { status: 201 });
  } catch (error) {
    console.error("Test drive booking error:", error);
    return NextResponse.json(
      { success: false, error: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}
