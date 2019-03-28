import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = "/api/clientes/";


  constructor() { }

  buscarClientes(): Observable<Object[]> {
    return Observable.create(observer => {
      axios.get(this.API)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {

        });
    });
  }
}
