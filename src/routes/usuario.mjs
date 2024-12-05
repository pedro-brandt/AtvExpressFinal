import { Router } from 'express';
import { validationResult } from 'express-validator';

export const usuarioRoutes = (pool) => {
  const router = Router();
  router.post('/', (req, res) => {
    const { nome, apelido } = req.body;

    console.log('Recebido novo user:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Erro de validação:', errors.array());
      return res.status(400).json({ error: errors.array() });
    }

    pool.query(
      'INSERT INTO usuario (nome, apelido) VALUES ($1, $2)',
      [nome, apelido],
      (error, result) => {
        if (error) {
          console.error("Erro ao inserir user:", error);
          res.status(500).json({ error: "Erro ao inserir user." });
        } else {
          res.json({ message: 'User criado com sucesso!' });
        }
      }
    );
  });

  router.get('/', (req, res) => {
    pool.query('SELECT * FROM usuario', (error, results) => {
      if (error) {
        console.error("Erro ao buscar usuarios:", error);
        res.status(500).send({ error: "Erro ao buscar usuarios." });
      } else {
        res.json(results.rows);
      }
    });
  });

  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log("Buscando usuario com id:", id);
      const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);

      if (result.rows.length > 0) {
        console.log("Usuario encontrado:", result.rows[0]);
        res.json(result.rows[0]);
      } else {
        console.log("Usuario com id não encontrado:", id);
        res.status(404).send({ error: "Id não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao retornar o id:", error);
      res.status(500).send({ error: "Erro ao retornar o id." });
    }
  });

  router.put('/:id', async (req, res) => {
    const { nome, apelido } = req.body;
    const id = req.params.id;

    try {
      console.log("Atualizando user com id:", id);
      const result = await pool.query('SELECT * FROM usuario WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        console.log("User com id não encontrado para atualização:", id);
        return res.status(404).json({ error: "Id não encontrado." });
      }

      await pool.query(
        'UPDATE usuario SET nome = $1, apelido = $2 WHERE id = $3',
        [nome, apelido, id]
      );

      res.json({ message: 'User atualizado com sucesso!' });
    } catch (error) {
      console.error("Erro ao atualizar user:", error);
      res.status(500).json({ error: "Erro ao atualizar user." });
    }
  });


  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      console.log("Deletando usuario com id:", id);
      const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]);

      if (result.rowCount > 0) {
        console.log("Usuario excluído com sucesso:", id);
        res.json({ message: 'Usuario excluído com sucesso!' });
      } else {
        console.log("Usuario com id não encontrado para exclusão:", id);
        res.status(404).send({ error: "Id não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao deletar linha:", error);
      res.status(500).send({ error: "Erro ao deletar linha." });
    }
  });

  return router; 
};
