-- CreateTable
CREATE TABLE `Profissional` (
    `CodProf` INTEGER NOT NULL AUTO_INCREMENT,
    `NmProf` VARCHAR(100) NULL,
    `CpfProf` CHAR(11) NULL,
    `DtCad` DATE NULL,
    `DocReg` VARCHAR(50) NULL,
    `FoneProf` CHAR(11) NULL,
    `EmailProf` VARCHAR(50) NULL,
    `AtivProfi` VARCHAR(100) NULL,

    PRIMARY KEY (`CodProf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
