import { Component, OnInit } from '@angular/core';
import { ServicoService, Servico } from 'src/api/services/servico.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {
  servicos: Servico[] = [];
  servico: Servico = {
    CodServ: 0,
    DsServ: '',
    DtCad: new Date()
  };
  isEditing: boolean = false; // Flag para modo de edição

  constructor(private servicoService: ServicoService) {}

  ngOnInit(): void {
    this.loadServicos();
  }

  loadServicos(): void {
    this.servicoService.getServicos().subscribe(data => {
      this.servicos = data;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        // Atualizar serviço existente
        this.servicoService.update(this.servico).subscribe(() => {
          this.loadServicos(); // Atualiza a lista após a atualização
          this.resetForm(form); // Limpa o formulário e reseta o modo de edição
        });
      } else {
        // Criar novo serviço
        this.servicoService.create(this.servico).subscribe(() => {
          this.loadServicos(); // Atualiza a lista após criação
          this.resetForm(form); // Limpa o formulário
        });
      }
    }
  }

  deleteServico(id: number): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.servicoService.delete(id).subscribe(() => {
        this.loadServicos(); // Atualiza a lista após exclusão
      });
    }
  }

  editServico(id: number): void {
    const servicoToEdit = this.servicos.find(s => s.CodServ === id);
    if (servicoToEdit) {
      this.servico = { ...servicoToEdit }; // Carrega os dados no formulário
      this.isEditing = true; // Ativa o modo de edição
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm(); // Reseta o formulário
    this.servico = { // Reseta o objeto servico
      CodServ: 0,
      DsServ: '',
      DtCad: new Date()
    };
    this.isEditing = false; // Desativa o modo de edição
  }
}
