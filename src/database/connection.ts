import { Pool } from 'pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

export async function getDatabaseConnection() {
	return {
		all: async (sql: string, params: unknown[] = []) => {
			const res = await pool.query(sql, params);
			return res.rows;
		},
		get: async (sql: string, params: unknown[] = []) => {
			const res = await pool.query(sql, params);
			return res.rows[0];
		},
		run: async (sql: string, params: unknown[] = []) => {
			const res = await pool.query(sql, params);
			return { lastID: null, changes: res.rowCount };
		},
	};
}
