import express from 'express';
import dotenv from 'dotenv';
import { usuarioRoutes } from './src/routes/usuario.mjs';
import { produtosRoutes } from './src/routes/produtos.mjs'; 
import pg from 'pg';
const { Pool } = pg;
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Database connected successfully. Current time:', res.rows[0].now);
  }
});

app.use(express.json());
app.use(cors());

// Usando as rotas importadas e passando o pool
app.use('/usuarios', usuarioRoutes(pool)); 
app.use('/produtos', produtosRoutes(pool)); 

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
