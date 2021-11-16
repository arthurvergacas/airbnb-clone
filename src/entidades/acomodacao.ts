
import  mongoose, { model, Schema }  from "mongoose";

export interface Acomodacao {
    nome: string;
    idLocador: mongoose.Schema.Types.ObjectId;
    descricao: string;
    categoria: string;
    thumbnail: string;
    preco: number;
    local: {
        rua: string;
        numero: number;
        complemento: string;
        cidade: string;
        estado: string;
        pais: string;
        cep: number;
    };
    numeroDePessoas: number;
    comodidades: {
        quartos: number;
        banheiros: number;
    };
    regras: {
        fumar: boolean;
        animais: boolean;
    };
}

export const AcomodacaoSchema = new Schema<Acomodacao>({
    nome: { type: String, required: true },
    idLocador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true},
    descricao: { type: String, required: true },
    categoria: { type: String, required: true },
    thumbnail: { type: String, required: true },
    preco: { type: Number, required: true },
    local: {
        rua: { type: String, required: true },
        numero: { type: Number, required: true },
        complemento: { type: String },
        cidade: { type: String, required: true },
        estado: { type: String, required: true },
        pais: { type: String, required: true },
        cep: { type: Number, required: true },
    },
    numeroDePessoas: { type: Number, required: true },
    comodidades: {
        quartos: { type: Number, required: true },
        banheiros: { type: Number, required: true },
    },
    regras: {
        fumar: { type: Boolean },
        animais: { type: Boolean },
    },
});

export const AcomodacaoModel = model<Acomodacao>("Acomodacao", AcomodacaoSchema, "acomodacoes");
