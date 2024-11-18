import express from 'express';
import { cursosRoutes} from '../Models/Cursos.js';
import pg from 'pg';
//pg - postgre
const { Pool } =  pg;
import cors from 'cors';
//cors - gerenciar as rotas

const server = express();
//const - cria variavel js

server.use(express.json());
server.use(cors());

server.use('/cursos', cursosRoutes);

const pool = new Pool({
    connectionString: 'postgres://ehxvsbtp:V6f20FY7Kq5zAnUv8QVsP19dT9_Orncu@kesavan.db.elephantsql.com/ehxvsbtp',
});

pool.query(`
    CREATE TABLE IF NOT EXIST Cursos (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    dataDeInicio DATE,
    dataDeFim DATE
    )`, (error,results) => {
        if (error) {
            throw error;
        }
    console.log('Tabela criada!');
});



export {server};