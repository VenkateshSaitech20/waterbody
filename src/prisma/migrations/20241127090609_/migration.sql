/*
  Warnings:

  - Added the required column `nameSlug` to the `urban_local_bodies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `urban_local_bodies` ADD COLUMN `nameSlug` VARCHAR(191) NOT NULL;
