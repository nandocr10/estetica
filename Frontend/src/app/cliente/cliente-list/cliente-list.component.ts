import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from 'src/api/services/cliente.services';
import { NgForm } from '@angular/forms';

// >>> IMPORTANDO AS BIBLIOTECAS
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    Codcli: 0,
    NmCli: '',
    CpfCli: '',
    FoneCli: '',
    EmailCli: '',
    EndCli: '',
    CepCli: '',
    ComplCli: '',
    redesocial: '',
    DtUltCompra: new Date()
  };
  isEditing: boolean = false; // Adiciona uma flag para o modo de edição

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        // Atualizar cliente existente
        this.clienteService.update(this.cliente).subscribe(() => {
          this.loadClientes(); // Atualiza a lista após a atualização
          this.resetForm(form); // Limpa o formulário e reseta o modo de edição
        });
      } else {
        // Criar novo cliente
        this.clienteService.create(this.cliente).subscribe(() => {
          this.loadClientes(); // Atualiza a lista após criação
          this.resetForm(form); // Limpa o formulário
        });
      }
    }
  }

  deleteCliente(id: number): void {    
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clienteService.delete(id).subscribe(() => {
        this.loadClientes(); // Atualiza a lista após exclusão
      });
    }
  }

  editCliente(id: number): void {
    const clienteToEdit = this.clientes.find(c => c.Codcli === id);
    if (clienteToEdit) {
      this.cliente = { ...clienteToEdit }; // Carrega os dados no formulário
      this.isEditing = true; // Ativa o modo de edição
    }
  }

  resetForm(form: NgForm): void {
    form.resetForm(); // Reseta o formulário
    this.cliente = { // Reseta o objeto cliente
      Codcli: 0,
      NmCli: '',
      CpfCli: '',
      FoneCli: '',
      EmailCli: '',
      EndCli: '',
      CepCli: '',
      ComplCli: '',
      redesocial: '',
      DtUltCompra: new Date()
    };
    this.isEditing = false; // Desativa o modo de edição
  }

  // >>> FUNÇÃO PARA GERAR O RELATÓRIO PDF
  gerarPDF(): void {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Clientes', 14, 22);

    const colunas = ['ID', 'Nome', 'CPF', 'Telefone', 'Email', 'Rede Social', 'Última Compra'];

    const linhas = this.clientes.map(cliente => [
      cliente.Codcli,
      cliente.NmCli,
      cliente.CpfCli,
      cliente.FoneCli,
      cliente.EmailCli,
      cliente.redesocial,
      cliente.DtUltCompra ? new Date(cliente.DtUltCompra).toLocaleDateString() : ''
    ]);

    autoTable(doc, {
      startY: 30,
      head: [colunas],
      body: linhas,
    });

    doc.save('relatorio_clientes.pdf');
  }
}
