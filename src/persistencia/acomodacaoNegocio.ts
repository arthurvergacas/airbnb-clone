import { Acomodacao, AcomodacaoModel } from '../entidades/acomodacao';
import { AcomodacaoRepositorio } from './acomodacaoRepositorio';

  export async function criarAcomodacao(nome: string, idLocador: string, descricao: string, categoria: string,imagem: string, preco: number, local: {numero: number; rua: string; complemento: string; cidade: string; estado: string; pais: string; cep: number;}, numeroDePessoas: number, comodidades: {cozinha: number;
    banheiros: number;}, regras: { fumar: boolean;animais: boolean;}) {
    if (nome && idLocador && descricao && categoria && imagem && preco && numeroDePessoas && local && comodidades && regras ) {
        const acomodacoes: Acomodacao = {
          nome: nome,
          idLocador: idLocador,
          descricao: descricao,
          categoria: categoria,
          imagem: imagem,
          preco: preco,
          numeroDePessoas: numeroDePessoas,
          local: local,
          comodidades: comodidades,
          regras: regras
        }
        return await AcomodacaoRepositorio.criar(acomodacoes);
    } else {
        throw new Error('Verifique as informações e tente novamente');
    }
}