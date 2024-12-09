import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { registerData, responseData } from '@/utils/message';
import { extractTokenData, capitalizeFirstLetter, generateSlug } from '@/utils/helper';
import { validateFields } from '../../api-utlis/helper';
import { updateApiDataVersion } from '../../api-utlis/api-data-version';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const ulb = await prisma.urban_local_bodies.findMany({ where: { isDeleted: "N", isActive: 'Y' }, select: { id: true, name: true, slug: true, nameSlug: true, jurisdictionId: true, jurisdiction: true, wardCode: true, ward: true } });
        // deleteFields(ulb, ['createdAt', 'updatedAt', 'updatedUser']);
        return NextResponse.json({ result: true, message: ulb });
    } catch (error) {
        return NextResponse.json({ result: false, error: error.message });
    }
};

export async function POST(req) {
    try {
        let userId;
        const token = extractTokenData(req.headers);
        if (!token) {
            return NextResponse.json({ result: false, message: { tokenExpired: responseData.tokenExpired } });
        }
        const user = await prisma.user.findUnique({ where: { id: token.id, isDeleted: "N" } });
        if (!user) {
            return NextResponse.json({ result: false, message: { userNotFound: responseData.userNotFound } });
        }
        if (user?.id) { userId = user.id }
        const body = await req.json();
        const { name, jurisdictionId, ward, wardCode, isActive, id } = body;

        const emptyFieldErrors = {};
        if (!name || name?.trim() === "") {
            emptyFieldErrors.name = registerData.nameReq;
        }
        if (!jurisdictionId) {
            emptyFieldErrors.jurisdictionId = registerData.jurisdictionNameReq;
        }
        if (!wardCode || wardCode?.trim() === "") {
            emptyFieldErrors.wardCode = registerData.wardCodeReq;
        }
        if (!ward || ward?.trim() === "") {
            emptyFieldErrors.ward = registerData.wardReq;
        }
        if (Object.keys(emptyFieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: emptyFieldErrors });
        };
        const validatingFields = {
            name: { type: "title", message: registerData.ulbNameFieldVal },
            wardCode: { type: "aalphaNumberic", message: registerData.wardCodeFieldVal },
            ward: { type: "title", message: registerData.ulbWardFieldVal },
        };
        const fields = { name, wardCode, ward };
        let fieldErrors = validateFields(fields, validatingFields);
        if (Object.keys(fieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: fieldErrors });
        };
        const jurisdictionRow = await prisma.jurisdictions.findFirst({ where: { id: jurisdictionId } });
        if (!jurisdictionRow) {
            return NextResponse.json({ result: false, message: { jurisdictionId: responseData.notFound } });
        }
        const jurisdiction = jurisdictionRow.name;
        const data = { name, jurisdictionId, jurisdiction, isActive, ward, wardCode };
        let slug = generateSlug(ward);
        data.name = capitalizeFirstLetter(name);
        data.nameSlug = generateSlug(name);
        data.slug = slug;
        const isWardExist = await prisma.urban_local_bodies.findFirst({ where: { slug: slug, isDeleted: "N", ...(id ? { NOT: { id: parseInt(id) } } : {}) } });
        if (isWardExist) {
            return NextResponse.json({ result: false, message: { 'ward': responseData.wardExists } });
        }
        const iswardCodeExist = await prisma.urban_local_bodies.findFirst({ where: { wardCode: wardCode, isDeleted: "N", ...(id ? { NOT: { id: parseInt(id) } } : {}) } });
        if (iswardCodeExist) {
            return NextResponse.json({ result: false, message: { 'wardCode': responseData.wardCodeExists } });
        }
        if (id) {
            data.updatedUser = userId;
            const existingRec = await prisma.urban_local_bodies.findUnique({ where: { id: id } });
            if (!existingRec) {
                return NextResponse.json({ result: false, message: { notFound: responseData.noData } })
            }
            const updatedData = await prisma.urban_local_bodies.update({ where: { id: existingRec.id }, data });
            await updateApiDataVersion(user.id);
            return NextResponse.json({ result: true, message: updatedData });
        } else {
            await prisma.urban_local_bodies.create({ data: { ...data, createdUser: userId } });
            await updateApiDataVersion(user.id);
            return NextResponse.json({ result: true, message: responseData.dataCreateded });
        }
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
};

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
        await prisma.urban_local_bodies.update({
            where: { id: id },
            data: { isDeleted: 'Y' }
        });
        await updateApiDataVersion(user.id);
        return NextResponse.json({ result: true, message: responseData.delSuccess })
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
}
