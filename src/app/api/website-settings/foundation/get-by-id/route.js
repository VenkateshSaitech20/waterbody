import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();
        const { id } = body;
        const foundationDetails = await prisma.foundations.findUnique({ where: { id: parseInt(id), isDeleted: "N" }, select: { id: true, title: true, description: true } });
        if (foundationDetails) {
            return NextResponse.json({ result: true, message: foundationDetails });
        }
        return NextResponse.json({ result: true, message: {} });
    } catch (error) {
        return NextResponse.json({ result: false, error: error });
    }
};
