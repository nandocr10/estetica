/*
  Warnings:

  - You are about to alter the column `DsProdt` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `NmAbr` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(40)`.
  - You are about to alter the column `UnMedida` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(3)`.
  - You are about to alter the column `TpCateg` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(1)`.
  - You are about to drop the `lancamento` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Produto` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `lancamento` DROP FOREIGN KEY `Lancamento_Produto_id_fkey`;

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `DtVenc` DATETIME(3) NULL,
    MODIFY `DsProdt` VARCHAR(100) NULL,
    MODIFY `NmAbr` CHAR(40) NULL,
    MODIFY `UnMedida` CHAR(3) NULL,
    MODIFY `TpCateg` CHAR(1) NULL,
    MODIFY `QtdEstoq` DECIMAL(10, 0) NULL,
    MODIFY `VrUltComp` DECIMAL(12, 2) NULL,
    MODIFY `VrPenultComp` DECIMAL(12, 2) NULL;

-- DropTable
DROP TABLE `lancamento`;

-- CreateIndex
CREATE UNIQUE INDEX `Produto_id_key` ON `Produto`(`id`);
