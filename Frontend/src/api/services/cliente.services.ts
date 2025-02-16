import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Cliente {
  Codcli: number;
  NmCli: string;
  CpfCli: string;
  FoneCli: string;
  EmailCli: string;
  EndCli: string;
  CepCli: string;
  ComplCli: string;
  redesocial: string;
  DtUltCompra: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly PATH: string = '/cliente';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    const headers = this.getHeaders();
    return this.http.get<Cliente[]>(`${environment.baseUrl}${this.PATH}`, { headers });
  }

  getClienteById(id: number): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.http.get<Cliente>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });
  }

  create(cliente: Cliente): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.http.post<Cliente>(`${environment.baseUrl}${this.PATH}`, cliente, { headers });
  }

  update(cliente: Cliente): Observable<Cliente> {
    const headers = this.getHeaders();
    return this.http.put<Cliente>(`${environment.baseUrl}${this.PATH}/${cliente.Codcli}`, cliente, { headers });
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
