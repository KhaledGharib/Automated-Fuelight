import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function PUT(req: NextRequest) {
  try {
    const { ownerId, displayID, data, location, displayName, ipAddress } =
      await req.json();

    const response = await prisma.display.update({
      where: {
        ownerId,
        id: displayID,
      },
      data: {
        data,
        location,
        displayName,
        ipAddress,
      },
    });

    const responseBody = JSON.stringify(response);

    return new Response(responseBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    const errorResponse = { data: error };
    const errorBody = JSON.stringify(errorResponse);

    return new Response(errorBody, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
