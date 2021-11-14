import { Request, Response, NextFunction} from "express";
import { validationResult } from "express-validator";
import { AcomodacaoModel, Acomodacao } from "../entidades/acomodacao";
import {  criarAcomodacao } from '../persistencia/acomodacaoNegocio';


export function getAcomodacao(req: Request, res: Response) {
    res.send('Alô, Mundo!');
}

export async function criar(req: Request, res: Response, next: NextFunction) {
  try {
    const { nome, idLocador, descricao, categoria, imagem, preco, local, numeroDePessoas, comodidades, regras } = req.body;
    
    if (nome && idLocador && descricao && categoria && imagem && preco && local && numeroDePessoas && comodidades && regras ) {

        let acomodacoes: Acomodacao =  await criarAcomodacao(nome, idLocador, descricao, categoria, imagem, preco, local, numeroDePessoas, comodidades, regras);

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
