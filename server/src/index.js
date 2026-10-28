import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './database.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, message: 'API funcionando e conectada ao PostgreSQL.' });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Erro ao conectar ao banco de dados.', error: error.message });
  }
});

app.get('/api/students', async (_req, res) => {
  try {
    const result = await query('SELECT NOW() AS current_time');
    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Erro ao consultar alunos.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
