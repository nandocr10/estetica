-- CreateTable
CREATE TABLE `Servico` (
    `CodServ` INTEGER NOT NULL AUTO_INCREMENT,
    `DsServ` VARCHAR(100) NULL,
    `DtCad` DATE NULL,

    PRIMARY KEY (`CodServ`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
