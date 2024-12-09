import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteFields } from '@/app/api/api-utlis/helper';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { districtId } = body;
        const taluks = await prisma.taluks.findMany({
            where: { districtId, isDeleted: "N", isActive: 'Y' },
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
                district: true
            }
        });
        if (taluks) {
            deleteFields(taluks, ['createdAt', 'updatedAt', 'updatedUser', "isDeleted"]);
            return NextResponse.json({ result: true, message: taluks });
        }
        return NextResponse.json({ result: true, message: {} });
    } catch (error) {
        return NextResponse.json({ result: false, error: error });
    }
};
