import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService, Atendimento } from 'src/api/services/atendimento.services';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-atendimento-form',
  templateUrl: './atendimento-form.component.html',
  styleUrls: ['./atendimento-form.component.css']
})
export class AtendimentoFormComponent implements OnInit {
  atendimento: Atendimento = {
    CodAtend: 0,
    Codcli: 0,
    DtAgen: new Date(),
    DtCad: new Date(),
    DtVenda: new Date(),
    Obs: '',
    servicos: []
  };

  atendimentos: any[] = []; // Lista de atendimentos
  clienteServicos: any[] = []; // Relacionamento entre clientes e serviços

  constructor(
    private atendimentoService: AtendimentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.atendimentoService.getAtendimentoById(id).subscribe((data) => {
        this.atendimento = data;
      });
    }
    this.loadAtendimentos();
  }

  loadAtendimentos(): void {
    // Simulação de carregamento de atendimentos
    this.atendimentos = [
      { Codcli: 1, NomeCliente: 'Cliente 1', Servico: 'Corte de cabelo', DtAgen: '2025-06-01', DtVenda: '2025-06-02', Obs: 'Cliente preferencial' },
      { Codcli: 1, NomeCliente: 'Cliente 1', Servico: 'Manicure', DtAgen: '2025-06-03', DtVenda: '2025-06-04', Obs: 'Cliente preferencial' },
      { Codcli: 2, NomeCliente: 'Cliente 2', Servico: 'Pedicure', DtAgen: '2025-06-05', DtVenda: '2025-06-06', Obs: 'Cliente novo' },
      // Adicione mais atendimentos aqui...
    ];
  }

  saveAtendimento(): void {
    if (this.atendimento.CodAtend) {
      // Atualiza o atendimento existente
      this.atendimentoService.update(this.atendimento).subscribe(() => {
        this.router.navigate(['/atendimentos']);
      });
    } else {
      // Cria um novo atendimento
      this.atendimentoService.create(this.atendimento).subscribe(() => {
        this.router.navigate(['/atendimentos']);
      });
    }
  }

  exportAtendimentos(): void {
    const groupedData = this.groupAtendimentosByCliente();

    const worksheet = XLSX.utils.json_to_sheet(groupedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório de Atendimentos');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'relatorio_atendimentos.xlsx');
  }

  groupAtendimentosByCliente(): any[] {
    const grouped = this.atendimentos.reduce((acc, atendimento) => {
      const cliente = acc.find(c => c.Codcli === atendimento.Codcli);
      if (cliente) {
        cliente.Servicos.push({
          Servico: atendimento.Servico,
          DtAgen: atendimento.DtAgen,
          DtVenda: atendimento.DtVenda,
          Obs: atendimento.Obs
        });
      } else {
        acc.push({
          Codcli: atendimento.Codcli,
          NomeCliente: atendimento.NomeCliente,
          Servicos: [
            {
              Servico: atendimento.Servico,
              DtAgen: atendimento.DtAgen,
              DtVenda: atendimento.DtVenda,
              Obs: atendimento.Obs
            }
          ]
        });
      }
      return acc;
    }, []);

    // Transformar em formato plano para Excel
    const flatData = grouped.flatMap(cliente =>
      cliente.Servicos.map(servico => ({
        Codcli: cliente.Codcli,
        NomeCliente: cliente.NomeCliente,
        Servico: servico.Servico,
        DtAgen: servico.DtAgen,
        DtVenda: servico.DtVenda,
        Obs: servico.Obs
      }))
    );

    return flatData;
  }
}
