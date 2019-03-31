import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../entity/cliente';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  listaClientes: Cliente[] = new Array;

  constructor(
    private clienteService:ClienteService,
    private router: Router
    ) { }

  ngOnInit() {
    this.buscarClientes();
  }

  buscarClientes(){
    this.clienteService.buscarClientes().subscribe(response =>{
      this.listaClientes = response;
      console.log(this.listaClientes);
    })
  }

  detelharCliente(resposta){
    this.router.navigate([`detalhar-cliente/${resposta.id}/true`]);
  }

  editarCliente(resposta){
    this.router.navigate([`editar-cliente/${resposta.id}/false`]);
  }

  excluirCliente(resposta){
    this.clienteService.excluirCliente(resposta.id).subscribe(response =>{
      this.buscarClientes();
    })
  }

  retornaTelaDeCadastro() {
    this.router.navigate([`cadastro-cliente`]);
  }

}
