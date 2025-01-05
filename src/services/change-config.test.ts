import { fonts, themes } from '../data';
import type { FontOptions, ThemeOptions } from '../types';
import { ChangeConfigService } from './change-config.service';

describe('ChangeConfig', () => {
	const changeConfig = new ChangeConfigService();

	beforeEach(() => {
		jest.resetModules();
	});

	test('Deve de crear una instancia de ChangeConfigService', () => {
		expect(changeConfig).toBeInstanceOf(ChangeConfigService);
	});

	test('Deberia de leer el archivo de configuración', () => {
		const configAlacritty = changeConfig.readConfig();
		const rows = configAlacritty.split('\n').length;
		// console.log(configAlacritty);

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

	test('Deberia de detenerse si size es menor o igual a 0', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			opacity: 0.4,
			padding: 3,
			size: 0,
			theme: 'darcula' as ThemeOptions,
			font: 'ubuntu' as FontOptions,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('reportInvalidOption');
		expect(consoleLogMock).toHaveBeenCalledWith(
			'Error: size must be greater than 0',
		);
	});

	test('Deberia de detenerse si opacity es menor a 0', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			opacity: -0.4,
			padding: 3,
			size: 12,
			theme: 'darcula' as ThemeOptions,
			font: 'ubuntu' as FontOptions,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('reportInvalidOption');
		expect(consoleLogMock).toHaveBeenCalledWith(
			'Error: opacity must be greater than 0',
		);
	});

	test('Deberia de detenerse si padding es menor a 0', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			opacity: 0.4,
			padding: -3,
			size: 12,
			theme: 'darcula' as ThemeOptions,
			font: 'ubuntu' as FontOptions,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('reportInvalidOption');
		expect(consoleLogMock).toHaveBeenCalledWith(
			'Error: padding must be greater than 0',
		);

		consoleLogMock.mockRestore();
	});

	test('Deberia de cambiar la fuente de la configuración de Alacritty', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			font: 'ubuntu' as FontOptions,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('====> font: ubuntu');
		expect(consoleLogMock).toHaveBeenCalledTimes(1);

		consoleLogMock.mockRestore();

		const configFileAlacritty = changeConfig.readConfig();
		const newConfigAlacritty = configFileAlacritty.replace(
			/normal = \{.*\}/,
			`normal = { family = "${fonts[writeConfigAlacrittyOptions.font]}", style = "Regular" }`,
		);
		changeConfig.writeConfig(newConfigAlacritty);

		expect(newConfigAlacritty).toContain(
			`normal = { family = "${fonts[writeConfigAlacrittyOptions.font]}",`,
		);
	});

	test('Deberia de cambiar el tamaño de la fuente', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			size: 12,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('====> size: 12');
		expect(consoleLogMock).toHaveBeenCalled();

		consoleLogMock.mockRestore();

		const configFileAlacritty = changeConfig.readConfig();
		const newConfigAlacritty = configFileAlacritty.replace(
			/size = \d+/,
			`size = ${writeConfigAlacrittyOptions.size}`,
		);
		changeConfig.writeConfig(newConfigAlacritty);

		expect(newConfigAlacritty).toContain(
			`size = ${writeConfigAlacrittyOptions.size}`,
		);
	});

	test('Deberia de cambiar el tamaño de la opacidad', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			opacity: 0.2,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith(
			`====> opacity: ${writeConfigAlacrittyOptions.opacity}`,
		);
		expect(consoleLogMock).toHaveBeenCalled();

		consoleLogMock.mockRestore();

		const configFileAlacritty = changeConfig.readConfig();
		const newConfigAlacritty = configFileAlacritty.replace(
			/opacity = (1|0(\.\d)?)/,
			`opacity = ${writeConfigAlacrittyOptions.opacity}`,
		);
		changeConfig.writeConfig(newConfigAlacritty);

		expect(newConfigAlacritty).toContain(
			`opacity = ${writeConfigAlacrittyOptions.opacity}`,
		);
	});

	test('Deberia de cambiar el tamaño del padding', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			padding: 22,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith(
			`====> padding: ${writeConfigAlacrittyOptions.padding}`,
		);
		expect(consoleLogMock).toHaveBeenCalled();

		consoleLogMock.mockRestore();

		const configFileAlacritty = changeConfig.readConfig();
		const newConfigAlacritty = configFileAlacritty.replace(
			/padding = \{.*\}/,
			`padding = { x = ${writeConfigAlacrittyOptions.padding}, y = ${writeConfigAlacrittyOptions.padding} }`,
		);
		changeConfig.writeConfig(newConfigAlacritty);

		expect(newConfigAlacritty).toContain(
			`padding = { x = ${writeConfigAlacrittyOptions.padding}, y = ${writeConfigAlacrittyOptions.padding} }`,
		);
	});

	test('Deberia de detenerse si theme es undefined', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			theme: 'qwjdoeiwjcasd' as ThemeOptions,
		};

		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith('showTheme');
		expect(consoleLogMock).toHaveBeenCalledWith('afterglow');
		expect(consoleLogMock).toHaveBeenCalledWith('github_light_colorblind');
		expect(consoleLogMock).toHaveBeenCalledWith('xterm');
		expect(consoleLogMock).toHaveBeenCalledWith(
			'Error: theme must be equal to a valid theme',
		);

		expect(consoleLogMock).toHaveBeenCalledTimes(117);
	});

	test('Deberia de cambiar el tema en la configuracion de Alacritty', () => {
		const consoleLogMock = jest
			.spyOn(console, 'log')
			.mockImplementation(() => {});
		const writeConfigAlacrittyOptions = {
			theme: 'ayu_dark' as ThemeOptions,
		};
		changeConfig.writeConfigAlacritty(writeConfigAlacrittyOptions);

		expect(consoleLogMock).toHaveBeenCalledWith(
			`====> theme: ${writeConfigAlacrittyOptions.theme}`,
		);
		expect(consoleLogMock).toHaveBeenCalled();

		consoleLogMock.mockRestore();

		const configFileAlacritty = changeConfig.readConfig();
		const newConfigAlacritty = configFileAlacritty.replace(
			/import = \[.*\]/,
			`import = ["~/.config/alacritty/themes/themes/${writeConfigAlacrittyOptions.theme}.toml"]`,
		);
		changeConfig.writeConfig(newConfigAlacritty);

		expect(newConfigAlacritty).toContain(
			`import = ["~/.config/alacritty/themes/themes/${writeConfigAlacrittyOptions.theme}.toml"]`,
		);
	});

	// test('tes', () => {
	// 	Object.entries(themes).map(([value, key], i) => console.log(i, value, key));
	// });
});
