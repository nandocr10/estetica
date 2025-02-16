import { Component, OnInit } from '@angular/core';
import { AtendServ, AtendServService } from 'src/api/services/atendserv.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-atendserv-form',
  templateUrl: './atendserv-form.component.html',
  styleUrls: ['./atendserv-form.component.css']
})
export class AtendServFormComponent implements OnInit {
  atendimento: AtendServ = this.resetAtendimento();
  isEditing: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private atendServService: AtendServService) {}

  ngOnInit(): void {
    // Se necessário, carregar dados no início
  }

  // Método para resetar o formulário de atendimento de serviço
  resetAtendimento(): AtendServ {
    return {
      CodAtend: 0,
      CodServ: 0,
      CodProf: null,
      DtAgen: null,
      FtEnt01: '',
      FtEnt02: '',
      FtRet01: '',
      FtRet02: '',
      VrServ: null,
      PercComis: null,
      Obs: ''
    };
  }

  // Método para submeter o formulário
  onSubmit(atendimentoForm: NgForm): void {
    if (this.isEditing) {
      this.updateAtendServ();
    } else {
      this.createAtendServ();
    }
    atendimentoForm.resetForm();
  }

  // Método para criar um atendimento de serviço
  createAtendServ(): void {
    this.atendServService.create(this.atendimento).subscribe(
      (data) => {
        this.successMessage = 'Atendimento de serviço criado com sucesso!';
        this.errorMessage = '';
        this.atendimento = this.resetAtendimento(); // Reseta o formulário após a criação
      },
      (error) => this.errorMessage = 'Erro ao criar atendimento de serviço'
    );
  }

  // Método para atualizar um atendimento de serviço existente
  updateAtendServ(): void {
    this.atendServService.update(this.atendimento).subscribe(
      () => {
        this.successMessage = 'Atendimento de serviço atualizado com sucesso!';
        this.errorMessage = '';
        this.isEditing = false;
        this.atendimento = this.resetAtendimento(); // Reseta o formulário após a atualização
      },
      (error) => this.errorMessage = 'Erro ao atualizar atendimento de serviço'
    );
  }

  // Método para carregar um atendimento de serviço para edição
  editAtendServ(CodAtend: number, CodServ: number): void {
    this.atendServService.getAtendServ(CodAtend, CodServ).subscribe(
      (data) => {
        this.atendimento = { ...data };
        this.isEditing = true;
        this.successMessage = '';
        this.errorMessage = '';
      },
      (error) => this.errorMessage = 'Erro ao carregar atendimento de serviço para edição'
    );
  }

  // Método para cancelar a edição e resetar o formulário
  cancelEdit(): void {
    this.isEditing = false;
    this.atendimento = this.resetAtendimento();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
