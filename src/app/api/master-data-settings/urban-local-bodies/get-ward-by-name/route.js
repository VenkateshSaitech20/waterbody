import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateSlug } from '@/utils/helper';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { name } = body;
        let slug = generateSlug(name);
        const wards = await prisma.urban_local_bodies.findMany({
            where: { nameSlug: slug, isDeleted: "N", isActive: 'Y' },
            select: { id: true, ward: true, slug: true }
        });
        // if (ulbDetails && ulbDetails.length > 0) {
        //     const uniqueDetails = Array.from(
        //         new Map(ulbDetails.map(item => [item.nameSlug, item])).values()
        //     );
        //     return NextResponse.json({ result: true, message: uniqueDetails });
        // }
        if (wards) {
            return NextResponse.json({ result: true, message: wards });
        }
    } catch (error) {
        return NextResponse.json({ result: false, error: error });
    }
};
