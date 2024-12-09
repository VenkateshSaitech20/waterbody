-- CreateTable
CREATE TABLE `water_body_reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `surveyNumber` VARCHAR(191) NULL,
    `waterBodyType` VARCHAR(191) NULL,
    `waterBodyAvailability` BOOLEAN NULL,
    `waterBodyId` VARCHAR(191) NULL,
    `waterBodyName` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `taluk` VARCHAR(191) NULL,
    `block` VARCHAR(191) NULL,
    `panchayat` VARCHAR(191) NULL,
    `village` VARCHAR(191) NULL,
    `jurisdiction` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `ward` VARCHAR(191) NULL,
    `waterParams` JSON NULL,
    `gpsCordinates` JSON NULL,
    `images` JSON NULL,
    `draftStatus` INTEGER NULL,
    `verifyStatus` INTEGER NULL,
    `isDeleted` VARCHAR(191) NULL DEFAULT 'N',
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
