import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Endereco } from '../entity/endereco';


@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  resultado:Endereco;

  constructor(private http:HttpClient) { }

  buscarEndereco(cep:string): Observable<Object> {
    return Observable.create(observer => {
      axios.get('viacep.com.br/ws/' + cep +'/json/')
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch(error => {

        });
    });
  }

  buscar(cep:string){
    return this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`).subscribe(data => this.resultado = this.converterRespostaParaCep(data));
      }
    
      private converterRespostaParaCep(cepNaResposta):Endereco{
        let endereco = new Endereco();
        endereco.cep = cepNaResposta.cep;
        endereco.logradouro = cepNaResposta.logradouro;
        endereco.complemento = cepNaResposta.complemento;
        endereco.bairro = cepNaResposta.bairro;
        endereco.cidade = cepNaResposta.localidade;
        endereco.uf = cepNaResposta.uf;
    
        return endereco;
      }
}
