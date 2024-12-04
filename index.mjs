import express from "express";
import router from "./src/routes/index..mjs";

const app = express();

app.use(express.json());
app.use(router);


const port = process.env.PORT || 3000;

//app.listen(3000);


// Iniciando o servidor  
app.listen(PORT, () => {
    console.log(`Servidor rodando em http: localhost:${PORT}`)})

app.get("/", (request, response) => {
    response.status(201).send({msg: "Olá, beleza? "});
    }
);

server.use(express.json());



