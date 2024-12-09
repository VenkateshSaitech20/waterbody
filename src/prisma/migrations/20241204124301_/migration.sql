-- AlterTable
ALTER TABLE `water_body_reviews` MODIFY `verifyStatus` INTEGER NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `tank_water_bodies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueId` VARCHAR(191) NULL,
    `tankName` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `block` VARCHAR(191) NULL,
    `panchayat` VARCHAR(191) NULL,
    `village` VARCHAR(191) NULL,
    `tankType` VARCHAR(191) NULL,
    `ayacut` VARCHAR(191) NULL,
    `watSprAr` VARCHAR(191) NULL,
    `capMcm` VARCHAR(191) NULL,
    `noOfSluices` VARCHAR(191) NULL,
    `sluicesType` VARCHAR(191) NULL,
    `bundLength` VARCHAR(191) NULL,
    `tbl` VARCHAR(191) NULL,
    `mwl` VARCHAR(191) NULL,
    `ftl` VARCHAR(191) NULL,
    `stoDepth` VARCHAR(191) NULL,
    `catchment` VARCHAR(191) NULL,
    `noOFWeirs` VARCHAR(191) NULL,
    `weirLength` VARCHAR(191) NULL,
    `lowSill` VARCHAR(191) NULL,
    `disCusecs` VARCHAR(191) NULL,
    `isDeleted` VARCHAR(191) NULL DEFAULT 'N',
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pwd_tanks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueId` VARCHAR(191) NULL,
    `tankName` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NULL,
    `district` VARCHAR(191) NULL,
    `taluk` VARCHAR(191) NULL,
    `block` VARCHAR(191) NULL,
    `village` VARCHAR(191) NULL,
    `subBasin` VARCHAR(191) NULL,
    `basin` VARCHAR(191) NULL,
    `section` VARCHAR(191) NULL,
    `subDn` VARCHAR(191) NULL,
    `division` VARCHAR(191) NULL,
    `circle` VARCHAR(191) NULL,
    `region` VARCHAR(191) NULL,
    `tankType` VARCHAR(191) NULL,
    `capacity` VARCHAR(191) NULL,
    `ftl` VARCHAR(191) NULL,
    `mwl` VARCHAR(191) NULL,
    `tbl` VARCHAR(191) NULL,
    `storageDepth` VARCHAR(191) NULL,
    `ayacut` VARCHAR(191) NULL,
    `catchmentArea` VARCHAR(191) NULL,
    `watSpread` VARCHAR(191) NULL,
    `noOfWeirs` VARCHAR(191) NULL,
    `weirLength` VARCHAR(191) NULL,
    `noOfSluices` VARCHAR(191) NULL,
    `lowestSill` VARCHAR(191) NULL,
    `bundLength` VARCHAR(191) NULL,
    `discharge` VARCHAR(191) NULL,
    `isDeleted` VARCHAR(191) NULL DEFAULT 'N',
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `volunteers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `mobile` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `volunteeringFor` VARCHAR(191) NULL,
    `taluk` VARCHAR(191) NULL,
    `block` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `months` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
