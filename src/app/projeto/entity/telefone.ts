import { Cliente } from './cliente';

export class Telefone {
    public id: number;
    public numero: string;
    public tipo: string;
    public cliente: Cliente;
}