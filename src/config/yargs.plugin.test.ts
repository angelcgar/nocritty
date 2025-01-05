const runCommand = async (args: string[]) => {
	// if (args === undefined) args = ['--version'];
	process.argv = [...process.argv, ...args];

	const { yarg } = await import('./yargs.plugin');

	return yarg;
};

describe('Test yargs plugin', () => {
	const originalArgv = process.argv;

	beforeEach(() => {
		process.argv = originalArgv;
		jest.resetModules();
	});

	test('Deveria de regresar el tamaño de fuente', async () => {
		const argv = await runCommand(['-s', '10']);

		expect(argv).toEqual(
			expect.objectContaining({
				s: 10,
			}),
		);
	});

	test('Deveria de retornar una configuración custom', async () => {
		const customValues = [
			'-s',
			'10',
			'-o',
			'0.5',
			'-p',
			'10',
			'-t',
			'dracula',
			'-f',
			'fira_code',
			'-S',
			'-l',
		];
		const argv = await runCommand(customValues);
		// console.log(argv);

		expect(argv).toEqual(
			expect.objectContaining({
				s: 10,
				o: 0.5,
				p: 10,
				t: 'dracula',
				f: 'fira_code',
				S: true,
				l: true,
				$0: 'alacritty-config-theme',
			}),
		);
	});
});
