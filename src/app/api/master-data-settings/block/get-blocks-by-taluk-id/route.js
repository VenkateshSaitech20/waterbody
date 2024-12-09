import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteFields } from '@/app/api/api-utlis/helper';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { talukId } = body;
        const blocks = await prisma.block.findMany({
            where: { talukId, isDeleted: "N", isActive: 'Y' },
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
                taluk: true
            }
        });
        if (blocks) {
            deleteFields(blocks, ['createdAt', 'updatedAt', 'updatedUser', "isDeleted"]);
            return NextResponse.json({ result: true, message: blocks });
        }
        return NextResponse.json({ result: true, message: {} });
    } catch (error) {
        return NextResponse.json({ result: false, error: error });
    }
};
