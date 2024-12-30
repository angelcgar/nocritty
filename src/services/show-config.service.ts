import fs from 'node:fs';
import path from 'node:path';

import { mainConfigFilePath, alacrittyThemesDir } from '../data';

export class ShowConfigService {
	public showConfig(show: boolean): string {
		const configOfAlacritty = fs.readFileSync(mainConfigFilePath, 'utf-8');
		if (!configOfAlacritty) return 'No hay configuración';

		return configOfAlacritty;
	}

	public showAllThemes(list?: boolean): void {
		if (!list) return;

		const themes = fs.readdirSync(alacrittyThemesDir);

		themes
			.filter((theme) => path.extname(theme) === '.toml')
			.map((theme) => {
				return theme.replace('.toml', '');
			})
			.map((theme, i) => {
				console.log(i + 1, theme);
			});
	}
}
