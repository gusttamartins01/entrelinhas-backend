import { Router } from 'express';
import {
	createItemLibrary,
	listLibrary,
} from './../controllers/library.controller.ts';

const router = Router();

router.get('/', listLibrary);
router.post('/', createItemLibrary);

export default router;
