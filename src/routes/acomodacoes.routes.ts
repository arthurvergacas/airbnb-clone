import { Router } from "express";
import multer from "multer";
import upload from "../config/upload";
import * as AcomodacoesController from "../controllers/acomodacoes.controller";

export const router = Router();
export const path ='/acomodacoes';
export const uploads = multer();


router.post("/acomodacoes", AcomodacoesController.criar);
router.post("/acomodacoes", uploads.any(), AcomodacoesController.criar);


