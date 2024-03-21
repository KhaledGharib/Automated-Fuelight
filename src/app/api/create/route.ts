import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  try {
    const { ownerId, location, ipAddress, data, displayName, lat, lng } =
      await req.json();
    const priceData = {
      ipAddress,
      location,
      ownerId,
      data,
      displayName,
      lat,
      lng,
    };

    const createdPrice = await prisma.display.create({ data: priceData });
    return new Response(
      JSON.stringify({ message: "Created", data: createdPrice })
    );
  } catch (error) {
    console.error("error in post", error);
    return new Response(JSON.stringify({ message: error, data: error }));
  }
}
