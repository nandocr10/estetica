/*
  Warnings:

  - The primary key for the `grpacess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `grpacess` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `grpacess` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `grpacess` table. All the data in the column will be lost.
  - Added the required column `CodGrp` to the `grpacess` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `grpacess_email_key` ON `grpacess`;

-- AlterTable
ALTER TABLE `grpacess` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `CodGrp` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `NomeGrp` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`CodGrp`);
