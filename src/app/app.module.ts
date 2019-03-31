import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {InputMaskModule} from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';







import { CadastroClienteComponent } from './projeto/pages/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './projeto/pages/consulta-cliente/consulta-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroClienteComponent,
    ConsultaClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputMaskModule,
    FormsModule,
    ToastModule
  ],
  providers: [
    FormBuilder,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
