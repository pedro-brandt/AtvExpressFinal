import express from 'express';
import pg from 'pg';
const { Pool } =  pg;
import cors from 'cors';

const pool = new Pool({
    connectionString: 'postgres://ehxvsbtp:V6f20FY7Kq5zAnUv8QVsP19dT9_Orncu@kesavan.db.elephantsql.com/ehxvsbtp',
})

pool.query(`
    CREATE TABLE IF NOT EXISTS Trabalhos (
       id SERIAL PRIMARY KEY,
        nome TEXT,
        descricao TEXT,
        dataDeInicio DATE,
        dataDeFim DATE,
        local TEXT
    )`, (error,results) => {
        if (error) {
            throw error;
        }
    console.log('Tabela criada!');
});

const server = express();


server.use(express.json());
server.use(cors());


server.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Trabalhos')
        res.json(result.rows)
    } catch (error) {
        console.error('Erro ao buscar trabalho:', error)
        res.status(500).send('Erro ao buscar trabalho')
    }
})

server.post('/', async (req, res) => {
    const { nome, descricao, dataDeInicio, dataDeFim , local } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO Trabalhos (nome, descricao, dataDeInicio, dataDeFim , local) VALUES ($1, $2, $3, $4 , $5) RETURNING *',
            [nome, descricao, dataDeInicio, dataDeFim, local]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar trabalho:', error)
        res.status(500).send('Erro ao adicionar trabalho')
    }
})

export default server