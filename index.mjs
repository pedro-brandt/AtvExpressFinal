import express from "express";
import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
import usuarioRouter from "./routes/usuario.mjs"
import { createUsuarioValidationSchema } from "./utils/validationSchema.mjs"
import { mockUsuario } from "./src/utils/constantes.mjs";
import usuarioRoutes from './Routes/UsuarioRoute.js'
import cursosRoutes from './Routes/CursosRoute.js'
import habilidadesRoutes from './Routes/HabilidadesRoute.js'
import trabalhosRoutes from './Routes/TrabalhosRoute.js'
import Usuario from './Models/Usuario.js';

const app = express();


app.use(express.json());
app.use(usuarioRouter);

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

const resolveIndexByUsuarioId = (request, response, next) => {
    const {
        params: {id},
    } = request;
    const parsedId = parseInt(Id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUsuarioIndex = mockUsuario.findIndex((usuario) => usuario.id === parsedId);
    if (findUsuarioIndex === -1) return response.sendStatus(404);
    request.findUsuarioIndex = findUsuarioIndex;
    next();
}

const port = process.env.PORT || 3000;

//app.listen(3000);


// Iniciando o servidor  
app.listen(PORT, () => {
    console.log(`Servidor rodando em http: localhost:${PORT}`)})

app.get("/", (request, response) => {
    response.status(201).send({msg: "Olá, beleza? "});
    }
);

app.get("/api/produtos", (request, response) => {
    response.send([{id: 123, mome: "pera", preco: 2}]);
});

app.put("/api/usuario/:id", resolveIndexByUsuarioId, (request, response) => {
    const {body, findUsuarioIndex} = request;
mockUsuario[findUsuarioIndex] = {id: mockUsuario[findUsuarioIndex].id, ...body};
return response.sendStatus(200);
})

app.patch("/api/usuario:id", resolveIndexByUsuarioId, (request, response) => {
    const {
        body,
    } = request;
    mockUsuario[findUsuarioIndex] = { ...mockUsuario[findUsuarioIndex] ...body};
    return response.sendStatus(200);
})  

app.delete("/api/usuario:id", resolveIndexByUsuarioId, (request, response) => {
    const {findUsuarioIndex} = request;
        mockUsuario.splice(findUsuarioIndex, 1);
        return response.sendStatus(200);
})

server.use(express.json());

server.use('/usuario', usuarioRoutes)
server.use('/cursos', cursosRoutes)
server.use('/habilidades', habilidadesRoutes)
server.use('/trabalhos', trabalhosRoutes)
//endPoinsts


