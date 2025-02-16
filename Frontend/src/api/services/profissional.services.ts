import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Profissional {
  CodProf: number;
  NmProf: string;
  CpfProf: string;
  DocReg: string;
  FoneProf: string;
  EmailProf: string;
  AtivProfi: string;
  DtCad?: Date; // Data de cadastro (opcional)
}

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {
  private readonly PATH: string = '/profissional'; // Endpoint para a tabela profissional

  constructor(private http: HttpClient) {}

  // Obtém a lista de profissionais
  getProfissionais(): Observable<Profissional[]> {
    const headers = this.getHeaders();
    return this.http.get<Profissional[]>(`${environment.baseUrl}${this.PATH}`, { headers });
  }

  // Obtém um profissional pelo ID
  getProfissionalById(id: number): Observable<Profissional> {
    const headers = this.getHeaders();
    return this.http.get<Profissional>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });
  }

  // Cria um novo profissional
  create(profissional: Profissional): Observable<Profissional> {
    const headers = this.getHeaders();
    return this.http.post<Profissional>(`${environment.baseUrl}${this.PATH}`, profissional, { headers });
  }

  // Atualiza um profissional existente
  update(profissional: Profissional): Observable<Profissional> {
    const headers = this.getHeaders();
    return this.http.put<Profissional>(`${environment.baseUrl}${this.PATH}/${profissional.CodProf}`, profissional, { headers });
  }

  // Exclui um profissional pelo ID
  delete(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });
  }

  // Método privado para obter os headers com autenticação
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
