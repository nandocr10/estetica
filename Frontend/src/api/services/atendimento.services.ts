import { Injectable } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { environment } from 'src/environments/environment';  

export interface Servico {  
  CodServ: number;  
  CodProf: number;  
  Obs?: string; // campo opcional  
}  

export interface Atendimento {  
  servicos: Servico[];  
  CodAtend: number;  
  Codcli: number;  
  DtAgen?: Date;  
  DtCad?: Date;  
  DtVenda?: Date;  
  Obs?: string;  
  Staatend?: number; // Adicionando o campo Estado do Atendimento
}  

@Injectable({  
  providedIn: 'root',  
})  
export class AtendimentoService {  
  private readonly PATH: string = '/atendimento';  

  constructor(private http: HttpClient) {}  

  // Buscar todos os atendimentos
  getAtendimentos(): Observable<Atendimento[]> {  
    const headers = this.getHeaders();  
    return this.http.get<Atendimento[]>(`${environment.baseUrl}${this.PATH}`, { headers });  
  }  

  // Buscar atendimento por ID
  getAtendimentoById(id: number): Observable<Atendimento> {  
    const headers = this.getHeaders();  
    return this.http.get<Atendimento>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });  
  }  

  // Criar um novo atendimento
  create(atendimento: Atendimento): Observable<Atendimento> {  
    const headers = this.getHeaders();  
    return this.http.post<Atendimento>(`${environment.baseUrl}${this.PATH}`, atendimento, { headers });  
  }  

  // Atualizar um atendimento existente
  update(atendimento: Atendimento): Observable<Atendimento> {  
    const headers = this.getHeaders();  
    return this.http.put<Atendimento>(`${environment.baseUrl}${this.PATH}/${atendimento.CodAtend}`, atendimento, { headers });  
  }  

  // Deletar atendimento
  delete(id: number): Observable<void> {  
    const headers = this.getHeaders();  
    return this.http.delete<void>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });  
  }  

  // Excluir um serviço específico de um atendimento
  deleteServico(codAtend: number, codServ: number): Observable<void> {  
    const headers = this.getHeaders();  
    return this.http.delete<void>(  
      `${environment.baseUrl}${this.PATH}/${codAtend}/servicos/${codServ}`,   
      { headers }  
    );  
  }  

  // Excluir todos os serviços de um atendimento (retorna uma lista de observáveis para execução em conjunto)
  deleteServicos(codAtend: number, servicos: Servico[]): Observable<void>[] {  
    return servicos.map((servico) => this.deleteServico(codAtend, servico.CodServ));  
  }  

  // Criar um atendimento completo (atendimento com serviços associados)
  createFullAtendimento(atendimento: Atendimento): Observable<Atendimento> {  
    const headers = this.getHeaders();  
    return this.http.post<Atendimento>(`${environment.baseUrl}${this.PATH}/full`, atendimento, { headers });  
  }  

  // Gerar cabeçalho para requisições com autenticação
  private getHeaders(): HttpHeaders {  
    const token = localStorage.getItem('token');  
    return new HttpHeaders({  
      'Authorization': `Bearer ${token}`  
    });  
  }  
}
