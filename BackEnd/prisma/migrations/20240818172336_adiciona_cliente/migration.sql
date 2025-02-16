-- CreateTable
CREATE TABLE `Cliente` (
    `Codcli` INTEGER NOT NULL AUTO_INCREMENT,
    `NmCli` VARCHAR(150) NULL,
    `CpfCli` CHAR(11) NULL,
    `FoneCli` CHAR(11) NULL,
    `EmailCli` VARCHAR(50) NULL,
    `EndCli` VARCHAR(150) NULL,
    `CepCli` CHAR(9) NULL,
    `ComplCli` VARCHAR(50) NULL,
    `redesocial` VARCHAR(50) NULL,
    `DtUltCompra` DATE NULL,

    PRIMARY KEY (`Codcli`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
