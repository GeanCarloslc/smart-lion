import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecursosUsuario } from "../model/RecursosUsuario";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Page } from '../model/Page';
import { catchError } from "rxjs/operators";

@Injectable()
export class RecursosUsuarioService {
  private readonly requestMapping: string = "/api/meta-gasto";

  constructor(private http: HttpClient) {}

  buscarTodas(
    page: number,
    size: number,
    sort: string
  ): Observable<Page<RecursosUsuario>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http
      .get<Page<RecursosUsuario>>(
        `${environment.apiBaseUrl}${this.requestMapping}/buscar-todas`, { params }
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar recursos:', error);
          return throwError(() => error); // Propaga o erro para quem consome o serviço
        })
      );
  }

  salvar(recursosUsuario: RecursosUsuario): Observable<void> {
    return this.http
      .post<void>(
        `${environment.apiBaseUrl}${this.requestMapping}/salvar`,
        recursosUsuario
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao salvar recurso:', error);
          return throwError(() => error); // Propaga o erro para quem consome o serviço
        })
      );
  }

  excluir(recursosUsuarios: RecursosUsuario[]): Observable<void> {
    let ids = recursosUsuarios.map(r => r.id);
    const url = `${environment.apiBaseUrl}${this.requestMapping}/excluir`;
    return this.http
      .delete<void>(url, { body: ids }) // Envia apenas os IDs, sem o "ids" como chave
      .pipe(
        catchError((error) => {
          console.error('Erro ao deletar recursos:', error);
          return throwError(() => error); // Propaga o erro para quem consome o serviço
        })
      );
  }
}
