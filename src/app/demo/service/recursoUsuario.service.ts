import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecursoUsuario } from "../model/RecursoUsuario";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Page } from '../model/Page';

@Injectable()
export class RecursoUsuarioService {
  constructor(private http: HttpClient) {}
  requestMapping: String = "/api/recurso-usuario";

  buscarTodos(
    descricao: string,
    page: number,
    size: number,
    sort: string
  ): Observable<Page<RecursoUsuario>> {

    const params = new HttpParams()
    .set('descricao', descricao)
    .set('page', page)
    .set('size', size)
    .set('sort', sort);

    return this.http
      .get<Page<RecursoUsuario>>(
        `${environment.apiBaseUrl}${this.requestMapping}/buscar-todos`, { params: params }
      )
      .pipe(
        (response: any) => response,
        (error: any) => error
      );
  }
}
