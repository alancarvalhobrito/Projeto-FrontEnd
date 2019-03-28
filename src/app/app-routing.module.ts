import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroClienteComponent } from './projeto/pages/cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './projeto/pages/consulta-cliente/consulta-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'cadastro-cliente', pathMatch: 'full' },
  { path: 'cadastro-cliente', component: CadastroClienteComponent },
  { path: 'consulta-cliente', component: ConsultaClienteComponent },
  { path: '**', redirectTo: 'cadastro-cliente' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
