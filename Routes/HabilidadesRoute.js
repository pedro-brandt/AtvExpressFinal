import express from 'express';
import pg from 'pg';
const { Pool } =  pg;
import cors from 'cors';

const pool = new Pool({
    connectionString: 'postgres://ehxvsbtp:V6f20FY7Kq5zAnUv8QVsP19dT9_Orncu@kesavan.db.elephantsql.com/ehxvsbtp',
});

pool.query(`
    CREATE TABLE IF NOT EXISTS Habilidades (
     id SERIAL PRIMARY KEY,
        nome TEXT,
        descricao TEXT,
        dataDeInicio DATE,
        dataDeFim DATE
    )`, (error,results) => {
        if (error) {
            throw error;
        }
    console.log('Tabela criada!')
});
const server = express()

server.use(express.json())
server.use(cors())

server.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Habilidades');
        res.json(result.rows);  
    } catch (error) {
        console.error('Erro ao buscar habilidades:', error);
        res.status(500).send('Erro ao buscar habilidades');
    }
});

server.post('/', async (req, res) => {
    const { nome, descricao, dataDeInicio, dataDeFim } = req.body;
    try {
        const result = await pool.query(
          'INSERT INTO Habilidades (nome, descricao, dataDeInicio, dataDeFim) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, descricao, dataDeInicio, dataDeFim]
        );
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error('Erro ao adicionar habilidade:', error);
        res.status(500).send('Erro ao adicionar habilidade');
    }
})
export default server;