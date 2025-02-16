-- AlterTable
ALTER TABLE `atendimento` ADD COLUMN `staatend` INTEGER NULL;

-- AlterTable
ALTER TABLE `atendserv` ADD COLUMN `stapgto` INTEGER NULL,
    ADD COLUMN `tppgto` INTEGER NULL;
