import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function getDatabaseConnection() {
	return open({
		filename: './src/database/library.db',
		driver: sqlite3.Database,
	});
}
