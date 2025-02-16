import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute para capturar parâmetros da URL
import { AtendServ, AtendServService } from 'src/api/services/atendserv.services';
import { ServicoService } from 'src/api/services/servico.services';
import { ProfissionalService } from 'src/api/services/profissional.services';
import { Servico } from 'src/api/services/servico.services';
import { NgForm } from '@angular/forms';
import { Profissional } from 'src/api/services/profissional.services';
import { AtendimentoService, Atendimento } from 'src/api/services/atendimento.services';
import { ClienteService, Cliente } from 'src/api/services/cliente.services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atendserv-list',
  templateUrl: './atendserv-list.component.html',
  styleUrls: ['./atendserv-list.component.css']
})
export class AtendServListComponent implements OnInit {
  atendServs: AtendServ[] = [];
  servicos: Servico[] = [];
  clientes: Cliente[] = [];
  atendimentos: Atendimento[] = [];
  profissionais: Profissional[] = [];
  atendimento: AtendServ = this.resetAtendimento();
  isEditing: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  codAtend: number; // Variável para armazenar o código do atendimento
  codCli: number;
  nomeCliente: string = '';

  constructor(
    private atendServService: AtendServService,
    private servicoService: ServicoService,
    private profissionalService: ProfissionalService,
    private atendimentoService: AtendimentoService,
    private clienteService: ClienteService,
    private route: ActivatedRoute, // Injeta ActivatedRoute para capturar parâmetros da URL
    private location: Location
  ) {}

  exibirPreview: boolean = false;

  onImageSelected(event: string, fieldName: string) {
    if (event) {
      this.atendimento[fieldName] = event;
      this.exibirPreview = true; // Ativa a exibição do preview somente após seleção
    } else {
      this.atendimento[fieldName] = null;
      this.exibirPreview = false; // Desativa o preview se o campo for limpo
    }
  }

  ngOnInit(): void {
    // Captura o código do atendimento da URL
    this.codAtend = +this.route.snapshot.paramMap.get('codAtend');
    this.codCli = +this.route.snapshot.paramMap.get('codCli');
    this.atendimento.CodAtend =   this.codAtend;
    console.log('Código do Atendimento recebido:', this.codAtend);
    console.log('Código do Cliente recebido:', this.codCli);
    this.clienteService.getClientes();

    // Carrega os atendimentos de serviço relacionados ao código do atendimento, se existir
    if (this.codAtend) {
      this.loadAtendServsByCodAtend();
    }
      // Carrega os atendimentos de serviço relacionados ao código do atendimento, se existir
      if (this.codCli) {
        this.clienteService.getClientes()
      }

    
    this.loadServicos();
    this.loadProfissionais();
    this.loadAtendimentos();
    this.loadClientes(); // Carrega a lista de clientes
        
  }
  // Supondo que `atendimento.DtAgen` seja um objeto Date, você pode formatar assim:
formatDateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
  // Adicione este método dentro da classe AtendimentoListComponent
  getNomeCliente(codcli: number): string {
    const cliente = this.clientes.find(c => c.Codcli === this.codCli);
    return cliente ? cliente.NmCli : 'Cliente não encontrado';
  }

  loadAtendimentos(): void {
    this.atendimentoService.getAtendimentos().subscribe(
      (data: Atendimento[]) => this.atendimentos = data,
      (error) => this.handleError('Erro ao carregar atendimentos', error)
    );
    this.clienteService.getClientes()
  }

  loadServicos(): void {
    this.servicoService.getServicos().subscribe(
      (data: Servico[]) => this.servicos = data,
      (error) => this.handleError('Erro ao carregar serviços', error)
    );
  }
  getNomeProfissional(codProf: number): string {
    const profissional = this.profissionais.find(p => p.CodProf === codProf);
    return profissional ? profissional.NmProf : 'Profissional não encontrado';
  }
  
  loadProfissionais(): void {
    this.profissionalService.getProfissionais().subscribe(
      (data: Profissional[]) => this.profissionais = data,
      (error) => this.handleError('Erro ao carregar profissionais', error)
    );
  }

  // Método para carregar os atendimentos de serviço filtrados pelo código do atendimento
  loadAtendServsByCodAtend(): void {
    this.atendServService.getAtendServs().subscribe(
      (data: AtendServ[]) => {
        this.atendServs = data.filter(atend => atend.CodAtend === this.codAtend);
      },
      (error) => this.handleError('Erro ao carregar atendimentos de serviço', error)
    );
  }

  if (codCli) {
    this.setNomeCliente();
  }

    // Método para buscar o nome do cliente pelo código do cliente
    setNomeCliente(): void {
      const cliente = this.clientes.find(c => c.Codcli === this.codCli);
      this.nomeCliente = cliente ? cliente.NmCli : 'Cliente não encontrado';
    }
  
  loadClientes(): void {
    this.clienteService.getClientes().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
        this.setNomeCliente(); // Atualiza o nome do cliente após carregar a lista
      },
      (error) => this.handleError('Erro ao carregar clientes', error)
    );
  }

  getServicoNome(codServ: number): string {
    const servico = this.servicos.find(s => s.CodServ === codServ);
    return servico ? servico.DsServ : 'Serviço não encontrado';
  }

  selectedFiles: { [key: string]: File } = {};

  onFileSelected(event: any, field: string) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
    }
    this.selectedFiles[field] = null;
    this.atendimento[field] = null;
  }

  uploadPhoto(field: string) {
    const file = this.selectedFiles[field];
    if (file) {
      console.log(`Uploading ${file.name} for ${field}`);
      // Chame um serviço para fazer o upload do arquivo
    } else {
      console.log(`No file selected for ${field}`);
    }
    this.selectedFiles[field] = null;
    this.atendimento[field] = null;
  }

  resetAtendimento(): AtendServ {
    return {
      CodAtend: 0,
      CodServ: 0,
      CodProf: null,
      DtAgen: null,
      FtEnt01: null,
      FtEnt02: null,
      FtRet01: null,
      FtRet02: null,
      VrServ: null,
      PercComis: null,
      Obs: ''
    };
  }

  onSubmit(atendimentoForm: NgForm): void {
    this.atendimento.CodAtend =   this.codAtend;
    if (this.isEditing) {
      this.updateAtendServ();
    } else {
      this.createAtendServ();
    }
    //atendimentoForm.resetForm();
    //atendimentoForm.resetForm(); // Garante o reset do formulário
    this.atendimento = this.resetAtendimento(); // Reset explícito do modelo
  }

  createAtendServ(): void {
    this.atendServService.create(this.atendimento).subscribe(
      (data) => {
        this.atendServs.push(data);
        this.successMessage = 'Atendimento de serviço criado com sucesso!';
        this.errorMessage = '';
        this.atendimento = this.resetAtendimento();
      },
      (error) => this.handleError('Erro ao criar atendimento de serviço', this.errorMessage)
    );
  }

  updateAtendServ(): void {
    this.atendServService.update(this.atendimento).subscribe(
      () => {
        const index = this.atendServs.findIndex(
          (a) => a.CodAtend === this.atendimento.CodAtend && a.CodServ === this.atendimento.CodServ
        );
        if (index > -1) {
          this.atendServs[index] = { ...this.atendimento };
        }
        this.ngOnInit(); // Recarrega a lista de atendimentos de serviço
        this.successMessage = 'Atendimento de serviço atualizado com sucesso!';
        this.errorMessage = '';
        this.isEditing = false;
        //this.atendimento = this.resetAtendimento();
      },
      (error) => this.handleError('Erro ao atualizar atendimento de serviço', error)
    );
  }

  editAtendServ(CodAtend: number, CodServ: number): void {
    this.atendServService.getAtendServ(CodAtend, CodServ).subscribe(
      (data) => {
        this.atendimento = { ...data };
        this.isEditing = true;
        this.successMessage = '';
        this.errorMessage = '';
      },
      (error) => this.handleError('Erro ao carregar atendimento de serviço para edição', error)
    );
  }

  deleteAtendServ(CodAtend: number, CodServ: number): void {
    if (confirm('Tem certeza que deseja excluir este atendimento de serviço?')) {
      this.atendServService.delete(CodAtend, CodServ).subscribe(
        () => {
          this.atendServs = this.atendServs.filter(
            (a) => a.CodAtend !== CodAtend || a.CodServ !== CodServ
          );
          this.successMessage = 'Atendimento de serviço excluído com sucesso!';
          this.errorMessage = '';
        },
        (error) => this.handleError('Erro ao excluir atendimento de serviço', error)
      );
    }
  }

  createNew(): void {
    this.atendimento = this.resetAtendimento();
    this.isEditing = false;
    this.successMessage = '';
    this.errorMessage = '';
  }

  private handleError(message: string, error: any): void {
    this.errorMessage = message;
    console.error(message, error);
  }

  formatCurrency(event: any, fieldName: string): void {
    let value = event.target.value;
    value = value.replace(/[^0-9,.-]+/g, ''); // Remove caracteres inválidos
    value = parseFloat(value.replace(',', '.')).toFixed(2).replace('.', ',');
    this.atendimento[fieldName] = value;
  }
  
  formatPercentage(event: any, fieldName: string): void {
    let value = event.target.value;
    value = value.replace(/[^0-9,.-]+/g, ''); // Remove caracteres inválidos
    value = parseFloat(value.replace(',', '.')).toFixed(2).replace('.', ',');
    this.atendimento[fieldName] = value;
  }
  formatDecimalValue(field: string): void {
    const value = this.atendimento[field]?.toString() || '';
    // Remove tudo que não for número ou vírgula
    let cleanedValue = value.replace(/[^\d,]/g, '');
  
    // Substitui a vírgula por ponto para manipulação decimal
    cleanedValue = cleanedValue.replace(',', '.');
  
    // Converte para número decimal
    const numericValue = parseFloat(cleanedValue);
    if (!isNaN(numericValue)) {
      // Formata para 2 casas decimais
      this.atendimento[field] = numericValue.toFixed(2).replace('.', ',');
    } else {
      this.atendimento[field] = '';
    }
  }
  
  voltar() {
    this.location.back();
  }
  
 
}
