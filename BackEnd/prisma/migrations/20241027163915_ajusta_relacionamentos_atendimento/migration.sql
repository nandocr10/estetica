-- AddForeignKey
ALTER TABLE `AtendServ` ADD CONSTRAINT `AtendServ_CodAtend_fkey` FOREIGN KEY (`CodAtend`) REFERENCES `Atendimento`(`CodAtend`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtendServ` ADD CONSTRAINT `AtendServ_CodServ_fkey` FOREIGN KEY (`CodServ`) REFERENCES `Servico`(`CodServ`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AtendServ` ADD CONSTRAINT `AtendServ_CodProf_fkey` FOREIGN KEY (`CodProf`) REFERENCES `Profissional`(`CodProf`) ON DELETE SET NULL ON UPDATE CASCADE;
