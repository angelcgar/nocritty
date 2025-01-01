import fs from 'node:fs';
import path from 'node:path';

import { mainConfigFilePath, alacrittyThemesDir, themes } from '../data';

export class ShowConfigService {
	public showConfig(show?: boolean): string {
		if (!show) return '';
		const configOfAlacritty = fs.readFileSync(mainConfigFilePath, 'utf-8');
		if (!configOfAlacritty) return 'No hay configuración';

		return configOfAlacritty;
	}

	public showAllThemes(list?: boolean): void {
		if (!list) return;

		for (const theme in themes) {
			// if (Object.prototype.hasOwnProperty.call(themes, theme)) {
			// const element = themes[theme];
			console.log(theme);
			// }
		}

		//* esto lee todos los temas instalados en el sistema
		// const themes = fs.readdirSync(alacrittyThemesDir);

		// themes
		// 	.filter((theme) => path.extname(theme) === '.toml')
		// 	.map((theme) => {
		// 		return theme.replace('.toml', '');
		// 	})
		// 	.map((theme, i) => {
		// 		console.log(i + 1, theme);
		// 	});
	}
}
