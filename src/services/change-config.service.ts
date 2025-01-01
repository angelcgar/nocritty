import fs from 'node:fs';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

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
		// todo: manejar los errores con un mensaje más claro
	}: WriteConfigAlacritty):
		| { error: string | undefined; result: null | 'ok' }
		| undefined {
		// console.log(theme, 'theme1');
		// theme = (themes[theme] as ThemeOptions) ?? themes.alacritty;
		// console.log(theme, 'theme2');

		this.newConfigAlacritty = this.readConfig();
		if (size === 0 || size! < 0) {
			console.error('Error: size must be greater than 0');
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

		if (!font) {
			// todo: devolver una mejor retroalimentación para que server-app.ts pueda manejarla
			// y que change-config.service.ts NO maneje toda la logica de la aplicacion
			// todo: mostrar una mejor retroalimentacion para todos los cosos de error
			console.log('Error: font must be a string');
			for (const font in fonts) {
				console.log(font);
			}
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
		if (opacity || opacity === 0) {
			console.log(`====> opacity: ${opacity}`);
			this.newConfigAlacritty = this.readConfig().replace(
				/opacity = (1|0(\.\d)?)/,
				`opacity = ${opacity}`,
			);
			this.writeConfig(this.newConfigAlacritty);
		}
		if (padding) {
			console.log(`====> padding: ${padding}`);
			this.newConfigAlacritty = this.readConfig().replace(
				/padding = \{.*\}/,
				`padding = { x = ${padding}, y = ${padding} }`,
			);
			this.writeConfig(this.newConfigAlacritty);
		}
		if (theme) {
			// todo: buscar el nuevo tema y manejar la excepcion si no lo encuentro
			// todo: hacer una copia del tema anterior si no se asigna correctamente a alacritty.toml
			console.log(`====> theme: ${theme}`);
			this.newConfigAlacritty = this.readConfig().replace(
				/import = \[.*\]/,
				`import = ["~/.config/alacritty/themes/themes/${themes[theme]}.toml"]`,
			);
			this.writeConfig(this.newConfigAlacritty);

			// todo: mostrar una mejor retroalimentacion
			console.log({ size, opacity, padding, theme });
		}
	}
}
