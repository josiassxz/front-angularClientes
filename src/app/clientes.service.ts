import { Injectable, NgModule } from '@angular/core';
import { Cliente } from './clientes/cliente';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  findSearchNome(nomeFiltro: string): Observable<Cliente[]> {
    let params = new HttpParams();
    params = params.append('nomeFiltro', nomeFiltro);
    // params = params.append('_limit', 10);

    return this.http.get<any>(
      'http://localhost:8080/api/clientes/pesquisaFiltro',
      {
        params: params,
      }
    );
  }

  constructor(private http: HttpClient) {}

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(
      'http://localhost:8080/api/clientes',
      cliente
    );
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(
      `http://localhost:8080/api/clientes/${cliente.id}`,
      cliente
    );
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`http://localhost:8080/api/clientes/${id}`);
  }

  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/api/clientes/${cliente.id}`
    );
  }
}
