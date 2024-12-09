import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { blockId } = body;
        const panchayats = await prisma.panchayats.findMany({
            where: { blockId, isDeleted: "N", isActive: 'Y' },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                slug: true,
                lgdCode: true,
                countryId: true,
                country: true,
                stateId: true,
                state: true,
                districtId: true,
                district: true,
                talukId: true,
                taluk: true,
                blockId: true,
                block: true
            }
        });
        if (panchayats) {
            return NextResponse.json({ result: true, message: panchayats });
        }
        return NextResponse.json({ result: true, message: {} });
    } catch (error) {
        return NextResponse.json({ result: false, error: error });
    }
};
