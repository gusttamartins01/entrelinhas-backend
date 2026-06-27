import type { Request, Response } from 'express';
import type { Library } from '../models/library.model.ts';
import {
	createServiceLibrary,
	deleteServiceLibrary,
	listServiceLibrary,
	updateServiceLibrary,
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

export async function updateItemLibrary(
	request: Request,
	response: Response,
): Promise<Response> {
	try {
		const id = Number(request.params.id);

		if (Number.isNaN(id)) {
			return response
				.status(400)
				.json({ message: 'O ID fornecido deve ser um número.' });
		}

		const { book, author, category, publication_year } = request.body;

		const updateBook = await updateServiceLibrary(
			id,
			book,
			author,
			category,
			publication_year,
		);

		if (!updateBook) {
			return response.status(400).json({ message: 'Livro não encontrado.' });
		}

		return response.status(200).json(updateBook);
	} catch (error) {
		return response.status(400).json({
			message: error instanceof Error ? error.message : 'Erro interno',
		});
	}
}

export async function deleteItemLibrary(
	request: Request,
	response: Response,
): Promise<Response> {
	try {
		const id = Number(request.params.id);

		if (Number.isNaN(id)) {
			return response
				.status(400)
				.json({ message: 'o ID fornecido deve ser um núemro.' });
		}

		const isDeleted = await deleteServiceLibrary(id);

		if (!isDeleted) {
			return response.status(400).json({ message: 'Livro não encontrado.' });
		}

		return response.status(204).send();
	} catch (error) {
		return response.status(400).json({
			message: error instanceof Error ? error.message : 'erro innterno',
		});
	}
}
