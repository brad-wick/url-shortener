import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const urls = await prisma.url.findMany({
            orderBy: { createdAt: "desc" },
            take: 5
        })
        return NextResponse.json(urls)
    } catch (error) {
        console.error("Error getting the URLs", error)
        return NextResponse.json({ error }, { status: 500 })
    }
}