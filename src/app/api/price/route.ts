import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  // return new Response(price);
  try {
    const { displayName, displayLocation, displayPrice, ownerId } =
      await req.json();
    const priceData = {
      ipAddress: displayName,
      location: displayLocation,
      ownerId,
      data: displayPrice,
    };

    const createdPrice = await prisma.display.create({ data: priceData });
    return new Response(JSON.stringify({ message: "ok", data: createdPrice }));
  } catch (error) {
    console.error("error in post", error);
    return new Response(JSON.stringify({ data: error }));
  }
}
