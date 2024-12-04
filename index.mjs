import express from "express";
import { query, validationResult, body, matchedData } from "express-validator";
import usuarioRoutes from './Routes/UsuarioRoute.js'
import cursosRoutes from './Routes/CursosRoute.js'
import habilidadesRoutes from './Routes/HabilidadesRoute.js'
import trabalhosRoutes from './Routes/TrabalhosRoute.js'
import Usuario from './Models/Usuario.js';

const app = express();


app.use(express.json());

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

const mockUsuario = [
    {id: 1, nome: "pedro", apelido: "Pedro"},
    {id: 2, nome: "luiz", apelido: "Luiz"},
    {id: 3, nome: "maria", apelido: "Ma"}
];

// Iniciando o servidor  
app.listen(PORT, () => {
    console.log(`Servidor rodando em http: localhost:${PORT}`)})

app.get("/", (request, response) => {
    response.status(201).send({msg: "Olá, beleza? "});
    }
);

app.get(
    "/api/usuario",
    query("filter")
    .isString()
    .notEmpty()
    .isLength({ min: 2, max:3 })
    .withMessage('tem de estar entre 2 a 3'),
     (request, response) => {
        const result = validationResult(request)
        console.log(result);
    const { 
        query: {filter, value}, 
    } = request;
    if (filter && value) 
        return response.send(
            mockUsuario.filter((user) => usuario[filter].includes(value))
        );
    return response.send(mockUsuario);
    });


app.post(
    "/api/usuario",
    [
     body('nome')
     .notEmpty()
     .withMessage("nome nao deve estar vazio")
     .isLength({min: 4, max: 30})
     .withMessage("o nome dete ter entre 4 a 30")
     .isString()
     .withMessage("nome tem de ser String"),
     body("apelido").notEmpty()
    ],
      (request, response) => {
        const result = validationResult(result);
        console.log(result);
        
        if (!result.isEmpty())
            return response.status(400).send({errors: result.array()})

        const data = matchedData(request);
    const newUsuario = { id: mockUsuario[mockUsuario.length - 1].id + 1, ...data};
    mockUsuario.push(newUsuario);
    return response.status(201).send(newUsuario);
});

app.get("/api/usuario/:id", resolveIndexByUsuarioId, (request, response) => {
    const { findUsuarioIndex } = request;
    const findUsuario = mockUsuario[findUsuarioIndex]
   if (!findUsuario) return response.sendDtatus(404);
   return response.send(findUsuario);
});

app.get("/api/produtos", (request, response) => {
    response.send([{id: 11, mome: "pera", preco: 2}]);
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


