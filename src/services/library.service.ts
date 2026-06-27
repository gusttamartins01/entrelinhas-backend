import { getDatabaseConnection } from '../database/connection.ts';
import type { Library } from '../models/library.model.ts';

export async function listServiceLibrary(): Promise<Library[]> {
	const db = await getDatabaseConnection();

	try {
		const books = await db.all<Library[]>('SELECT * FROM library');

		return books;
	} finally {
		await db.close();
	}
}

export async function createServiceLibrary(
	book: string,
	author: string,
	category: string,
	publication_year: number,
): Promise<Library> {
	if (!book || !author || !category || !publication_year) {
		throw new Error('Todos os campos são obrigatórios.');
	}

	const db = await getDatabaseConnection();

	try {
		const result = await db.run(
			`
			INSERT INTO library
			(book, author, category, publication_year)
			VALUES (?, ?, ?, ?)
			`,
			book,
			author,
			category,
			publication_year,
		);

		const insertedId = result.lastID ?? 0;

		if (insertedId === 0) {
			throw new Error('Falha ao gera o ID do livro.');
		}

		return {
			id: insertedId,
			book,
			author,
			category,
			publication_year,
		};
	} finally {
		await db.close();
	}
}

export async function updateServiceLibrary(
	id: number,
	book: string,
	author: string,
	category: string,
	publication_year: number,
): Promise<Library | null> {
	if (!id || !book || !author || !category || !publication_year) {
		throw new Error('Todos os campos são obrigatórios para atualização.');
	}

	const db = await getDatabaseConnection();

	try {
		const result = await db.run(
			`
			UPDATE library
			SET book = ?, author = ?, category = ?, publication_year = ?
			WHERE id = ?`,
			book,
			author,
			category,
			publication_year,
			id,
		);

		if (result.changes === 0) {
			return null;
		}

		return {
			id,
			book,
			author,
			category,
			publication_year,
		};
	} finally {
		await db.close();
	}
}

export async function deleteServiceLibrary(id: number): Promise<boolean> {
	if (!id) {
		throw new Error('O ID é obrigatório para exclusão.');
	}

	const db = await getDatabaseConnection();

	try {
		const result = await db.run('DELETE FROM library WHERE id = ?', id);

		return (result.changes ?? 0) > 0;
	} finally {
		await db.close();
	}
}
