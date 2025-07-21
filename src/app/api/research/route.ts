import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const reasearchData = await prisma.research.findMany({
        
    })
  } catch (error: any) {
    console.log({
      message: error.message,
      stack: error.stack,
      function: "GET FindManny",
    });
  }
}
