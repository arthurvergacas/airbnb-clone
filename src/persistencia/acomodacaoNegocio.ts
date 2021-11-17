import  mongoose from 'mongoose';
import { Acomodacao} from '../entidades/acomodacao';
import { AcomodacaoRepositorio } from './acomodacaoRepositorio';

  export async function criarAcomodacao(nome: string, idLocador: string, descricao: string, categoria: string,imagem: string, preco: number, cidade: string, estado: string,pais: string, cep: number, numeroDePessoas: number,quartos: number, banheiros: number, fumar: boolean, animais: boolean) {
    if (nome && descricao && categoria && imagem && preco && cidade && estado && pais && cep &&numeroDePessoas && quartos &&quartos && banheiros && fumar && animais) {
        const acomodacoes: Acomodacao = {
          nome: nome,
          idLocador: idLocador,
          descricao: descricao,
          categoria: categoria,
          imagem: imagem,
          preco: preco,
          numeroDePessoas: numeroDePessoas,
          cidade: cidade,
          estado: estado,
          pais: pais,
          cep: cep,
          quartos: quartos,
          banheiros: banheiros,
          fumar: fumar,
          animais: animais,
        }
        return await AcomodacaoRepositorio.criar(acomodacoes);
    } else {
       throw new Error('Verifique as informações e tente novamente');
      
    }
  }