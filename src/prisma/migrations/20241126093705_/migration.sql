-- CreateTable
CREATE TABLE `urban_local_bodies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `jurisdictionId` INTEGER NOT NULL,
    `jurisdiction` VARCHAR(191) NULL,
    `wardCode` VARCHAR(191) NULL,
    `ward` VARCHAR(191) NULL,
    `isDeleted` VARCHAR(191) NOT NULL DEFAULT 'N',
    `isActive` VARCHAR(191) NOT NULL DEFAULT 'Y',
    `createdUser` VARCHAR(191) NULL,
    `updatedUser` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
