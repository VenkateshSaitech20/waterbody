import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function updateApiDataVersion(userId) {
    try {
        const updatedApiVersion = await prisma.api_data_version.upsert({
            where: { id: 1 },
            update: {
                version: { increment: 1 },
                updatedBy: userId,
            },
            create: {
                id: 1,
                version: 1,
                updatedBy: userId,
            },
        });
        return updatedApiVersion;
    } catch (error) {
        console.error('Error in updateApiDataVersion:', error);
        // throw error;
    }
}