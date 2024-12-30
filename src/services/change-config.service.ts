import fs from 'node:fs';

import { templateConfig, configMainPath, themes, testMainPath } from '../data';

import type { ThemeOptions } from '../types';

export class ChangeConfigService {
	public readConfig(): string {
		const configOfAlacritty = fs.readFileSync(configMainPath, 'utf-8');
		// const configOfAlacritty = fs.readFileSync(testMainPath, 'utf-8');
		if (!configOfAlacritty) return 'No hay configuración';

		return configOfAlacritty;
	}

	public writeConfig(data: string): boolean {
		try {
			fs.writeFileSync(configMainPath, data, 'utf-8');
			// fs.writeFileSync(testMainPath, data, 'utf-8');

			return true;
		} catch (error) {
			return false;
		}
	}

	public newConfigAlacritty: string | undefined;

	public writeConfigAlacritty(
		size: number | undefined,
		opacity: number | undefined,
		padding: number | undefined,
		theme: ThemeOptions,
	): void {
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

			console.log({ size, opacity, padding, theme });
		}

		// todo: mostrar una mejor retroalimentacion
	}
}
