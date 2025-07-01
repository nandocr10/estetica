import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from 'src/api/services/cliente.services';
import { NgForm } from '@angular/forms';

// >>> IMPORTANDO AS BIBLIOTECAS
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = []; // Lista filtrada
  paginatedClientes: Cliente[] = []; // Lista de clientes para exibição na página atual
  currentPage: number = 1; // Página atual
  itemsPerPage: number = 10; // Número de itens por página
  totalPages: number = 0; // Total de páginas
  totalPagesArray: number[] = []; // Array para exibição de páginas
  searchTerm: string = ''; // Termo de pesquisa
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

  // Inicialize o objeto de ordenação
  sortOrder: { [key: string]: string } = {
    Codcli: 'asc',
    NmCli: 'asc',
    CpfCli: 'asc',
    FoneCli: 'asc',
    EmailCli: 'asc',
    redesocial: 'asc',
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
      this.filteredClientes = data; // Inicializa a lista filtrada
      this.calculatePagination();
    });
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredClientes.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedClientes = this.filteredClientes.slice(startIndex, endIndex);
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

  onSearch(): void {
    this.filteredClientes = this.clientes.filter(cliente =>
      cliente.NmCli.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.calculatePagination();
  }

  sortColumn(column: string): void {
    const isAscending = this.sortOrder[column] === 'asc';
    this.sortOrder[column] = isAscending ? 'desc' : 'asc';

    this.filteredClientes.sort((a, b) => {
      if (a[column] < b[column]) {
        return isAscending ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });

    this.calculatePagination(); // Recalcula a paginação após a ordenação
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.clientes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'clientes.xlsx');
  }
}
