import { Component, OnInit } from '@angular/core';
import { FornecedorService, Fornecedor } from 'src/api/services/fornecedor.services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  fornecedor: Fornecedor = {
    id: 0,
    CnpjFor: '',
    NmFor: '',
    FoneFor: '',
    EmailFor: '',
    DtCad: new Date()
  };
  isEditing: boolean = false; // Adiciona uma flag para o modo de edição

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores(): void {
    this.fornecedorService.getFornecedores().subscribe(data => {
      this.fornecedores = data;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        // Atualizar fornecedor existente
        this.fornecedorService.update(this.fornecedor).subscribe(() => {
          this.loadFornecedores(); // Atualiza a lista após a atualização
          this.resetForm(form); // Limpa o formulário e reseta o modo de edição
        });
      } else {
        // Criar novo fornecedor
        this.fornecedorService.create(this.fornecedor).subscribe(() => {
          this.loadFornecedores(); // Atualiza a lista após criação
          this.resetForm(form); // Limpa o formulário
        });
      }
    }
  }

  deleteFornecedor(id: number): void {
    this.fornecedorService.delete(id).subscribe(() => {
      this.loadFornecedores(); // Atualiza a lista após exclusão
    });
  }

  editFornecedor(id: number): void {
    const fornecedorToEdit = this.fornecedores.find(f => f.id === id);
    if (fornecedorToEdit) {
      this.fornecedor = { ...fornecedorToEdit }; // Carrega os dados no formulário
      this.isEditing = true; // Ativa o modo de edição
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm(); // Reseta o formulário
    this.fornecedor = { // Reseta o objeto fornecedor
      id: 0,
      CnpjFor: '',
      NmFor: '',
      FoneFor: '',
      EmailFor: '',
      DtCad: new Date()
    };
    this.isEditing = false; // Desativa o modo de edição
  }
}
