import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Produto {
  id: number;
  Fornecedor_id: number;
  DsProdt: string;
  NmAbr: string;
  DtCad: Date;
  UnMedida: string;
  TpCateg: string;
  QtdEstoq: number;
  DtUltComp: Date;
  VrUltComp: number;
  DtPenultComp: Date;
  VrPenultComp: number;
  Dtvenc: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private readonly PATH: string = '/produtos';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    const headers = this.getHeaders();
    return this.http.get<Produto[]>(`${environment.baseUrl}${this.PATH}`, { headers });
  }

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${environment.baseUrl}${this.PATH}/${id}`);
  }

  create(produto: Produto): Observable<Produto> {
    const headers = this.getHeaders();
    return this.http.post<Produto>(`${environment.baseUrl}${this.PATH}`, produto, { headers });
  }

  update(produto: Produto): Observable<Produto> {
    const headers = this.getHeaders();
    return this.http.put<Produto>(`${environment.baseUrl}${this.PATH}/${produto.id}`, produto, { headers });
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
