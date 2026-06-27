import express from 'express';

const app = express();

app.get('/', (_request, response) => {
	response.status(200).json({ message: 'Hello, World!' });
});

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, () => {
	console.log(`server running on port: http://localhost:${PORT}`);
});
