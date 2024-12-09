/*
  Warnings:

  - You are about to drop the `apidataversion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `apidataversion`;

-- CreateTable
CREATE TABLE `api_data_version` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `version` INTEGER NULL DEFAULT 1,
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
