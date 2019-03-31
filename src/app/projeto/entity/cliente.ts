import { Endereco } from './endereco';
import { Telefone } from './telefone';
import { Email } from './email';

export class Cliente {
    public id: number;
    public nome: string;
    public cpf: string;
    public endereco: Endereco;
    public telefones: Array<Telefone>;
    public emails: Array<Email>;
}