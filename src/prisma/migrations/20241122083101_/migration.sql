/*
  Warnings:

  - Added the required column `slug` to the `block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `block` ADD COLUMN `slug` VARCHAR(191) NOT NULL;
