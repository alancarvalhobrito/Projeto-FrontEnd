import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { Cliente } from '../../entity/cliente';
import { Endereco } from '../../entity/endereco';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EnderecoService } from '../../services/endereco.service';


@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  cliente = new Cliente();
  endereco = new Endereco();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private enderecoService: EnderecoService,
    private http:HttpClient) { }

  ngOnInit() {
    this.criaFormulatio();
  }

  criaFormulatio(){
    this.formularioCliente = this.fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      cpf: ['', Validators.compose([Validators.required])],
      cep: ['', Validators.compose([Validators.required])],
      logradouro: ['', Validators.compose([Validators.required])],
      bairro: ['', Validators.compose([Validators.required])],
      cidade: ['', Validators.compose([Validators.required])],
      uf: ['', Validators.compose([Validators.required])]
    })
  }

  salvar(){

  }

  clear(){
    this.formularioCliente.reset();
  }

  consultar(){
    this.router.navigate([`consulta-cliente`]);
  }

  buscarCep(){
    if(this.endereco != undefined && this.endereco.cep != undefined && this.endereco.cep.length == 8){
      return this.http
      .get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`).subscribe(data => this.endereco = this.converterRespostaParaCep(data));
    }   
    console.log(this.endereco);   
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
