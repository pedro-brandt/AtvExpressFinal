import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;
const pool = new Pool({
    connectionString: 'postgres://ehxvsbtp:V6f20FY7Kq5zAnUv8QVsP19dT9_Orncu@kesavan.db.elephantsql.com/ehxvsbtp',
});

pool.query(`
    CREATE TABLE IF NOT EXISTS Usuario (
        id SERIAL PRIMARY KEY,
        nome TEXT,
        descricao TEXT,
        tempo DATE
    )
`, (error, results) => {
    if (error) {
        console.error('Erro ao criar tabela:', error);
        throw error;
    }
    console.log('Tabela de usuário criada com sucesso!');
});

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Usuario');
        res.json(result.rows); 
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro ao buscar usuários');
    }
});

server.post('/', async (req, res) => {
    const { nome, descricao, tempo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Usuario (nome, descricao, tempo) VALUES ($1, $2, $3) RETURNING *',
            [nome, descricao, tempo]
        );
        res.status(201).json(result.rows[0]);  
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).send('Erro ao adicionar usuário');
    }
})


export default server;
