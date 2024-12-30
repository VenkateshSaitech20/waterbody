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
        const blocks = await prisma.block.findMany({
            where: { districtId: 39, isActive: 'Y', isDeleted: 'N' },
            select: {
                id: true,
                name: true,
                slug: true,
                lgdCode: true,
                taluk: true,
                talukId: true,
                district: true,
                districtId: true,
            }
        });
        return NextResponse.json({ result: true, message: blocks });
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
}
