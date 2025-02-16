-- CreateTable
CREATE TABLE `AtendServ` (
    `CodAtend` INTEGER NOT NULL,
    `CodServ` INTEGER NOT NULL,
    `CodProf` INTEGER NULL,
    `DtAgen` DATETIME(3) NULL,
    `FtEnt01` VARCHAR(191) NULL,
    `FtEnt02` VARCHAR(191) NULL,
    `FtRet01` VARCHAR(191) NULL,
    `FtRet02` VARCHAR(191) NULL,
    `VrServ` DECIMAL(65, 30) NULL,
    `PercComis` DECIMAL(65, 30) NULL,
    `Obs` VARCHAR(191) NULL,

    INDEX `Atendimento_has_Servico_FKIndex1`(`CodAtend`),
    INDEX `Atendimento_has_Servico_FKIndex2`(`CodServ`),
    INDEX `AtendServ_FKIndex3`(`CodProf`),
    PRIMARY KEY (`CodAtend`, `CodServ`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
