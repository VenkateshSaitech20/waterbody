import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { extractTokenData } from '@/utils/helper';
import { responseData } from '@/utils/message';
const prisma = new PrismaClient();

export async function GET(req) {
    try {
        const token = extractTokenData(req.headers);
        if (!token.id) {
            return NextResponse.json({ result: false, message: { invalidToken: responseData.invalidToken } });
        };
        const panchayats = await prisma.panchayats.findMany({
            where: { districtId: 39, isActive: 'Y', isDeleted: 'N' },
            select: {
                id: true,
                name: true,
                slug: true,
                lgdCode: true,
                block: true,
                blockId: true,
                taluk: true,
                talukId: true,
                district: true,
                districtId: true,
            }
        });
        return NextResponse.json({ result: true, message: panchayats });
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
}
