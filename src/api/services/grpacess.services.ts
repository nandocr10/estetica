import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationType } from '../models/pagination';
import { GrpAcess } from '../models/grpacess';

type PageReturn = {
  results: GrpAcess[];
  pagination: PaginationType;
};
@Injectable()
export class GrpAcessService {
  private readonly PATH: string = '/grpacess';

  constructor(private http: HttpClient) {}

  getUnityPage(
    page = 0,
    size = 25,
    search = '',
    order = 'asc',
    sort = 'id'
  ): Observable<PageReturn> {
    return this.http.get<PageReturn>(
      environment.baseUrl +
        this.PATH +
        `/pages?page=${page}&size=${size}&search=${search}&order=${order}&sort=${sort}`
    );
  }
  getUnityById(codgrp: number): Observable<GrpAcess> {
    return this.http.get<GrpAcess>(environment.baseUrl + this.PATH + `/${codgrp}`);
  }
  insert(grpacess: GrpAcess): Observable<GrpAcess> {
    return this.http.post<GrpAcess>(environment.baseUrl + this.PATH, grpacess);
  }
  update(grpacess: GrpAcess): Observable<GrpAcess> {
    return this.http.patch<GrpAcess>(
      environment.baseUrl + this.PATH + '/' + grpacess,
      grpacess
    );
  }
  remove(codgrp: number): Observable<void> {
    return this.http.delete<void>(environment.baseUrl + this.PATH + `/${codgrp}`);
  }
}
