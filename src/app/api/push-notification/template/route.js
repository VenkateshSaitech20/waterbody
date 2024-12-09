import { extractTokenData, generateSlug } from '@/utils/helper';
import { NextResponse } from 'next/server';
import { registerData, responseData } from '@/utils/message';
import { PrismaClient } from '@prisma/client';
import { validateFields } from '../../api-utlis/helper';
const prisma = new PrismaClient();

// Create Template
export async function POST(req) {
    try {
        const token = extractTokenData(req.headers);
        if (!token.id) {
            return NextResponse.json({ result: false, message: { tokenExpired: responseData.tokenExpired } });
        }
        const user = await prisma.user.findUnique({ where: { id: token.id, isDeleted: "N" } });
        if (!user) {
            return NextResponse.json({ result: false, message: { userNotFound: responseData.userNotFound } });
        }
        let userId = token.id;
        const body = await req.json();
        const { category, title, message, isActive, id } = body;
        const emptyFieldErrors = {};
        if (category.trim() === "") {
            emptyFieldErrors.category = registerData.categoryReq;
        }
        if (title.trim() === "") {
            emptyFieldErrors.message = registerData.titleReq;
        }
        if (message.trim() === "") {
            emptyFieldErrors.message = registerData.messageReq;
        }
        if (isActive.trim() === "") {
            emptyFieldErrors.isActive = registerData.statusReq;
        }
        if (Object.keys(emptyFieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: emptyFieldErrors });
        };
        let slugCategory = generateSlug(category);
        const isCategoryExist = await prisma.push_notification_templates.findFirst({ where: { createdBy: user.id, slugCategory: slugCategory, isDeleted: "N", ...(id ? { NOT: { id: parseInt(id) } } : {}) } });
        if (isCategoryExist) {
            return NextResponse.json({ result: false, message: { 'category': responseData.categoryAlreadyExist } });
        }
        const fields = { category, title, message, isActive };
        const validatingFields = {
            category: { type: "address", message: registerData.categoryValMsg },
            title: { type: "name", message: registerData.titleFieldVal },
            message: { type: "descriptionXL", message: registerData.messageFieldVal },
        };
        let fieldErrors = validateFields(fields, validatingFields);
        if (Object.keys(fieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: fieldErrors });
        };
        fields.slugCategory = slugCategory;
        if (id) {
            fields.updatedBy = userId;
            const updatedTemplateData = await prisma.push_notification_templates.update({ where: { id: parseInt(id) }, data: fields });
            return NextResponse.json({ result: true, message: updatedTemplateData });
        } else {
            fields.createdBy = userId;
            await prisma.push_notification_templates.create({ data: fields });
            return NextResponse.json({ result: true, message: responseData.templateCreateded });
        }
    }
    catch (error) {
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
        let userId = token.id;
        const body = await req.json();
        const { id } = body;
        await prisma.push_notification_templates.update({
            where: { id: id },
            data: { isDeleted: 'Y', updatedBy: userId }
        });
        return NextResponse.json({ result: true, message: responseData.delSuccess })
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
} 
