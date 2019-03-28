import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  listaClientes: Array<any>;

  constructor(
    private clienteService:ClienteService) { }

  ngOnInit() {
    this.buscarClientes();
  }

  buscarClientes(){
    this.clienteService.buscarClientes().subscribe(response =>{
      this.listaClientes = response;
      console.log(this.listaClientes);
    })
  }

}
