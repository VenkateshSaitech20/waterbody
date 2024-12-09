-- CreateTable
CREATE TABLE `water_body_maps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `district` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NULL,
    `geoJsonFiles` JSON NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
