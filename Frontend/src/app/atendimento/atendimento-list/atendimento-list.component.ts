import { Component, OnInit } from '@angular/core';
import { AtendimentoService, Atendimento } from 'src/api/services/atendimento.services';
import { ClienteService, Cliente } from 'src/api/services/cliente.services';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styleUrls: ['./atendimento-list.component.css']
})
export class AtendimentoListComponent implements OnInit {
  atendimentos: Atendimento[] = [];
  clientes: Cliente[] = [];
  atendimentosFiltrados: Atendimento[] = [];
  atendimento: Atendimento = {
    CodAtend: 0,
    Codcli: 0,
    DtAgen: new Date(),
    DtCad: new Date(),
    DtVenda: new Date(),
    Obs: '',
    servicos: []
  };
  isEditing: boolean = false;
  successMessage: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private atendimentoService: AtendimentoService,
    private clienteService: ClienteService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  getStatusText(staatend: any): string {
    console.log('Estado recebido:', staatend); // Para ver o que está chegando na função
  
    const statusMap: { [key: string]: string } = {
      '1': 'Ativo',
      '2': 'Em Atendimento',
      '3': 'Encerrado'
    };
  
    return statusMap[staatend?.toString()] || 'Desconhecido';
  }

  loadData(): void {
    forkJoin([
      this.clienteService.getClientes(),
      this.atendimentoService.getAtendimentos()
    ]).subscribe(([clientes, atendimentos]) => {
      this.clientes = clientes;
      this.atendimentos = atendimentos;
      this.atendimentosFiltrados = atendimentos;
      this.calculateTotalPages();
      this.cdRef.detectChanges();
    });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.atendimentosFiltrados.length / this.itemsPerPage);
  }

  filtrarAtendimentos() {
    const searchLower = this.searchTerm.toLowerCase();
    if (!searchLower) {
      this.atendimentosFiltrados = this.atendimentos;
    } else {
      this.atendimentosFiltrados = this.atendimentos.filter(atendimento =>
        this.getNomeCliente(atendimento.Codcli).toLowerCase().includes(searchLower)
      );
    }
    this.calculateTotalPages();
  }

  getNomeCliente(codcli: number): string {
    const cliente = this.clientes.find(c => c.Codcli === codcli);
    return cliente ? cliente.NmCli : 'Cliente não encontrado';
  }

  changePage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.atendimentoService.createFullAtendimento(this.atendimento).subscribe(
        () => {
          this.successMessage = 'Novo atendimento inserido com sucesso!';
          this.loadData();
          form.resetForm();
        },
        error => console.error('Erro ao criar atendimento:', error)
      );
    }
  }

  deleteAtendimento(id: number): void {
    if (confirm('Deseja realmente excluir este atendimento?')) {
      this.atendimentoService.delete(id).subscribe(() => {
        this.successMessage = 'Atendimento excluído com sucesso!';
        this.loadData();
      });
    }
  }
}


