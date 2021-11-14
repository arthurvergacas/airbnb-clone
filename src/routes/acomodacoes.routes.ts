import { Router } from 'express';
import * as AcomodacoesController from '../controllers/acomodacoes.controller';

export const router = Router();
export const path ='/acomodacoes';


router.post('/acomodacoes', AcomodacoesController.criar);
router.get(`${path}/erro`, AcomodacoesController.getAcomodacao);


