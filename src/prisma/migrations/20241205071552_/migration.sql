-- CreateTable
CREATE TABLE `apiDataVersion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` INTEGER NULL DEFAULT 1,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
