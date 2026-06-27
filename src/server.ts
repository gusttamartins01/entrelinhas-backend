import express from 'express';
import libraryRoutes from './routes/library.route.ts';

const app = express();

app.use('/library', libraryRoutes);

app.use((_request, response) => {
	return response.status(400).json({
		message: 'Not found!',
	});
});

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
	console.log(`server running on port: http://localhost:${PORT}`);
});
