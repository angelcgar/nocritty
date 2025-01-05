import fs from 'node:fs';

import { ShowConfigService } from './show-config.service';
import { mainConfigFilePath } from '../data';

describe('ShowConfig', () => {
	const showConfig = new ShowConfigService();

	test('Deberia ser una instacia de ShowConfigService', () => {
		expect(showConfig).toBeInstanceOf(ShowConfigService);
	});

	test('Deberia de leer el archivo de configuración', () => {
		const configAlacritty = showConfig.showConfig(true);

		const rows = configAlacritty!.split('\n').length;
		// console.log(configAlacritty);

		expect(configAlacritty).toContain(
			'import = ["~/.config/alacritty/themes/themes/',
		);
		expect(configAlacritty).toContain('normal = { family =');
		expect(configAlacritty).toContain('[window]');

		expect(rows).toBe(42);
	});

	// test('Deberia de detenerse si no encontro alacritty.toml en el sistema', () => {
	// });

	test('Deberia de listar todos los temas', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});

		showConfig.showAllThemes(true);

		expect(consoleLogMock).toHaveBeenCalledWith('\nListando todos los temas');
		expect(consoleLogMock).toHaveBeenCalledWith(1, 'afterglow');
		expect(consoleLogMock).toHaveBeenCalledWith(85, 'one_dark');
		expect(consoleLogMock).toHaveBeenCalledWith(113, 'xterm');
		expect(consoleLogMock).toHaveBeenCalledWith('Escoje un tema');

		expect(consoleLogMock).toHaveBeenCalledTimes(117);
	});
});
