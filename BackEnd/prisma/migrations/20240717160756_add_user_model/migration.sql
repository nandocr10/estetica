/*
  Warnings:

  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `NomeGrp` on table `grpacess` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_userId_fkey`;

-- AlterTable
ALTER TABLE `grpacess` MODIFY `NomeGrp` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `username` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `activity`;

-- DropTable
DROP TABLE `category`;
