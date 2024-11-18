import express from 'express';
import usuarioRoutes from './Routes/UsuarioRoute.js'
import cursosRoutes from './Routes/CursosRoute.js'
import habilidadesRoutes from './Routes/HabilidadesRoute.js'
import trabalhosRoutes from './Routes/TrabalhosRoute.js'

const server = express();
const port = 3000;

server.use(express.json());

server.use('/usuario', usuarioRoutes)
server.use('/cursos', cursosRoutes)
server.use('/habilidades', habilidadesRoutes)
server.use('/trabalhos', trabalhosRoutes)

// Iniciando o servidor
server.listen(port, () => {
    console.log(`Servidor rodando em http: localhost:${port}`);
})