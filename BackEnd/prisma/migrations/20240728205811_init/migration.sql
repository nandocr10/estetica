-- CreateTable
CREATE TABLE `Fornecedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CnpjFor` VARCHAR(191) NOT NULL,
    `NmFor` VARCHAR(191) NULL,
    `FoneFor` VARCHAR(191) NULL,
    `EmailFor` VARCHAR(191) NULL,
    `DtCad` DATETIME(3) NULL,

    UNIQUE INDEX `Fornecedor_CnpjFor_key`(`CnpjFor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lancamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario_id` INTEGER NOT NULL,
    `Produto_id` INTEGER NOT NULL,
    `StaLanc` VARCHAR(191) NULL,
    `DtLan` DATETIME(3) NULL,
    `NF` VARCHAR(191) NULL,
    `NumDoc` INTEGER NULL,
    `TpLanc` VARCHAR(191) NULL,
    `QtdLanc` DOUBLE NULL,
    `VrUnit` DOUBLE NULL,
    `ObsLanc` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Fornecedor_id` INTEGER NOT NULL,
    `DsProdt` VARCHAR(191) NULL,
    `NmAbr` VARCHAR(191) NULL,
    `DtCad` DATETIME(3) NULL,
    `UnMedida` VARCHAR(191) NULL,
    `TpCateg` VARCHAR(191) NULL,
    `QtdEstoq` DOUBLE NULL,
    `DtUltComp` DATETIME(3) NULL,
    `VrUltComp` DOUBLE NULL,
    `DtPenultComp` DATETIME(3) NULL,
    `VrPenultComp` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lancamento` ADD CONSTRAINT `Lancamento_Produto_id_fkey` FOREIGN KEY (`Produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_Fornecedor_id_fkey` FOREIGN KEY (`Fornecedor_id`) REFERENCES `Fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
