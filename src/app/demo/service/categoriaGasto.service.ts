import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategoriaGasto } from "../model/CategoriaGasto";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";

@Injectable()
export class CategoriaGastoService {
  private readonly requestMapping: string = "/api/categoria-gasto";

  constructor(private http: HttpClient) {}

  buscarDadosDropdown(): Observable<CategoriaGasto[]> {
    return this.http
      .get<CategoriaGasto[]>(
        `${environment.apiBaseUrl}${this.requestMapping}/buscar-dados-dropdown`,
      )
      .pipe(
        catchError((error) => {
          console.error('Erro ao buscar categorias de gasto:', error);
          return throwError(() => error);
        })
      );
  }
}
