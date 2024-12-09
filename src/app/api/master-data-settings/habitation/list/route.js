import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { extractTokenData } from '@/utils/helper';
import { responseData } from '@/utils/message';
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const token = extractTokenData(req.headers);
        const body = await req.json();
        let { searchText, page, pageSize } = body;
        if (!token.id) {
            return NextResponse.json({ result: false, message: { invalidToken: responseData.invalidToken } });
        };
        let userId = token.id;
        const user = await prisma.user.findUnique({ where: { id: userId, isDeleted: "N" } });
        if (!user) {
            return NextResponse.json({ result: false, message: { userNotFound: responseData.userNotFound } });
        }
        const queryFilter = {
            AND: [
                { isDeleted: 'N' },
                ...(searchText ? [{
                    OR: [
                        { name: { contains: searchText } },
                        { country: { contains: searchText } },
                        { state: { contains: searchText } },
                        { district: { contains: searchText } },
                        { taluk: { contains: searchText } },
                        { block: { contains: searchText } },
                        { panchayat: { contains: searchText } },
                        { lgdCode: { contains: searchText } }
                    ]
                }] : [])
            ]
        };
        let skip = (page - 1) * pageSize;
        const totalCount = await prisma.habitations.count({
            where: queryFilter
        });
        if (skip >= totalCount) {
            skip = totalCount - pageSize;
        }
        if (skip < 0) skip = 0;
        const totalPages = Math.ceil(totalCount / pageSize);
        const habitations = await prisma.habitations.findMany({
            where: queryFilter,
            select: {
                id: true,
                name: true,
                lgdCode: true,
                country: true,
                countryId: true,
                state: true,
                stateId: true,
                district: true,
                districtId: true,
                taluk: true,
                talukId: true,
                block: true,
                blockId: true,
                panchayat: true,
                panchayatId: true,
                isActive: true,
            },
            skip,
            take: pageSize
        });
        return NextResponse.json({ result: true, message: habitations, totalPages });
    } catch (error) {
        return NextResponse.json({ result: false, message: { roleError: error } });
    }
}
