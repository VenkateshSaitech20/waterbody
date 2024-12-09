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
                ...(searchText ? [{
                    OR: [
                        { name: { contains: searchText } },
                        { email: { contains: searchText } },
                        { contactNo: { contains: searchText } },
                        { packageName: { contains: searchText } },
                        { paymentMethod: { contains: searchText } },
                        { paymentStatus: { contains: searchText } },
                        { currency: { contains: searchText } },
                        { paymentId: { contains: searchText } },
                        { packageValidity: { contains: searchText } },
                        { amount: { contains: searchText } },
                    ]
                }] : [])
            ]
        };
        let skip = (page - 1) * pageSize;
        const totalCount = await prisma.subscription_list.count({
            where: queryFilter
        });
        if (skip >= totalCount) {
            skip = totalCount - pageSize;
        }
        if (skip < 0) skip = 0;
        const totalPages = Math.ceil(totalCount / pageSize);
        const subscriptionHistory = await prisma.subscription_list.findMany({
            where: queryFilter,
            skip,
            take: pageSize
        });
        return NextResponse.json({ result: true, message: subscriptionHistory, totalPages });
    } catch (error) {
        return NextResponse.json({ result: false, message: error });
    }
};
