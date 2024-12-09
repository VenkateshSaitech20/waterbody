/*
  Warnings:

  - Added the required column `taluk` to the `habitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `talukId` to the `habitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taluk` to the `panchayats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `talukId` to the `panchayats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `habitations` ADD COLUMN `taluk` VARCHAR(191) NOT NULL,
    ADD COLUMN `talukId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `panchayats` ADD COLUMN `taluk` VARCHAR(191) NOT NULL,
    ADD COLUMN `talukId` INTEGER NOT NULL;
