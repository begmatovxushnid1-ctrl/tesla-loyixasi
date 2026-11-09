import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { OrderItem } from "@/app/api/orders/route";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const orders = readData<OrderItem[]>("orders.json", []);
  const order = orders.find((o) => o.id === id || o.orderCode === id);

  if (!order) {
    return NextResponse.json(
      { success: false, error: "Buyurtma topilmadi" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: order });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const orders = readData<OrderItem[]>("orders.json", []);
    const index = orders.findIndex((o) => o.id === id || o.orderCode === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Buyurtma topilmadi" },
        { status: 404 }
      );
    }

    if (body.status) {
      orders[index].status = body.status;
    }

    writeData("orders.json", orders);

    return NextResponse.json({
      success: true,
      message: "Buyurtma holati yangilandi",
      data: orders[index],
    });
  } catch (error) {
    console.error("Order status update error:", error);
    return NextResponse.json(
      { success: false, error: "Serverda xatolik yuz berdi" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const orders = readData<OrderItem[]>("orders.json", []);
  const filtered = orders.filter((o) => o.id !== id && o.orderCode !== id);

  if (filtered.length === orders.length) {
    return NextResponse.json(
      { success: false, error: "Buyurtma topilmadi" },
      { status: 404 }
    );
  }

  writeData("orders.json", filtered);
  return NextResponse.json({
    success: true,
    message: "Buyurtma o'chirildi",
  });
}
