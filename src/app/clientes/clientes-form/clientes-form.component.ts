
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success = false;
  errors: string[];
  id: number;



  constructor(private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    const params: Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
        this.id = urlParams.id;
        if (this.id){
          this.service
            .getClienteById(this.id)
            .subscribe(
              response => this.cliente = response ,
              errorResponse => this.cliente = new Cliente()
            );
        }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista']);
  }


  onSubmit(){
    this.montaObjetoParaSalvar();
    if (this.id){

      this.service
        .atualizar(this.cliente)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.'];
        });


    }else{

      this.service
        .salvar(this.cliente)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.cliente = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          });

    }

  }

  valorLiquido(){
    const result = this.cliente.valorServico -  Number(this.cliente.gru);
    return Number.isNaN(result) ? 0 : result;
  }

  valorReceber(){
    const result = this.cliente.valorServico - this.cliente.recebibo;
    return Number.isNaN(result) ? 0 : result;
  }

  montaObjetoParaSalvar(){
    this.cliente.areceber = this.valorReceber();
    this.cliente.valorLiquido = this.valorLiquido();

  }




}
