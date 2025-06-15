import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AtendServ {
  CodAtend: number;
  CodServ: number;
  CodProf?: number;
  DtAgen?: Date;
  FtEnt01?: string;
  FtEnt02?: string;
  FtRet01?: string;
  FtRet02?: string;
  VrServ?: number;
  PercComis?: number;
  Obs?: string;
  Tppgto?:      number;
  Stapgto?:     number;   // Campo opcional
  Percdes?:     number;   // Campo opcional
  Dtpgto?:     Date;
}

@Injectable({
  providedIn: 'root',
})
export class AtendServService {
  private readonly PATH: string = '/atendserv';

  constructor(private http: HttpClient) {}

  // Obter todos os atendimentos de serviços
  getAtendServs(): Observable<AtendServ[]> {
    const headers = this.getHeaders();
    return this.http.get<AtendServ[]>(`${environment.baseUrl}${this.PATH}`, { headers });
  }

  // Obter um atendimento de serviço específico (chave composta)
  getAtendServ(CodAtend: number, CodServ: number): Observable<AtendServ> {
    const headers = this.getHeaders();
    return this.http.get<AtendServ>(`${environment.baseUrl}${this.PATH}/${CodAtend}/${CodServ}`, { headers });
  }

  // Criar um novo atendimento de serviço
  create(atendServ: AtendServ): Observable<AtendServ> {
    const headers = this.getHeaders();
    return this.http.post<AtendServ>(`${environment.baseUrl}${this.PATH}`, atendServ, { headers });
  }

  // Atualizar um atendimento de serviço existente (chave composta)
  update(atendServ: AtendServ): Observable<AtendServ> {
    const headers = this.getHeaders();
    return this.http.put<AtendServ>(`${environment.baseUrl}${this.PATH}/${atendServ.CodAtend}/${atendServ.CodServ}`, atendServ, { headers });
  }

  // Excluir um atendimento de serviço (chave composta)
  delete(CodAtend: number, CodServ: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${environment.baseUrl}${this.PATH}/${CodAtend}/${CodServ}`, { headers });
  }

  // Obter todos os atendimentos (caso você precise de uma função separada)
  getAtendimentos(): Observable<AtendServ[]> {
    const headers = this.getHeaders();
    return this.http.get<AtendServ[]>(`${environment.baseUrl}${this.PATH}/atendimentos`, { headers });
  }

  // Método para obter os headers com autenticação JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
