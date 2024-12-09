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
        if (!user) {
            return NextResponse.json({ result: false, message: { userNotFound: responseData.userNotFound } });
        }
        const formData = await req.formData();
        const file = formData.get('file');
        if (!file) {
            return NextResponse.json({ result: false, message: { 'uplFile': 'No file uploaded' } });
        }
        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const taluks = xlsx.utils.sheet_to_json(sheet);

        const countryId = formData.get('countryId');
        const stateId = formData.get('stateId');
        const districtId = formData.get('districtId');

        const emptyFieldErrors = {};
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
        }
        const countryData = await prisma.country.findUnique({ where: { id: +countryId } });
        const stateData = await prisma.state.findUnique({ where: { id: +stateId } });
        const districtData = await prisma.city.findUnique({ where: { id: +districtId } });
        if (!countryData || !stateData || !districtData) {
            return NextResponse.json({ result: false, message: { talukErr: responseData.talukValidFieldErr } });
        }
        const createTalukPromises = taluks.map(async (taluk) => {
            if (!taluk.name || !taluk.lgdCode) {
                return { result: false, message: { talukErr: responseData.talukMissingFieldErr } };
            }
            let slug = generateSlug(taluk.name);
            const existingTaluk = await prisma.taluks.findFirst({ where: { slug: slug } });
            if (existingTaluk) {
                const talukId = existingTaluk.id;
                await prisma.taluks.update({
                    where: { id: talukId },
                    data: {
                        name: capitalizeFirstLetter(taluk.name),
                        slug: slug,
                        lgdCode: String(taluk.lgdCode),
                        countryId: +countryData.id,
                        country: capitalizeFirstLetter(countryData.name),
                        stateId: stateData.id,
                        state: capitalizeFirstLetter(stateData.name),
                        districtId: districtData.id,
                        district: capitalizeFirstLetter(districtData.name),
                    },
                });
            } else {
                await prisma.taluks.create({
                    data: {
                        name: capitalizeFirstLetter(taluk.name),
                        slug: slug,
                        lgdCode: String(taluk.lgdCode),
                        countryId: +countryData.id,
                        country: capitalizeFirstLetter(countryData.name),
                        stateId: stateData.id,
                        state: capitalizeFirstLetter(stateData.name),
                        districtId: districtData.id,
                        district: capitalizeFirstLetter(districtData.name),
                        createdUser: user.id,
                    },
                });
            }
            return { result: true, message: responseData.taluksUpdated };
        });
        const results = await Promise.all(createTalukPromises);
        const failedResult = results.find((result) => result.result === false);
        if (failedResult) {
            return NextResponse.json(failedResult);
        }
        await updateApiDataVersion(user.id);
        return NextResponse.json({ result: true, message: responseData.taluksUpdated });
    } catch (error) {
        return NextResponse.json({ result: false, message: 'Internal Server Error' });
    }
}
