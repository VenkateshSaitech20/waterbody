import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { id } = body;
        const ulbDetails = await prisma.urban_local_bodies.findMany({
            where: { jurisdictionId: parseInt(id), isDeleted: "N", isActive: 'Y' },
            select: { id: true, name: true, nameSlug: true }
        });
        if (ulbDetails && ulbDetails.length > 0) {
            const uniqueDetails = Array.from(
                new Map(ulbDetails.map(item => [item.nameSlug, item])).values()
            );
            return NextResponse.json({ result: true, message: uniqueDetails });
        }
        return NextResponse.json({ result: true, message: [] });
    } catch (error) {
        return NextResponse.json({ result: false, error: error });
    }
};
