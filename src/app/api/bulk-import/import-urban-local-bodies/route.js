import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { capitalizeFirstLetter, extractTokenData, generateSlug } from '@/utils/helper';
import { registerData, responseData } from '@/utils/message';
import { updateApiDataVersion } from '../../api-utlis/api-data-version';
const prisma = new PrismaClient();

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    try {
        const token = extractTokenData(req.headers);
        if (!token.id) {
            return NextResponse.json({ result: false, message: { tokenExpired: responseData.tokenExpired } });
        }
        const user = await prisma.user.findUnique({ where: { id: token.id, isDeleted: "N" } });
        if (!user.id) {
            return NextResponse.json({ result: false, message: { userNotFound: responseData.userNotFound } });
        }
        const formData = await req.formData();
        const file = formData.get('file');
        if (!file) {
            return NextResponse.json({ result: false, message: 'No file uploaded' });
        }
        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const ulbs = xlsx.utils.sheet_to_json(sheet);
        const jurisdictionId = formData.get('jurisdictionId');
        if (!jurisdictionId) {
            return NextResponse.json({ result: false, message: registerData.jurisdictionNameReq });
        }
        const jurisdictionData = await prisma.jurisdictions.findUnique({ where: { id: parseInt(jurisdictionId) } })
        const createULB = ulbs.map(async (ulb) => {
            if (!ulb.name || !ulb.wardCode || !ulb.ward) {
                return { result: false, message: registerData.bulkImportReq };
            } else {
                let slug = generateSlug(ulb.ward);
                let nameSlug = generateSlug(ulb.name);
                ulb.wardCode = String(ulb.wardCode);
                const existingSlug = await prisma.urban_local_bodies.findFirst({ where: { slug: slug } });
                const existingWardCode = await prisma.urban_local_bodies.findFirst({ where: { wardCode: ulb.wardCode } });
                if (!existingSlug && !existingWardCode) {
                    await prisma.urban_local_bodies.create({
                        data: {
                            name: ulb.name,
                            slug: slug,
                            nameSlug: nameSlug,
                            ward: String(ulb.ward),
                            wardCode: String(ulb.wardCode),
                            jurisdictionId: jurisdictionData.id,
                            jurisdiction: jurisdictionData.name,
                            createdUser: user.id
                        },
                    });
                } else if (existingWardCode && !existingSlug) {
                    const id = existingWardCode.id;
                    await prisma.urban_local_bodies.update({
                        where: { id: id },
                        data: {
                            name: ulb.name,
                            slug: slug,
                            nameSlug: nameSlug,
                            ward: String(ulb.ward),
                            wardCode: String(ulb.wardCode),
                            jurisdictionId: jurisdictionData.id,
                            jurisdiction: jurisdictionData.name,
                            updatedUser: user.id
                        },
                    });
                } else {
                    const id = existingSlug.id;
                    await prisma.urban_local_bodies.update({
                        where: { id: id },
                        data: {
                            name: ulb.name,
                            slug: slug,
                            nameSlug: nameSlug,
                            ward: String(ulb.ward),
                            wardCode: String(ulb.wardCode),
                            jurisdictionId: jurisdictionData.id,
                            jurisdiction: jurisdictionData.name,
                            updatedUser: user.id
                        },
                    });
                }
            }
            return { result: true, message: 'Data uploaded successfully' };
        });
        const results = await Promise.all(createULB);
        const failedResult = results.find(result => result.result === false);
        if (failedResult) {
            return NextResponse.json(failedResult);
        }
        await updateApiDataVersion(user.id);
        return NextResponse.json({ result: true, message: 'Data uploaded successfully' });
    } catch (error) {
        return NextResponse.json({ result: false, message: 'Internal Server Error' });
    }
}
