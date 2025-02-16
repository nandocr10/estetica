/*
  Warnings:

  - Made the column `FtEnt02` on table `atendserv` required. This step will fail if there are existing NULL values in that column.
  - Made the column `FtRet01` on table `atendserv` required. This step will fail if there are existing NULL values in that column.
  - Made the column `FtRet02` on table `atendserv` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `atendserv` MODIFY `FtEnt02` MEDIUMTEXT NOT NULL,
    MODIFY `FtRet01` MEDIUMTEXT NOT NULL,
    MODIFY `FtRet02` MEDIUMTEXT NOT NULL;
