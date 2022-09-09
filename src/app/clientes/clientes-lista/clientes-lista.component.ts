import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;
  model: any;

  constructor(private service: ClientesService, private router: Router) {}

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe((resposta) => (this.clientes = resposta));
  }

  novoCadastro() {
    this.router.navigate(['/clientes-form']);
  }

  imprimir() {
    window.print();
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.deletarCliente();
  }

  deletarCliente() {
    this.service.deletar(this.clienteSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'Cliente deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.')
    );
  }
  typeahead: FormControl = new FormControl();

  nomeFiltro = 'nome';

  onChangeSearch(val: string) {
    this.nomeFiltro = val;
  }

  onFocused(e) {
    // do something when input is focuse
  }
  pesquisaTeste() {
    this.service
      .findSearchNome(this.nomeFiltro)
      .subscribe((resposta) => (this.clientes = resposta));
  }
}
