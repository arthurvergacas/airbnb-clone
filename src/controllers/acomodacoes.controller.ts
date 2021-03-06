import { Request, Response } from "express";
import qs from "qs";
import { AcomodacaoModel } from "../entidades/acomodacao";
import { ReservaModel } from "../entidades/reserva";

// um exemplo de uri é:
// api/v1/acomodacoes?nome=x&precoMin=0&precoMax=0&local[numero]=32&local[rua]=x&local[cidade]=x&local[estado]=x&capacidade=0&comodidades[cozinha]=0&comodidades[banheiro]=0&regras[fumar]=<1 ou 0>&regras[animais]=<1 ou 0>
export async function listarAcomodacoes(req: Request, res: Response) {
    // interface com todos os possiveis filtros
    interface queryFiltro extends qs.ParsedQs {
        general?: string;
        "check-in"?: string;
        "check-out"?: string;
        nome?: string;
        categoria?: string;
        precoMin?: string;
        precoMax?: string;
        local?: { [key: string]: string };
        capacidade?: string;
        comodidades?: { [key: string]: string };
        regras?: { [key: string]: "1" | "0" };
    }

    // retirar o query para parsear com o qs
    const startOfQuery = req.originalUrl.indexOf("?");
    const query = startOfQuery !== -1 ? req.originalUrl.substring(startOfQuery + 1) : "";
    const queryParams: queryFiltro = qs.parse(query);

    let filtroMongoose: { [key: string]: any } = {};

    // para cada elemento da query...
    for (const key in queryParams) {
        // adicione-o no objeto de filtro de acordo

        // uma key general para procurar em todos os campos de string
        if (key === "general") {
            const padrao = queryParams[key]!.split(" ").join("|"); // para procurar por varias palavras
            const regex = new RegExp(padrao, "gi");
            filtroMongoose["$or"] = [
                { nome: regex },
                { descricao: regex },
                { categoria: regex },
                { "local.rua": regex },
                { "local.cidade": regex },
                { "local.estado": regex },
                { "local.pais": regex },
            ];
        } else if (key === "comodidades") {
            for (const comodidade in queryParams[key]) {
                const numComodidade = Number.parseInt(queryParams[key]![comodidade], 10);
                filtroMongoose[`${key}.${comodidade}`] = { $gte: numComodidade };
            }
        } else if (key === "regras") {
            for (const regra in queryParams[key]) {
                const regraPermitida = queryParams[key]![regra] === "1" ? true : false;
                filtroMongoose[`${key}.${regra}`] = regraPermitida;
            }
        } else if (key === "local") {
            for (const definicaoLocal in queryParams[key]) {
                filtroMongoose[`${key}.${definicaoLocal}`] = new RegExp(queryParams[key]![definicaoLocal], "ig");
            }
        } else if (key === "capacidade") {
            const capacidade = Number.parseInt(queryParams[key]!, 10);
            filtroMongoose["numeroDePessoas"] = capacidade;
        } else if (key === "precoMin") {
            const precoMin = Number.parseInt(queryParams[key]!, 10);
            filtroMongoose["preco"] = { $gte: precoMin };
        } else if (key === "precoMax") {
            const precoMax = Number.parseInt(queryParams[key]!, 10);
            // usando o spread (...) para nao sobreescrever o precoMin
            filtroMongoose["preco"] = { ...filtroMongoose["preco"], $lte: precoMax };
        }

        // outras strings (nome, categoria, etc)
        else {
            filtroMongoose[key] = new RegExp(queryParams[key] as string, "ig");
        }
    }

    // depois, faça a requisição ao banco com o filtro criado
    try {
        let acomodacoesFiltradas = await AcomodacaoModel.find(filtroMongoose).exec();

        // agora, veja se é necessário procurar pela reserva (ou seja, se estamos
        // procurando por data de check-in e check-out)
        if (queryParams.hasOwnProperty("check-in") && queryParams.hasOwnProperty("check-out")) {
            acomodacoesFiltradas = acomodacoesFiltradas.filter(async (acomodacao) => {
                // pegar reservas relacionada à acomodação
                const reservas = await ReservaModel.find({ idAcomodacao: acomodacao._id });

                let acomodacaoValida = true;

                const dataCheckIn = new Date(queryParams["check-in"]!);
                const dataCheckOut = new Date(queryParams["check-out"]!);

                reservas.forEach((reserva) => {
                    const dataInicioReserva = new Date(reserva.dataDeInicio);
                    const dataTerminoReserva = new Date(reserva.dataDeTermino);

                    acomodacaoValida =
                        (dataCheckIn < dataInicioReserva && dataCheckOut < dataInicioReserva) ||
                        (dataCheckIn > dataTerminoReserva && dataCheckOut > dataTerminoReserva);

                    if (!acomodacaoValida) return acomodacaoValida;
                });

                return acomodacaoValida;
            });
        }

        // e retorne as acomodações encontradas
        return res.status(200).send(acomodacoesFiltradas);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}

export async function acomodacaoID(req: Request, res: Response) {
    try {
        const acomodacao = await AcomodacaoModel.findById(req.params.id);
        return res.status(200).send(acomodacao);
    } catch (err) {
        return res.status(500).send({ message: err });
    }
}
