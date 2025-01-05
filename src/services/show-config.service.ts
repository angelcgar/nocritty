import fs from 'node:fs';
import path from 'node:path';

import { mainConfigFilePath, alacrittyThemesDir, themes } from '../data';

export class ShowConfigService {
	public showConfig(show: boolean): string | undefined {
		try {
			const configOfAlacritty = fs.readFileSync(mainConfigFilePath, 'utf-8');

			return configOfAlacritty;
		} catch (error) {
			console.log('No hay configuración');

			return;
		}
	}

	public showAllThemes(list: boolean): void {
		console.log('\nListando todos los temas');

		Object.entries(themes).map(([key, value], i) => console.log(i + 1, key));

		console.log('Escoje un tema');
	}
}
