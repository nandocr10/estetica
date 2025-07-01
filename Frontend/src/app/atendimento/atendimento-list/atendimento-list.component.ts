import { Component, OnInit } from '@angular/core';
import { AtendimentoService, Atendimento } from 'src/api/services/atendimento.services';
import { ClienteService, Cliente } from 'src/api/services/cliente.services';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

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
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  getStatusText(staatend: any): string {
    console.log('Estado recebido:', staatend); // Para depuração

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
      console.log('Atendimentos retornados pela API:', atendimentos); // Log dos atendimentos

      this.clientes = clientes;
      this.atendimentos = atendimentos.map(atendimento => ({
        ...atendimento,
        servicos: atendimento.atendServ?.map(servico => ({
          IdServico: servico.CodServ,
          DescricaoServico: servico['servico']?.DsServ || 'Serviço não especificado', // Usa o campo correto DsServ
          Valor: parseFloat(servico.VrServ) || 0 // Converte o valor para número
        })) || [] // Garante que 'servicos' seja um array de objetos do tipo Servico
      }));

      console.log('Atendimentos após mapeamento:', this.atendimentos); // Log após mapeamento

      this.atendimentosFiltrados = this.atendimentos;
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

  exportAtendimentos(): void {
    console.log('Iniciando exportação de atendimentos...'); // Log inicial

    const atendimentosComServicos = this.atendimentosFiltrados.map(atendimento => {
      console.log('Processando atendimento:', atendimento); // Log do atendimento atual

      // Concatena descrição e valor de cada serviço
      const servicos = (atendimento.servicos || [])
        .map(servico => `${servico.DescricaoServico} (R$ ${servico.Valor.toFixed(2)})`)
        .join(', ');

      const valorTotalServicos = (atendimento.servicos || []).reduce((total, servico) => total + servico.Valor, 0); // Soma os valores dos serviços

      console.log('Serviços concatenados:', servicos); // Log dos serviços concatenados
      console.log('Valor total dos serviços:', valorTotalServicos); // Log do valor total dos serviços

      return {
        CodAtend: atendimento.CodAtend,
        NomeCliente: this.getNomeCliente(atendimento.Codcli),
        Codcli: atendimento.Codcli,
        DtAgen: atendimento.DtAgen,
        Obs: atendimento.Obs,
        Status: this.getStatusText(atendimento.Staatend),
        Servicos: servicos, // Adiciona os serviços associados ao atendimento
        ValorTotalServicos: valorTotalServicos // Adiciona o valor total dos serviços
      };
    });

    console.log('Atendimentos processados para exportação:', atendimentosComServicos); // Log dos atendimentos processados

    const worksheet = XLSX.utils.json_to_sheet(atendimentosComServicos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Atendimentos');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'relatorio_atendimentos_com_servicos.xlsx');

    console.log('Exportação concluída e arquivo gerado.'); // Log final
  }

  loadServicos(codAtend: number): void {
    this.atendimentoService.getServicosByAtendimento(codAtend).subscribe(servicos => {
      console.log('Serviços associados:', servicos); // Log dos serviços
    });
  }

  novoCliente(): void {
    this.router.navigate(['/clientes']);
  }
}


