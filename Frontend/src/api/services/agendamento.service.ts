import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Certifique-se de que o arquivo `environment.ts` existe e está configurado

export interface Servico {
  IdServico: number;
  DescricaoServico: string;
  Valor: number;
}

export interface Atendimento {
  servicos: Servico[];
  CodAtend: number;
  Codcli: number;
  DtAgen?: Date;
  DtCad?: Date;
  DtVenda?: Date;
  Obs?: string;
  Staatend?: number; // Estado do Atendimento
  atendServ?: {
    Obs: string;
    CodServ: number;
    CodProf: number;
    DtAgen: string;
    VrServ: string;
    [key: string]: any; // Permite outras propriedades opcionais
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private readonly PATH: string = '/atendimento';

  constructor(private http: HttpClient) {}

  // Buscar todos os agendamentos
  getAgendamentos(): Observable<Atendimento[]> {
    const headers = this.getHeaders();
    return this.http.get<Atendimento[]>(`${environment.baseUrl}${this.PATH}`, { headers });
  }

  // Buscar cliente pelo código
  getCliente(codCli: number): Observable<{ NmCli: string }> {
    const headers = this.getHeaders();
    return this.http.get<{ NmCli: string }>(`${environment.baseUrl}/cliente/${codCli}`, { headers });
  }

  // Gerar cabeçalho para requisições com autenticação
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}