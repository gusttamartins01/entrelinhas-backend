import type { Request, Response } from 'express';
import {
	createServiceLibrary,
	lisServiceLibrary,
} from './../services/library.service.ts';

export function listLibrary(_request: Request, response: Response) {
	const library = lisServiceLibrary();

	return response.status(200).json(library);
}

export function createItemLibrary(request: Request, response: Response) {
	try {
		const { book, author, category, year } = request.body;

		const newBook = createServiceLibrary(book, author, category, year);

		return response.status(201).json(newBook);
	} catch (error) {
		return response.status(400).json({
			message: error instanceof Error ? error.message : 'Erro Interno',
		});
	}
}
