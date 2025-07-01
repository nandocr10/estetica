import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from 'src/api/services/cliente.services';
import { NgForm } from '@angular/forms';

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
  filteredClientes: Cliente[] = [];
  paginatedClientes: Cliente[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  searchTerm: string = '';
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
  isEditing: boolean = false;

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
      this.filteredClientes = data;
      this.currentPage = 1;
      this.calculatePagination();
    });
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredClientes.length / this.itemsPerPage) || 1;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedClientes = this.filteredClientes.slice(start, end);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.calculatePagination();
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        this.clienteService.update(this.cliente).subscribe(() => {
          this.loadClientes();
          this.resetForm(form);
        });
      } else {
        this.clienteService.create(this.cliente).subscribe(() => {
          this.loadClientes();
          this.resetForm(form);
        });
      }
    }
  }

  deleteCliente(id: number): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clienteService.delete(id).subscribe(() => {
        this.loadClientes();
      });
    }
  }

  editCliente(cliente: Cliente): void {
    this.cliente = { ...cliente };
    this.isEditing = true;
  }

  resetForm(form: NgForm): void {
    form.resetForm();
    this.cliente = {
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
    this.isEditing = false;
  }

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
    this.currentPage = 1;
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

    this.calculatePagination();
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
