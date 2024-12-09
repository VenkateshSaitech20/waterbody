-- CreateTable
CREATE TABLE `block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `countryId` INTEGER NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `stateId` INTEGER NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `districtId` INTEGER NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `createdUser` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedUser` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` VARCHAR(191) NOT NULL DEFAULT 'N',
    `isActive` VARCHAR(191) NOT NULL DEFAULT 'Y',
    `lgdCode` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;