/*
  Warnings:

  - Made the column `FtEnt01` on table `atendserv` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `atendserv` MODIFY `FtEnt01` TEXT NOT NULL;
