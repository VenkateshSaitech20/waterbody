import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { deleteFields } from '@/app/api/api-utlis/helper';
const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const body = await req.json();
        const { countryId } = body;
        const stateDetails = await prisma.state.findMany({
            where: { countryId, isDeleted: "N", isActive: 'Y' },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                lgdCode: true,
                countryId: true,
                country: true
            }
        });
        if (stateDetails) {
            deleteFields(stateDetails, ['createdAt', 'updatedAt', 'updatedUser', "isDeleted"]);
            return NextResponse.json({ result: true, message: stateDetails });
        }
        return NextResponse.json({ result: true, message: {} });
    } catch (error) {
        console.log("error:", error);
        return NextResponse.json({ result: false, error: error });
    }
};
