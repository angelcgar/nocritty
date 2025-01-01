import fs from 'node:fs';

import {
	templateConfig,
	mainConfigFilePath,
	themes,
	testMainPath,
	fonts,
} from '../data';

import type { ThemeOptions } from '../types';
import type { FontOptions } from '../types/font-option.type';

interface WriteConfigAlacritty {
	size?: number;
	opacity?: number;
	padding?: number;
	font?: FontOptions;
	theme: ThemeOptions;
}

export class ChangeConfigService {
	public readConfig(): string {
		const configOfAlacritty = fs.readFileSync(mainConfigFilePath, 'utf-8');
		// const configOfAlacritty = fs.readFileSync(testMainPath, 'utf-8');
		if (!configOfAlacritty) return 'No hay configuración';

		return configOfAlacritty;
	}

	public writeConfig(data: string): boolean {
		try {
			fs.writeFileSync(mainConfigFilePath, data, 'utf-8');
			// fs.writeFileSync(testMainPath, data, 'utf-8');

			return true;
		} catch (error) {
			return false;
		}
	}

	public newConfigAlacritty: string | undefined;

	public writeConfigAlacritty({
		opacity,
		padding,
		theme,
		font,
		size,
	}: WriteConfigAlacritty): void {
		if (font === '') {
			for (const font in fonts) {
				console.log(font);
			}
			console.log('Error: font must be equal to a valid font');
			return;
		}

		if (font) {
			console.log(`====> font: ${font}`);
			this.newConfigAlacritty = this.readConfig()
				.replace(
					/normal = \{.*\}/,
					`normal = { family = "${fonts[font]}", style = "Regular" }`,
				)
				.replace(
					/bold = \{.*\}/,
					`bold = { family = "${fonts[font]}", style = "Bold" }`,
				)
				.replace(
					/italic = \{.*\}/,
					`italic = { family = "${fonts[font]}", style = "Italic" }`,
				)
				.replace(
					/bold_italic = \{.*\}/,
					`bold_italic = { family = "${fonts[font]}", style = "Bold Italic" }`,
				);
			this.writeConfig(this.newConfigAlacritty);
		}

		if (size! <= 0) {
			this.reportInvalidOption('size');
			return;
		}

		if (size) {
			size < 10
				? console.warn('Warning: size is less than 10')
				: console.log(`====> size: ${size}`);
			this.newConfigAlacritty = this.readConfig().replace(
				/size = \d+/,
				`size = ${size}`,
			);
			this.writeConfig(this.newConfigAlacritty);
		}

		if (opacity! < 0) {
			this.reportInvalidOption('opacity');
			return;
		}

		if (opacity || opacity === 0) {
			console.log(`====> opacity: ${opacity}`);
			this.newConfigAlacritty = this.readConfig().replace(
				/opacity = (1|0(\.\d)?)/,
				`opacity = ${opacity}`,
			);
			this.writeConfig(this.newConfigAlacritty);
		}

		if (padding! < 0) {
			this.reportInvalidOption('padding');
			return;
		}
		if (padding) {
			console.log(`====> padding: ${padding}`);
			this.newConfigAlacritty = this.readConfig().replace(
				/padding = \{.*\}/,
				`padding = { x = ${padding}, y = ${padding} }`,
			);
			this.writeConfig(this.newConfigAlacritty);
		}

		if (theme === '') this.showTheme();

		const newTheme = themes[theme];
		const themeExists = newTheme !== undefined;

		if (newTheme === undefined && theme) this.showTheme();
		if (themeExists) {
			console.log(`====> theme: ${theme}`);
			this.newConfigAlacritty = this.readConfig().replace(
				/import = \[.*\]/,
				`import = ["~/.config/alacritty/themes/themes/${newTheme}.toml"]`,
			);
			this.writeConfig(this.newConfigAlacritty);

			// todo: mostrar una mejor retroalimentacion
			console.log({ size, opacity, padding, theme });
		}
	}

	public showTheme(): void {
		console.log('showTheme');
		for (const theme in themes) {
			console.log(theme);
		}

		console.log('Error: theme must be equal to a valid theme');
		return;
	}

	public reportInvalidOption(option: string): void {
		console.log('reportInvalidOption');
		console.log(`Error: ${option} must be greater than 0`);
	}
}

// todo: guardar todo un tema por un nombre y hacignarlo en el archivo de configuración
// console.log(
// 	this.newConfigAlacritty
// 		.split('\n')
// 		.find((line) => line.includes('import'))
// 		?.split('/')
// 		.at(-1)
// 		?.replace('.toml"]', ''),
// );
