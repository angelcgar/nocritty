import { ServerApp } from './presentation/server-app';

describe('Test App', () => {
	test('Deberia ser verdadero', async () => {
		const serverRunMock = jest.fn();
		ServerApp.run = serverRunMock;

		process.argv = [
			'node',
			'app.ts',
			'-s',
			'10',
			'-o',
			'0.5',
			'-p',
			'10',
			'-t',
			'dracula',
			'-l',
			'-S',
			'-f',
			'fira_code',
		];

		await import('./app');

		expect(serverRunMock).toHaveBeenCalledWith({
			size: 10,
			opacity: 0.5,
			padding: 10,
			theme: 'dracula',
			list: true,
			show: true,
			font: 'fira_code',
		});
	});
});
