import { fonts, themes } from '../data';
import type { FontOptions, ThemeOptions } from '../types';
import { ChangeConfigService } from './change-config.service';

describe('ChangeConfig', () => {
	const changeConfig = new ChangeConfigService();

	test('Deberia de leer el archivo de configuración', () => {
		const configAlacritty = changeConfig.readConfig();
		const rows = configAlacritty.split('\n').length;
		// console.log(configAlacritty);

		expect(changeConfig).toBeInstanceOf(ChangeConfigService);
		expect(configAlacritty).toContain(
			'import = ["~/.config/alacritty/themes/themes/',
		);
		expect(configAlacritty).toContain('normal = { family =');
		expect(configAlacritty).toContain('[window]');

		expect(rows).toBe(42);
	});

	test('Deberia de escribir el archivo de configuración', () => {
		let configFileAlacritty = changeConfig.readConfig();
		let newConfigAlacritty = configFileAlacritty.replace(
			/opacity = (1|0(\.\d)?)/,
			'opacity = 0.9',
		);
		changeConfig.writeConfig(newConfigAlacritty);

		configFileAlacritty = changeConfig.readConfig();
		newConfigAlacritty = configFileAlacritty.replace(
			/padding = \{.*\}/,
			'padding = { x = 3, y = 3 }',
		);
		changeConfig.writeConfig(newConfigAlacritty);

		expect(newConfigAlacritty).toContain('opacity = 0.9');
		expect(newConfigAlacritty).toContain('padding = { x = 3, y = 3 }');
	});

	test('Deberia de detenerse si font es una cadena vacía', () => {
		// const configFileAlacritty = changeConfig.readConfig();
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			opacity: 0.4,
			padding: 3,
			size: 12,
			theme: 'dracula' as ThemeOptions,
			font: '' as FontOptions,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('agave');
		expect(consoleLogMock).toHaveBeenCalledWith('cascadia_code');
		expect(consoleLogMock).toHaveBeenCalledWith('ubuntu');
		expect(consoleLogMock).toHaveBeenCalledWith(
			'Error: font must be equal to a valid font',
		);
		expect(consoleLogMock).toHaveBeenCalledTimes(10);

		consoleLogMock.mockRestore();
	});

	test('Deberia de detenerse si theme es una cadena vacía', () => {
		// const configFileAlacritty = changeConfig.readConfig();
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			opacity: 0.4,
			padding: 3,
			size: 12,
			theme: '' as ThemeOptions,
			font: 'ubuntu' as FontOptions,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('showTheme');
		expect(consoleLogMock).toHaveBeenCalledWith('afterglow');
		expect(consoleLogMock).toHaveBeenCalledWith('alacritty');
		expect(consoleLogMock).toHaveBeenCalledWith('solarized_light');
		expect(consoleLogMock).toHaveBeenCalledWith(
			'Error: theme must be equal to a valid theme',
		);
		expect(consoleLogMock).toHaveBeenCalledTimes(117);

		consoleLogMock.mockRestore();
	});

	// test('tes', () => {
	// 	Object.entries(themes).map(([value, key], i) => console.log(i, value, key));
	// });
});
