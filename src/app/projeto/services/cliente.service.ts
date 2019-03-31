import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import axios from 'axios';
import {MessageService} from 'primeng/api';
import { Cliente } from '../entity/cliente';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:8080/api';


  constructor(private messageService: MessageService) { }

  buscarClientes(): Observable<Cliente[]> {
    return Observable.create(observer => {
      axios.get(this.API+'/clientes')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {

        });
    });
  }

  salvarCliente(convenio: Cliente): Observable<any> {
    return Observable.create(observer => {
      axios.post(this.API+'/clientes', convenio)
        .then((response) => {
          if (response.status === 201) {
            this.messageService.add({ severity: 'success', summary: 'Mensagem informativa:', detail: 'Inclusão realizada com sucesso.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          }
          observer.next(response.data);
          observer.complete();
        }).catch(error => 'Ocorreu um problema ao salvar o convênio')
    });
  }

  buscarClientePorId(idCliente: string): Observable<Cliente> {
    return Observable.create(observer => {
      axios.get(this.API+'/clientes/' + idCliente)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
        });
    });
  }

  editarCliente(cliente: Cliente): Observable<any> {
    return Observable.create(observer => {
      axios.put(this.API+'/clientes/editarCliente', cliente)
        .then((response) => {
          if (response.status === 200) {
            this.messageService.add({ severity: 'success', summary: 'Mensagem informativa:', detail: 'Alteração realizada com sucesso.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          }
          observer.next(response.data);
          observer.complete();
        }).catch(error => 'Ocorreu um problema ao alterar o cliente')
    });
  }

  excluirCliente(idcliente: number): Observable<any> {
    return Observable.create(observer => {
      axios.delete(this.API+'/clientes/'+ idcliente)
        .then((response) => {
          if (response.status === 200) {
            this.messageService.add({ severity: 'success', summary: 'Mensagem informativa:', detail: 'Exclusão realizada com sucesso.' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Algum erro inesperado aconteceu!' });
          }
          observer.next(response.data);
          observer.complete();
        }).catch(error => 'Ocorreu um problema ao excluir o cliente')
    });
  }
}
