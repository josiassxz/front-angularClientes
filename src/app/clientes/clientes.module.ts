import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { ClientesReciboComponent } from './clientes-recibo/clientes-recibo.component';

@NgModule({
  declarations: [ClientesFormComponent, ClientesListaComponent, ClientesReciboComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    TextMaskModule
  ], exports: [
    ClientesFormComponent,
    ClientesListaComponent,
  ],

})
export class ClientesModule {
  public maskDate = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
}
export class NgbdDropdownBasicModule {}
