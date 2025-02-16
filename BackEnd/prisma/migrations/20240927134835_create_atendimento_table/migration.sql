-- CreateTable
CREATE TABLE `Atendimento` (
    `CodAtend` INTEGER NOT NULL AUTO_INCREMENT,
    `Codcli` INTEGER NOT NULL,
    `DtAgen` DATE NULL,
    `DtCad` DATE NULL,
    `DtVenda` DATE NULL,
    `Obs` VARCHAR(100) NULL,

    INDEX `Atendimento_FKIndex1`(`Codcli`),
    PRIMARY KEY (`CodAtend`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Atendimento` ADD CONSTRAINT `Atendimento_Codcli_fkey` FOREIGN KEY (`Codcli`) REFERENCES `Cliente`(`Codcli`) ON DELETE RESTRICT ON UPDATE CASCADE;
