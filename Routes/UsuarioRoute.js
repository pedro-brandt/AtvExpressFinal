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
        idade NUMERIC,
        endereco TEXT,
        ensino TEXT
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
    const { nome, idade, endereco,ensino } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Usuario (nome, idade,endereco,ensino) VALUES ($1, $2, $3 , $4) RETURNING *',
            [nome, idade,endereco,ensino]
        );
        res.status(201).json(result.rows[0]);  
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).send('Erro ao adicionar usuário');
    }
})



server.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, idade,endereco,ensino} = req.body;
    try {
        const result = await pool.query(
            `UPDATE Cursos
            SET nome = $1, idade = $2, endereco = $3, ensino = $4
            WHERE id = $5 RETURNING *`,
            [nome, idade,endereco,ensino, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso', usuario: result.rows[0] });
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        res.status(500).send('Erro ao atualizar este usuário');
    }
});

server.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Usuario WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).json({ message: 'Usuário excluído com sucesso', usuario: result.rows[0] });
    } catch (error) {
        console.error('Erro ao excluir Usuário:', error);
        res.status(500).send('Erro ao excluir Usuário');
    }
});

export default server;
