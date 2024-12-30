import { join } from 'node:path';
import { homedir } from 'node:os';

export const mainConfigFilePath = join(
	homedir(),
	'.config/alacritty/alacritty.toml',
);

export const alacrittyThemesDir = join(
	homedir(),
	'.config/alacritty/themes/themes',
);

export const templateLocal = join(homedir(), '.config/alacritty/nocritty.txt');

export const testMainPath = join(__dirname, '../../alacritty.toml');
