-- AlterTable
ALTER TABLE `master_ayacutnoncultivation` MODIFY `createdBy` VARCHAR(191) NULL,
    MODIFY `updatedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `master_boundary_drop_points` MODIFY `createdBy` VARCHAR(191) NULL,
    MODIFY `updatedBy` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `master_bund_issue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `createdAt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
