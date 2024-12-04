import { Router } from "express";
import usuarioRouter from "./usuario.mjs";
import produtosRouter from "./produtos.mjs"

const router = Router();

router.use("/api/usuario", usuarioRouter);
router.use("/api/produtos",produtosRouter);


export default router;