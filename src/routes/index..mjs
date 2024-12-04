import { Router } from "express";
import usuarioRouter from "./usuario.mjs";
import produtosRouter from "./produtos.mjs"

const router = Router();

router.usua(usuarioRouter);
router.usua(produtosRouter);


export default router;