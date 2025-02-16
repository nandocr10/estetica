import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Servico {
  CodServ: number;
  DsServ?: string;
  DtCad?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private readonly PATH: string = '/servico';

  constructor(private http: HttpClient) {}

  getServicos(): Observable<Servico[]> {
    const headers = this.getHeaders();
    return this.http.get<Servico[]>(`${environment.baseUrl}${this.PATH}`, { headers });
  }

  getServicoById(id: number): Observable<Servico> {
    const headers = this.getHeaders();
    return this.http.get<Servico>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });
  }

  create(servico: Servico): Observable<Servico> {
    const headers = this.getHeaders();
    return this.http.post<Servico>(`${environment.baseUrl}${this.PATH}`, servico, { headers });
  }

  update(servico: Servico): Observable<Servico> {
    const headers = this.getHeaders();
    return this.http.put<Servico>(`${environment.baseUrl}${this.PATH}/${servico.CodServ}`, servico, { headers });
  }

  delete(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
