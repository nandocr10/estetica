import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Fornecedor {
  id: number;
  CnpjFor: string;
  NmFor: string;
  FoneFor: string;
  EmailFor: string;
  DtCad: Date;
}

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private readonly PATH: string = '/fornecedor';

  constructor(private http: HttpClient) {}

  getFornecedores(): Observable<Fornecedor[]> {
    const headers = this.getHeaders();
    return this.http.get<Fornecedor[]>(`${environment.baseUrl}${this.PATH}`, { headers });
  }

  getFornecedorById(id: number): Observable<Fornecedor> {
    const headers = this.getHeaders();
    return this.http.get<Fornecedor>(`${environment.baseUrl}${this.PATH}/${id}`, { headers });
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    const headers = this.getHeaders();
    return this.http.post<Fornecedor>(`${environment.baseUrl}${this.PATH}`, fornecedor, { headers });
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    const headers = this.getHeaders();
    return this.http.put<Fornecedor>(`${environment.baseUrl}${this.PATH}/${fornecedor.id}`, fornecedor, { headers });
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
