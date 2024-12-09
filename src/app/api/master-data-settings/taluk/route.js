import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { registerData, responseData } from '@/utils/message';
import { extractTokenData, capitalizeFirstLetter, generateSlug } from '@/utils/helper';
import { deleteFields, validateFields } from '../../api-utlis/helper';
import { updateApiDataVersion } from '../../api-utlis/api-data-version';
const prisma = new PrismaClient();

export async function GET() {
    try {
        const taluks = await prisma.taluks.findMany({ where: { isDeleted: "N", isActive: 'Y' } });
        deleteFields(taluks, ['createdAt', 'updatedAt', 'updatedUser']);
        return NextResponse.json({ result: true, message: taluks });
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
        const { name, lgdCode, countryId, stateId, districtId, isActive, id } = body;
        const emptyFieldErrors = {};
        if (!name || name?.trim() === "") {
            emptyFieldErrors.name = registerData.nameReq;
        }
        if (!lgdCode) {
            emptyFieldErrors.lgdCode = registerData.lgdCodeNameReq;
        }
        if (!countryId) {
            emptyFieldErrors.countryId = registerData.countryNameReq;
        }
        if (!stateId) {
            emptyFieldErrors.stateId = registerData.stateNameReq;
        }
        if (!districtId) {
            emptyFieldErrors.districtId = registerData.districtNameReq;
        }
        if (Object.keys(emptyFieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: emptyFieldErrors });
        };
        const validatingFields = {
            name: { type: "name", message: registerData.nameFieldVal },
            lgdCode: { type: "number", message: registerData.lgdCodeFieldVal },
            countryId: { type: "number", message: registerData.countryIdFieldVal },
            stateId: { type: "number", message: registerData.stateFieldVal },
            districtId: { type: "number", message: registerData.distFieldVal },
        };

        const fields = { name, lgdCode, countryId, stateId, districtId };
        let fieldErrors = validateFields(fields, validatingFields);
        if (Object.keys(fieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: fieldErrors });
        };
        const countryRow = await prisma.country.findFirst({ where: { id: countryId } });
        const country = countryRow.name;
        const stateRow = await prisma.state.findFirst({ where: { id: stateId } });
        const state = stateRow.name;
        const districtRow = await prisma.city.findFirst({ where: { id: districtId } });
        const district = districtRow.name;
        const data = { countryId, country, stateId, state, districtId, district, lgdCode, isActive };
        let slug = generateSlug(name);
        data.name = capitalizeFirstLetter(name);
        data.slug = slug;
        const isNameExist = await prisma.taluks.findFirst({ where: { slug: slug, isDeleted: "N", ...(id ? { NOT: { id: parseInt(id) } } : {}) } });
        if (isNameExist) {
            return NextResponse.json({ result: false, message: { 'name': responseData.talukExists } });
        }
        const isLGDExist = await prisma.taluks.findFirst({ where: { lgdCode: lgdCode, isDeleted: "N", ...(id ? { NOT: { id: parseInt(id) } } : {}) } });
        if (isLGDExist) {
            return NextResponse.json({ result: false, message: { 'lgdCode': responseData.lgdExists } });
        }
        if (id) {
            data.updatedUser = userId;
            const existingRec = await prisma.taluks.findUnique({ where: { id: id } });
            if (!existingRec) {
                return NextResponse.json({ result: false, message: { notFound: responseData.noData } })
            }
            const updatedData = await prisma.taluks.update({ where: { id: existingRec.id }, data });
            await updateApiDataVersion(user.id);
            return NextResponse.json({ result: true, message: updatedData });
        } else {
            await prisma.taluks.create({ data: { ...data, createdUser: userId } });
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
        await prisma.taluks.update({
            where: { id: id },
            data: { isDeleted: 'Y' }
        });
        await updateApiDataVersion(user.id);
        return NextResponse.json({ result: true, message: responseData.delSuccess })
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
}
