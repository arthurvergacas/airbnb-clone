import { Request, Response, NextFunction} from "express";
import { Acomodacao } from "../entidades/acomodacao";
import {  criarAcomodacao } from '../persistencia/acomodacaoNegocio';


export async function criar(req: Request, res: Response, next: NextFunction) {
    
   try {
   
    const { nome, idLocador, descricao, categoria, imagem, preco, cidade, estado,pais,cep,numeroDePessoas, quartos,banheiros, fumar,animais} = req.body;
    
    
    if (nome && idLocador&& descricao && categoria && imagem && preco && cidade && estado && pais && cep && numeroDePessoas &&quartos && banheiros && fumar && animais) {

       
       let acomodacoes: Acomodacao =  await criarAcomodacao(nome, idLocador, descricao, categoria,imagem, preco, cidade, estado,pais,cep,numeroDePessoas, quartos,banheiros, fumar,animais);

       
       if (acomodacoes){
            res.json({acomodacoes});
    
        } else {
            res.status(400).send('Cadastro não pode ser realizado');
        }

       
   } else {
       res.status(400).send('Dados incompletos');
    }
 
 } catch (error) {
    next(error);
}

}

export function getAcomodacaoErro(request: Request, res: Response): void {
  throw new Error('Algo deu errado!');
}
