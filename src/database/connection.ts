import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function getDatabaseConnection() {
	return await open({
		filename: './src/database/poems.db',
		driver: sqlite3.Database,
	});
}
