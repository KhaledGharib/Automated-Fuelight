import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  // return new Response(price);
  try {
    const { name, location, price, ownerId } = await req.json();
    const priceData = {
      ipAddress: name,
      location,
      ownerId,
      data: price,
      isActive: true,
    };

    const createdPrice = await prisma.display.create({ data: priceData });
    return new Response(JSON.stringify({ message: "ok", data: createdPrice }));
  } catch (error) {
    console.error("error in post", error);
    return new Response(JSON.stringify({ data: error }));
  }
}
