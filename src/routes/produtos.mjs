import { Router } from 'express';
import { validationResult } from 'express-validator';

export const produtosRoutes = (pool) => {
  const router = Router();


  router.post('/', (req, res) => {
    const { nome, preco } = req.body;

    console.log('Recebido novo produto:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Erro de validação:', errors.array());
      return res.status(400).json({ error: errors.array() });
    }

    pool.query(
      'INSERT INTO produtos (nome, preco) VALUES ($1, $2)',
      [nome, preco],
      (error, result) => {
        if (error) {
          console.error('Erro ao inserir produto:', error);
          res.status(500).json({ error: 'Erro ao inserir produto.' });
        } else {
          res.json({ message: 'Produto criado com sucesso!' });
        }
      }
    );
  });


  router.get('/', (req, res) => {
    pool.query('SELECT * FROM produtos', (error, results) => {
      if (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).send({ error: 'Erro ao buscar produtos.' });
      } else {
        res.json(results.rows);
      }
    });
  });

  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log('Buscando produto com id:', id);
      const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);

      if (result.rows.length > 0) {
        console.log('Produto encontrado:', result.rows[0]);
        res.json(result.rows[0]);
      } else {
        console.log('Produto com id não encontrado:', id);
        res.status(404).send({ error: 'Id não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao retornar o id:', error);
      res.status(500).send({ error: 'Erro ao retornar o id.' });
    }
  });

  router.put('/:id', async (req, res) => {
    const { nome, preco } = req.body;
    const id = req.params.id;

    try {
      console.log('Atualizando produto com id:', id);
      const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        console.log('Produto com id não encontrado para atualização:', id);
        return res.status(404).json({ error: 'Id não encontrado.' });
      }

      await pool.query(
        'UPDATE produtos SET nome = $1, preco = $2 WHERE id = $3',
        [nome, preco, id]
      );

      res.json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
  });

  // Rota DELETE para excluir um produto
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log('Deletando produto com id:', id);
      const result = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);

      if (result.rowCount > 0) {
        console.log('Produto excluído com sucesso:', id);
        res.json({ message: 'Produto excluído com sucesso!' });
      } else {
        console.log('Produto com id não encontrado para exclusão:', id);
        res.status(404).send({ error: 'Id não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).send({ error: 'Erro ao deletar produto.' });
    }
  });

  return router; // Retorna o router configurado
};
