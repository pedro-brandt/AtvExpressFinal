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
server.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, dataDeInicio, dataDeFim, local } = req.body;
    try {
        const result = await pool.query(
            `UPDATE Trabalhos 
            SET nome = $1, descricao = $2, dataDeInicio = $3, dataDeFim = $4, local = $5
            WHERE id = $6 RETURNING *`,
            [nome, descricao, dataDeInicio, dataDeFim, local, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Trabalho não encontrado');
        }

        res.status(200).json({ message: 'Trabalho atualizado com sucesso', trabalho: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar trabalho:', error);
        res.status(500).send('Erro ao atualizar trabalho');
    }
});

server.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Trabalhos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Trabalho não encontrado');
        }
        res.status(200).json({ message: 'Trabalho excluído com sucesso', trabalho: result.rows[0] });
    } catch (error) {
        console.error('Erro ao excluir trabalho:', error);
        res.status(500).send('Erro ao excluir trabalho');
    }
});


export default server