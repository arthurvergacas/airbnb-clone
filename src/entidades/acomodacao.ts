
import  mongoose, { model, Schema }  from "mongoose";

export interface Acomodacao {
    nome: string;
    idLocador: string;
    descricao: string;
    categoria: string;
    imagem: string;
    preco: number;
    cidade: string;
    estado: string;
    pais: string;
    cep: number;
    numeroDePessoas: number;
    quartos: number;
    banheiros: number;
    fumar: boolean;
    animais: boolean;
    
}

export const AcomodacaoSchema = new Schema<Acomodacao>({
    nome: { type: String, required: true },
    idLocador: { type:String, required: true }, 
    descricao: { type: String, required: true },
    categoria: { type: String, required: true },
    imagem: { type: String, required: true },
    preco: { type: Number, required: true },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
    pais: { type: String, required: true },
    cep: { type: Number, required: true },
    numeroDePessoas: { type: Number, required: true },
    quartos: { type: Number, required: true },
    banheiros: { type: Number, required: true },
    fumar: { type: Boolean },
    animais: { type: Boolean },
    
});

export const AcomodacaoModel = model<Acomodacao>("Acomodacao", AcomodacaoSchema, "acomodacoes");
