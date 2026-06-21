import { getDatabaseConnection } from '../database/connection.ts';

export async function listAllPoems() {
	const db = await getDatabaseConnection();

	const poems = await db.all('SELECT * FROM poems');

	return poems;
}
