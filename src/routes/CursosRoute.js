import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;
const pool = new Pool({
    connectionString: 'postgres://ehxvsbtp:V6f20FY7Kq5zAnUv8QVsP19dT9_Orncu@kesavan.db.elephantsql.com/ehxvsbtp',
});

pool.query(`
    CREATE TABLE IF NOT EXISTS Cursos (
        id SERIAL PRIMARY KEY,
        nome TEXT,
        descricao TEXT,
        dataDeInicio DATE,
        dataDeFim DATE
    )
`, (error, results) => {
    if (error) {
        console.error('Erro ao criar tabela:', error);
        throw error;
    }
    console.log('Tabela criada!');
});

const server = express();
server.use(express.json());
server.use(cors());

server.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Cursos')
        res.json(result.rows)
    } catch (error) {
        console.error('Erro ao buscar cursos:', error)
        res.status(500).send('Erro ao buscar cursos')
    }
});

server.post('/', async (req, res) => {
    const { nome, descricao, dataDeInicio, dataDeFim } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO Cursos (nome, descricao, dataDeInicio, dataDeFim) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, descricao, dataDeInicio, dataDeFim]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao adicionar curso:', error)
        res.status(500).send('Erro ao adicionar curso')
    }
});


server.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, dataDeInicio, dataDeFim } = req.body;
    try {
        const result = await pool.query(
            `UPDATE Cursos
            SET nome = $1, descricao = $2, dataDeInicio = $3, dataDeFim = $4
            WHERE id = $5 RETURNING *`,
            [nome, descricao, dataDeInicio, dataDeFim, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Curso não encontrado');
        }

        res.status(200).json({ message: 'Curso atualizado com sucesso', curso: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar Curso:', error);
        res.status(500).send('Erro ao atualizar Curso');
    }
});

server.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Cursos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Curso não encontrado');
        }
        res.status(200).json({ message: 'Curso excluído com sucesso', curso: result.rows[0] });
    } catch (error) {
        console.error('Erro ao excluir curso:', error);
        res.status(500).send('Erro ao excluir curso');
    }
});

export default server;
