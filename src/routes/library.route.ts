import { Router } from 'express';
import {
	createItemLibrary,
	deleteItemLibrary,
	listLibrary,
	updateItemLibrary,
} from './../controllers/library.controller.ts';

const router = Router();

router.get('/', listLibrary);
router.post('/', createItemLibrary);
router.put('/:id', updateItemLibrary);
router.delete('/:id', deleteItemLibrary);

export default router;
