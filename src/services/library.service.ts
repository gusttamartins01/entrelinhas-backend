import { library } from './../mocks/library.ts';

export function lisServiceLibrary() {
	return library;
}

export function createServiceLibrary(
	book: string,
	author: string,
	category: string,
	year: number,
) {
	if (!library) {
		throw new Error('Dados inválidos!');
	}

	const newBook = {
		id: library.length + 1,
		book,
		author,
		category,
		year,
	};

	library.push(newBook);

	return newBook;
}
