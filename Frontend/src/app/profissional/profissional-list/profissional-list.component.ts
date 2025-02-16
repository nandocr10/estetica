import { Component, OnInit } from '@angular/core';
import { ProfissionalService, Profissional } from 'src/api/services/profissional.services'; // Seu ProfissionalService
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profissional-list',
  templateUrl: './profissional-list.component.html',
  styleUrls: ['./profissional-list.component.css']
})
export class ProfissionalListComponent implements OnInit {
  profissionais: Profissional[] = []; // Lista de profissionais
  profissional: Profissional = {
    CodProf: 0,
    NmProf: '',
    CpfProf: '',
    DocReg: '',
    FoneProf: '',
    EmailProf: '',
    AtivProfi: '',
    DtCad: new Date() // Data de cadastro (opcional)
  };
  isEditing: boolean = false; // Flag para identificar edição
  successMessage: string = ''; // Para exibir mensagens de sucesso
  searchQuery: string = ''; // Variável para armazenar a pesquisa do profissional

  constructor(private profissionalService: ProfissionalService) {}

  ngOnInit(): void {
    this.loadProfissionais(); // Carregar profissionais ao iniciar
  }

  // Carrega profissionais já existentes
  loadProfissionais(): void {
    this.profissionalService.getProfissionais().subscribe(data => {
      this.profissionais = data;
    });
  }

  // Submissão do formulário de profissional
  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        // Atualizar profissional
        this.profissionalService.update(this.profissional).subscribe(
          () => {
            this.successMessage = 'Profissional atualizado com sucesso!';
            this.loadProfissionais(); // Atualiza a lista após edição
            this.resetForm(form); // Limpa o formulário
          },
          (error) => {
            console.error('Erro ao atualizar profissional:', error);
          }
        );
      } else {
        // Criar novo profissional
        this.profissionalService.create(this.profissional).subscribe(
          () => {
            this.successMessage = 'Novo profissional inserido com sucesso!';
            this.loadProfissionais(); // Atualiza a lista após criação
            this.resetForm(form); // Limpa o formulário
          },
          (error) => {
            console.error('Erro ao criar profissional:', error);
          }
        );
      }
    }
  }

  // Excluir profissional
  deleteProfissional(id: number): void {
    if (confirm('Deseja realmente excluir este profissional?')) {
      this.profissionalService.delete(id).subscribe(() => {
        this.successMessage = 'Profissional excluído com sucesso!';
        this.loadProfissionais(); // Atualiza a lista após exclusão
      });
    }
  }

  // Editar profissional
  editProfissional(id: number): void {
    const profissionalToEdit = this.profissionais.find(p => p.CodProf === id);
    if (profissionalToEdit) {
      this.profissional = { ...profissionalToEdit }; // Preenche o formulário com os dados existentes
      this.isEditing = true; // Habilita modo de edição
    }
  }

  // Reseta o formulário e limpa o objeto profissional
  resetForm(form: NgForm): void {
    form.resetForm(); // Limpa o formulário
    this.profissional = {
      CodProf: 0,
      NmProf: '',
      CpfProf: '',
      DocReg: '',
      FoneProf: '',
      EmailProf: '',
      AtivProfi: '',
      DtCad: new Date() // Data de cadastro (opcional)
    };
    this.isEditing = false; // Desabilita modo de edição
    this.searchQuery = ''; // Limpa a pesquisa
  }
}
