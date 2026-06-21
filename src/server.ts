import http from 'node:http';

const PORT = 3333;

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json');

	try {
		if (req.url === '/poems' && req.method === 'GET') {
			return res.end(
				JSON.stringify({
					status: 'success',
					data: [
						{
							id: 1,
							title: 'Bailar sozinho',
							text: 'Bailar Sozinho...',
							author: 'Luiz Gustavo Martins',
							category: 'Poesia',
							subcategory: 'Suspense Psicológico',
							tags: ['romance', 'ilusao', 'plot-twist', 'festa'],
							created_at: '2021-02-18',
						},
					],
				}),
			);
		}

		res.writeHead(404);

		return res.end(
			JSON.stringify({
				status: '404',
				message: 'Route not found',
			}),
		);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.writeHead(500);

			return res.end(
				JSON.stringify({
					statu: '500',
					message: error.message,
				}),
			);
		}

		res.writeHead(500);

		return res.end(
			JSON.stringify({
				status: '500',
				message: 'Unknown error',
			}),
		);
	}
});

server.listen(PORT, () =>
	console.log(`Server running on port: http://localhost:${PORT}`),
);
