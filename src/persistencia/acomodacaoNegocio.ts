import  mongoose from 'mongoose';
import { Acomodacao} from '../entidades/acomodacao';
import { AcomodacaoRepositorio } from './acomodacaoRepositorio';

  export async function criarAcomodacao(nome: string, idLocador: mongoose.Schema.Types.ObjectId, descricao: string, categoria: string,thumbnail: string, preco: number, local: {rua: string; numero: number; complemento: string; cidade: string; estado: string; pais: string; cep: number;}, numeroDePessoas: number, comodidades: {quartos: number; banheiros: number;}, regras: { fumar: boolean; animais: boolean;}) {
    //if (nome && descricao && categoria && thumbnail && preco && numeroDePessoas && local && comodidades && regras ) {
        const acomodacoes: Acomodacao = {
          nome: nome,
          idLocador: idLocador,
          descricao: descricao,
          categoria: categoria,
          thumbnail: thumbnail,
          preco: preco,
          numeroDePessoas: numeroDePessoas,
          local: local,
          comodidades: comodidades,
          regras: regras
        }
        return await AcomodacaoRepositorio.criar(acomodacoes);
    } //else {
       //throw new Error('Verifique as informações e tente novamente');
      
    