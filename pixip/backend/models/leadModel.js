const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

class Lead {
  static async getAll() {
    const res = await pool.query('SELECT * FROM leads ORDER BY id ASC');
    return res.rows;
  }

  static async create(data) {
    const { name, email, phone, score } = data;
    const res = await pool.query(
      'INSERT INTO leads (name, email, phone, score) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, score]
    );
    return res.rows[0];
  }

  static async update(id, data) {
    const { name, email, phone, score } = data;
    const res = await pool.query(
      'UPDATE leads SET name=$1, email=$2, phone=$3, score=$4 WHERE id=$5 RETURNING *',
      [name, email, phone, score, id]
    );
    return res.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM leads WHERE id=$1', [id]);
  }
}

module.exports = Lead;
