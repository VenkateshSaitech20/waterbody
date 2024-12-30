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
        const urban_local_bodies = await prisma.urban_local_bodies.findMany({
            where: { isActive: 'Y', isDeleted: 'N' },
            select: {
                id: true,
                name: true,
                nameSlug: true,
                jurisdiction: true,
                jurisdictionId: true,
                wardCode: true,
                ward: true,
                slug: true,
            }
        });
        return NextResponse.json({ result: true, message: urban_local_bodies });
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
}
