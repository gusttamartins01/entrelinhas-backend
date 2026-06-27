import { getDatabaseConnection } from '../database/connection.ts';
import type { Library } from '../models/library.model.ts';

export async function listServiceLibrary(): Promise<Library[]> {
	const db = await getDatabaseConnection();

	const books = await db.all('SELECT * FROM library ORDER BY id ASC');
	return books as Library[];
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

	const result = await db.get(
		`
        INSERT INTO library
        (book, author, category, publication_year)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
		[book, author, category, publication_year],
	);

	if (!result?.id) {
		throw new Error('Falha ao gerar o ID do livro.');
	}

	return {
		id: result.id,
		book,
		author,
		category,
		publication_year,
	};
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

	const result = await db.run(
		`
        UPDATE library
        SET book = $1, author = $2, category = $3, publication_year = $4
        WHERE id = $5`,
		[book, author, category, publication_year, id],
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
}

export async function deleteServiceLibrary(id: number): Promise<boolean> {
	if (!id) {
		throw new Error('O ID é obrigatório para exclusão do item.');
	}

	const db = await getDatabaseConnection();

	const result = await db.run('DELETE FROM library WHERE id = $1', [id]);

	return (result?.changes ?? 0) > 0;
}
