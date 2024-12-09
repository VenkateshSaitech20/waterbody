/*
  Warnings:

  - Added the required column `taluk` to the `block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `talukId` to the `block` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `block` ADD COLUMN `taluk` VARCHAR(191) NOT NULL,
    ADD COLUMN `talukId` INTEGER NOT NULL;
