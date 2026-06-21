import { getDatabaseConnection } from '../database/connection.ts';

export async function listAllPoems() {
	const db = await getDatabaseConnection();
	const poems = await db.all('SELECT * FROM poems');
	return poems;
}

export async function createPoem(
	title: string,
	text: string,
	author: string,
	category: string,
	subcategory: string,
) {
	const db = await getDatabaseConnection();

	const stmt = await db.prepare(
		'INSERT INTO poems (title, text, author, category, subcategory) VALUES (?, ?, ?, ?, ?)',
	);

	await stmt.run(title, text, author, category, subcategory);

	await stmt.finalize();

	return { message: 'Poem successfully created' };
}
