import type { Request, Response } from 'express';
import type { Library } from '../models/library.model.ts';
import {
	createServiceLibrary,
	listServiceLibrary,
} from './../services/library.service.ts';

export async function listLibrary(_request: Request, response: Response) {
	try {
		const library = await listServiceLibrary();

		return response.status(200).json(library);
	} catch (error) {
		return response.status(500).json({
			message: error instanceof Error ? error.message : 'Erro Interno',
		});
	}
}

export async function createItemLibrary(request: Request, response: Response) {
	try {
		const { book, author, category, publication_year } = request.body;

		const newBook: Library = await createServiceLibrary(
			book,
			author,
			category,
			publication_year,
		);

		return response.status(201).json({
			message: 'Livro criado com sucesso!',
			book: newBook,
		});
	} catch (error) {
		return response.status(400).json({
			message: error instanceof Error ? error.message : 'Erro Interno',
		});
	}
}
