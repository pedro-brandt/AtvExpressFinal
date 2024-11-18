import express from 'express';
import { trabalhosRoutes} from '../Models/Trabalhos.js';
import pg from 'pg';
//pg - postgre
const { Pool } =  pg;
import cors from 'cors';
//cors - gerenciar as rotas

const server = express();


server.use(express.json());
server.use(cors());

server.use('/trabalhos', trabalhosRoutes);

const pool = new Pool({
    connectionString: 'postgres://ehxvsbtp:V6f20FY7Kq5zAnUv8QVsP19dT9_Orncu@kesavan.db.elephantsql.com/ehxvsbtp',
});

pool.query(`
    CREATE TABLE IF NOT EXIST Trabalhos (
    nome TEXT,
    descricao TEXT,
    tempo DATE
    )`, (error,results) => {
        if (error) {
            throw error;
        }
    console.log('Tabela criada!');
});



export {server};