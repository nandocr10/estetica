/*
  Warnings:

  - You are about to drop the column `stapgto` on the `atendserv` table. All the data in the column will be lost.
  - You are about to drop the column `tppgto` on the `atendserv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `atendserv` DROP COLUMN `stapgto`,
    DROP COLUMN `tppgto`,
    ADD COLUMN `Stapgto` INTEGER NULL,
    ADD COLUMN `Tppgto` INTEGER NULL;
