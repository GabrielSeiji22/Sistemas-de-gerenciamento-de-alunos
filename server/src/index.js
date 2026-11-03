import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './database.js';
import { addStudent, listStudents, validateStudent } from './studentService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, message: 'API funcionando e conectada ao PostgreSQL.', storage: 'database' });
  } catch (error) {
    res.json({
      ok: true,
      message: 'API funcionando em modo local com armazenamento em memória.',
      storage: 'memory',
      warning: error.message,
    });
  }
});

app.get('/api/students', (_req, res) => {
  res.json({ ok: true, data: listStudents() });
});

app.post('/api/students', (req, res) => {
  const payload = req.body ?? {};
  const validation = validateStudent(payload);

  if (!validation.ok) {
    return res.status(400).json({
      ok: false,
      message: 'Dados inválidos.',
      errors: validation.errors,
    });
  }

  const result = addStudent(payload);

  if (!result.ok) {
    return res.status(400).json({
      ok: false,
      message: 'Não foi possível cadastrar o aluno.',
      errors: result.errors,
    });
  }

  return res.status(201).json({
    ok: true,
    message: 'Aluno cadastrado com sucesso.',
    data: result.student,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
