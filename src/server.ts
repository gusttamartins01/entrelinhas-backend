import http from 'node:http';
import { listAllPoems } from './repositories/poemsRepository.ts';

const PORT = 3333;

const server = http.createServer(async (req, res) => {
	try {
		res.setHeader('Content-Type', 'application/json; charset=utf-8');

		if (req.url === '/poems' && req.method === 'GET') {
			const poems = await listAllPoems();

			return res.end(
				JSON.stringify(
					{
						status: 'success',
						data: poems,
					},
					null,
					2,
				),
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
				JSON.stringify(
					{
						statu: '500',
						message: error.message,
					},
					null,
					2,
				),
			);
		}

		res.writeHead(500);

		return res.end(
			JSON.stringify(
				{
					status: '500',
					message: 'Unknown error',
				},
				null,
				2,
			),
		);
	}
});

server.listen(PORT, () =>
	console.log(`Server running on port: http://localhost:${PORT}`),
);
