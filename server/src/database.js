import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'studentdb',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppass',
});

export async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}

export default pool;
