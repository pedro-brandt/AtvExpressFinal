import express from 'express';
import { habilidadesRoutes} from '../Models/Habilidades.js';
import pg from 'pg';
//pg - postgre
const { Pool } =  pg;
import cors from 'cors';
//cors - grrenciasr as rotas

const server = express();


server.use(express.json());
server.use(cors());

server.use('/habilidades', habilidadesRoutes);

const pool = new Pool({
    connectionString: 'postgres://ehxvsbtp:V6f20FY7Kq5zAnUv8QVsP19dT9_Orncu@kesavan.db.elephantsql.com/ehxvsbtp',
});

pool.query(`
    CREATE TABLE IF NOT EXIST Habilidades (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    descricao TEXT,
    tempo DATE,
    )`, (error,results) => {
        if (error) {
            throw error;
        }
    console.log('Tabela criada!');
});



export {server};