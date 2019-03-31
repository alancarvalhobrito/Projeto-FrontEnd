import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../../node_modules/@angular/forms';
import { Cliente } from '../../entity/cliente';
import { Endereco } from '../../entity/endereco';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Telefone } from '../../entity/telefone';
import { Email } from '../../entity/email';
import { ClienteService } from '../../services/cliente.service';
import {MessageService} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  cliente = new Cliente();
  endereco = new Endereco();
  telefone = new Telefone();
  email = new Email();
  complemento;
  idEndereco;
  listaTelefone: Telefone[] = new Array;
  listaEmails: Email[] = new Array;
  isDisabledBtnAddTelefone = true;
  isDisabledBtnAddEmail = true;
  isCelular = false;
  numeroCelular;
  idPath;
  isDisabled;
  isDetalhamento = false;
  isEdicao = false;

  cols = [
    { field: 'tipo', header: 'Tipo' },
    { field: 'numero', header: 'Número' }
  ];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http:HttpClient,
    private clienteService:ClienteService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    this.criaFormulatio();
    this.startComponent();
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

  startComponent() {
    this.idPath = this.route.snapshot.params['id'];
    this.isDisabled = this.route.snapshot.params['disabled'];
    if(this.isDisabled == "false"){
      this.isEdicao = true;
    }
    if(this.isDisabled == "true"){
      this.isDetalhamento = true;
    }
    if (this.idPath) {
      this.clienteService.buscarClientePorId(this.idPath).subscribe(response => {
        this.cliente = response;
        this.endereco = response.endereco;
        this.idEndereco = response.endereco.id;
        this.listaTelefone = response.telefones;
        this.listaEmails = response.emails;
        this.complemento = response.endereco.complemento;
      });
    }else{
      this.retornaTelaDeCadastro();
    }

  }

  salvar(){
    if(this.listaTelefone.length && this.listaEmails){
      this.cliente.endereco = this.endereco;
      this.cliente.endereco.complemento = this.complemento;
      this.cliente.telefones = this.listaTelefone;
      this.cliente.emails = this.listaEmails;
      this.cliente.cpf = this.cliente.cpf.replace(".","").replace(".","").replace("-", "");

      this.listaTelefone.forEach(telefone => {
        if(telefone.numero.length == 10){
          telefone.numero = telefone.numero.replace('-', '').replace('_', '').replace(' ', '').replace('(', '').replace(')', '');
        }else{
          telefone.numero = telefone.numero.replace('-', '').replace('_', '').replace(' ', '').replace('.', '').replace('(', '').replace(')', '');
        }
      });

      this.cliente.endereco.cep = this.cliente.endereco.cep.replace("-","");
      if(this.cliente.id == undefined){
        this.clienteService.salvarCliente(this.cliente).subscribe(response =>{
          this.clear();
        })
      }else{
        this.cliente.endereco.id = this.idEndereco;
        this.clienteService.editarCliente(this.cliente).subscribe(response =>{
          this.clear();
        })
      }
    }else{
      this.messageService.add({ severity: 'warn', summary: 'Mensagem informativa:', detail: 'É necessário ter pelo menos 1 telefone e 1 e-mail cadastrado!' });

    }
  }

  adicionarTelefone(){
    if(this.telefone.tipo && this.telefone.numero){
      this.listaTelefone.push(this.telefone);
    }
    if(this.telefone.tipo && this.isCelular){
      this.telefone.numero = this.numeroCelular;
      this.listaTelefone.push(this.telefone);
    }
    this.telefone = new Telefone();
    this.numeroCelular = undefined;
    this.isDisabledBtnAddTelefone = true;
  }

  adicionarEmail(){
    if(this.email != undefined && this.email.email != ''){
      this.listaEmails.push(this.email);
      this.email = new Email();
    }
  }

  excluirTelefone(tel: Telefone){
    this.listaTelefone.forEach((telefone, index) => {
      if(tel.tipo == telefone.tipo && tel.numero == telefone.numero){
        this.listaTelefone.splice(index, 1);
      }
    });
  }

  excluirEmail(e: Email){
    this.listaEmails.forEach((email, index) => {
      if(e.email == email.email){
        this.listaEmails.splice(index, 1);
      }
    });
  }

  verificaBtnAddTelefoneHabilitado(){
    if(this.telefone.tipo != undefined &&
      (this.telefone.numero != undefined && this.telefone.numero.replace('-', '').replace('_', '').replace(' ', '').replace('(', '').replace(')', '').length > 9
      || this.numeroCelular != undefined && this.numeroCelular.replace('-', '').replace('_', '').replace(' ', '').replace('.', '').replace('(', '').replace(')', '').length > 10)){
      this.isDisabledBtnAddTelefone = false
    }else{
      this.isDisabledBtnAddTelefone = true
    }
  }

  verificaBtnAddEmailHabilitado(){
    if(this.email != undefined && this.email.email != ''){
      this.isDisabledBtnAddEmail = false
    }else{
      this.isDisabledBtnAddEmail = true
    }
  }

  verificatipoTelefone(){
    if(this.telefone.tipo == "Celular"){
      this.isCelular = true;
    }else{
      this.isCelular = false;
    }
  }

  clear(){
    this.formularioCliente.reset();
    this.endereco = new Endereco();
    this.telefone = new Telefone();
    this.email = new Email();
    this.numeroCelular = undefined;
    this.listaTelefone = new Array;
    this.listaEmails = new Array;
  }

  retornaTelaDeCadastro() {
    this.router.navigate([`cadastro-cliente`]);
  }

  retornaTelaDeConculta(){
    this.router.navigate([`consulta-cliente`]);
  }

  editarCliente(){
    this.router.navigate([`editar-cliente/${this.idPath}/false`]);
  }

  buscarCep(){
    if(this.endereco != undefined && this.endereco.cep != undefined && this.endereco.cep.replace('-', '').replace('_', '').length == 8){
      return this.http
      .get(`https://viacep.com.br/ws/${this.endereco.cep.replace('-', '')}/json/`).subscribe(data => this.endereco = this.converterRespostaParaCep(data));
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
