import { Router } from "express";
import * as acomodacoesController from "../controllers/acomodacoes.controller";
import multer from "multer";
import uploads from "../config/upload";

export const router = Router();
export const path = "/acomodacoes";
export const upload = multer(uploads);

router.get(path, acomodacoesController.listarAcomodacoes);
router.get(path + "/:id", acomodacoesController.acomodacaoID);
router.post(path, acomodacoesController.criar);
router.post(path, upload.single("imagem"), acomodacoesController.criar);
