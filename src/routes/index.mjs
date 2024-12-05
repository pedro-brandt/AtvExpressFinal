import { Router } from 'express';
import { produtosRoutes } from './produtos.mjs';  
import { usuarioRoutes } from './usuario.mjs'; 

export const router = (pool) => {
  const appRouter = Router();
  

  appRouter.use('/produtos', produtosRoutes(pool));  
  appRouter.use('/usuarios', usuarioRoutes(pool));  
  
  return appRouter;
};
