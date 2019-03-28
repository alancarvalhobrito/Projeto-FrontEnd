import { Endereco } from './endereco';
import { Telefone } from './telefone';

export class Cliente {
    public nome: string;
    public cpf: string;
    public endereco: Endereco;
    public telefones: Array<Telefone>;
}