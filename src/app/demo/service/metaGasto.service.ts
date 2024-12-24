import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MetaGasto } from "../model/MetaGasto";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Page } from '../model/Page';
import { catchError } from "rxjs/operators";

@Injectable()
export class MetaGastoService {
  private readonly requestMapping: string = "/api/meta-gasto";

  constructor(private http: HttpClient) {}

  buscarTodas(
    recursosUsuarioId: number,
    page: number,
    size: number,
    sort: string
  ): Observable<Page<MetaGasto>> {
    const params = new HttpParams()
      .set('recursosUsuarioId', recursosUsuarioId.toString())
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
  
    return this.http
      .get<Page<MetaGasto>>(
        `${environment.apiBaseUrl}${this.requestMapping}/buscar-todas`, { params }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar metas de gasto:', error);
          return throwError(() => error);
        })
      );
  }

  salvar(metaGasto: MetaGasto): Observable<void> {
    return this.http
      .post<void>(
        `${environment.apiBaseUrl}${this.requestMapping}/salvar`,
        metaGasto
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao salvar recurso:', error);
          return throwError(() => error);
        })
      );
  }

  atualizar(id: Number, metaGasto: MetaGasto): Observable<void> {
    const url = `${environment.apiBaseUrl}${this.requestMapping}/atualizar/${id}`;
    return this.http
      .patch<void>(url, metaGasto)
      .pipe(
        catchError((error) => {
          console.error(`Erro ao atualizar meta gasto com ID ${id}:`, error);
          return throwError(() => error);
        })
      );
  }

  excluir(metaGastos: MetaGasto[]): Observable<void> {
    let ids = metaGastos.map(r => r.id);
    const url = `${environment.apiBaseUrl}${this.requestMapping}/excluir`;
    return this.http
      .delete<void>(url, { body: ids })
      .pipe(
        catchError((error) => {
          console.error('Erro ao deletar recursos:', error);
          return throwError(() => error); // Propaga o erro para quem consome o serviço
        })
      );
  }
}
