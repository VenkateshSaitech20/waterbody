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
        const blocks = xlsx.utils.sheet_to_json(sheet);

        const countryId = formData.get('countryId');
        const stateId = formData.get('stateId');
        const districtId = formData.get('districtId');
        const talukId = formData.get('talukId');

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
        if (!talukId) {
            emptyFieldErrors.districtId = registerData.talukNameReq;
        }
        if (Object.keys(emptyFieldErrors).length > 0) {
            return NextResponse.json({ result: false, message: emptyFieldErrors });
        }
        const countryData = await prisma.country.findUnique({ where: { id: +countryId } });
        const stateData = await prisma.state.findUnique({ where: { id: +stateId } });
        const districtData = await prisma.city.findUnique({ where: { id: +districtId } });
        const talukData = await prisma.taluks.findUnique({ where: { id: +talukId } });
        if (!countryData || !stateData || !districtData || !talukData) {
            return NextResponse.json({ result: false, message: { blockErr: responseData.blockValidFieldErr } });
        }
        const createBlockPromises = blocks.map(async (block) => {
            if (!block.name || !block.lgdCode) {
                return { result: false, message: { blockErr: responseData.blockMissingFieldErr } };
            }
            let slug = generateSlug(block.name);
            const existingBlock = await prisma.block.findFirst({ where: { slug: slug } });
            if (existingBlock) {
                const blockId = existingBlock.id;
                await prisma.block.update({
                    where: { id: blockId },
                    data: {
                        name: capitalizeFirstLetter(block.name),
                        slug: slug,
                        lgdCode: String(block.lgdCode),
                        countryId: +countryData.id,
                        country: capitalizeFirstLetter(countryData.name),
                        stateId: stateData.id,
                        state: capitalizeFirstLetter(stateData.name),
                        districtId: districtData.id,
                        district: capitalizeFirstLetter(districtData.name),
                        talukId: talukData.id,
                        taluk: capitalizeFirstLetter(talukData.name),
                    },
                });
            } else {
                await prisma.block.create({
                    data: {
                        name: capitalizeFirstLetter(block.name),
                        slug: slug,
                        lgdCode: String(block.lgdCode),
                        countryId: +countryData.id,
                        country: capitalizeFirstLetter(countryData.name),
                        stateId: stateData.id,
                        state: capitalizeFirstLetter(stateData.name),
                        districtId: districtData.id,
                        district: capitalizeFirstLetter(districtData.name),
                        talukId: talukData.id,
                        taluk: capitalizeFirstLetter(talukData.name),
                        createdUser: user.id,
                    },
                });
            }
            return { result: true, message: responseData.blocksUpdated };
        });
        const results = await Promise.all(createBlockPromises);
        const failedResult = results.find((result) => result.result === false);
        if (failedResult) {
            return NextResponse.json(failedResult);
        }
        await updateApiDataVersion(user.id);
        return NextResponse.json({ result: true, message: responseData.blocksUpdated });
    } catch (error) {
        return NextResponse.json({ result: false, message: 'Internal Server Error' });
    }
}
