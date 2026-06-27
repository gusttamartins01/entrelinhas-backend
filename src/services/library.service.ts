import { library } from './../mocks/library.ts';
import type { Library } from '../models/library.model.ts';

export function listServiceLibrary(): Library[] {
	return library;
}

export function createServiceLibrary(
	book: string,
	author: string,
	category: string,
	year: number,
): Library {
	if (!book || !author || !category || !year) {
		throw new Error('Dados inválidos!');
	}

	const newBook: Library = {
		id: library.length + 1,
		book,
		author,
		category,
		year,
	};

	library.push(newBook);

	return newBook;
}
