/*
  Warnings:

  - You are about to drop the column `staatend` on the `atendimento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `atendimento` DROP COLUMN `staatend`,
    ADD COLUMN `Staatend` INTEGER NULL;
