import express from "express";
import router from "./src/routes/index.mjs";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// iniciando servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
    response.status(201).send({ msg: "Olá, beleza?" });
});
