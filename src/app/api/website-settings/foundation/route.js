import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { registerData, responseData } from '@/utils/message';
import { extractTokenData } from '@/utils/helper';
import { validateFields } from '@/app/api/api-utlis/helper';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const foundations = await prisma.foundations.findMany({ where: { isDeleted: 'N' }, select: { id: true, title: true, description: true } });
        if (foundations) {
            return NextResponse.json({ result: true, message: foundations });
        }
        return NextResponse.json({ result: true, message: {} });
    } catch (error) {
        return NextResponse.json({ result: false, error: error });
    }
};

export async function POST(req) {
    try {
        let userId;
        const token = extractTokenData(req.headers);

        if (!token.id) {
            return NextResponse.json({ result: false, message: { tokenExpired: responseData.tokenExpired } });
        }
        const user = await prisma.user.findUnique({ where: { id: token.id, isDeleted: "N" } });
        if (!user) {
            return NextResponse.json({ result: false, message: { userNotFound: responseData.userNotFound } });
        }
        if (user?.id) { userId = user.id }
        const body = await req.json();
        let { title, description, id } = body;
        const emptyFieldErrors = {};
        if (title.trim() === "") {
            emptyFieldErrors.title = registerData.titleReq;
        }
        if (description.trim() === "") {
            emptyFieldErrors.description = registerData.descriptionReq;
        }

        if (Object.keys(emptyFieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: emptyFieldErrors });
        };
        const fields = { title, description };
        const validatingFields = {
            title: { type: "title", message: registerData.titleFieldVal },
            description: { type: "descriptionXL", message: registerData.descriptionFieldVal },
        };
        let fieldErrors = validateFields(fields, validatingFields);
        if (Object.keys(fieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: fieldErrors });
        };
        const data = { title, description };
        if (id) {
            data.updatedBy = userId;
            await prisma.foundations.update({ where: { id: parseInt(id) }, data })
            return NextResponse.json({ result: true, message: responseData.dataUpdated });
        } else {
            data.createdBy = userId;
            await prisma.foundations.create({ data });
            return NextResponse.json({ result: true, message: responseData.dataCreateded });
        }
    } catch (error) {
        console.log("error:", error);
        return NextResponse.json({ result: false, message: error });
    }
}

export async function PUT(req) {
    try {
        const token = extractTokenData(req.headers);
        if (!token.id) {
            return NextResponse.json({ result: false, message: { tokenExpired: responseData.tokenExpired } });
        }
        const user = await prisma.user.findUnique({ where: { id: token.id, isDeleted: "N" } });
        if (!user) {
            return NextResponse.json({ result: false, message: { userNotFound: responseData.userNotFound } });
        }
        const body = await req.json();
        const { id } = body;
        await prisma.foundations.update({
            where: { id: id },
            data: { isDeleted: 'Y' }
        });
        return NextResponse.json({ result: true, message: responseData.delSuccess })
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
}  
