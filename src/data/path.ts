import { join } from 'node:path';
import { homedir } from 'node:os';

export const configMainPath = join(
	homedir(),
	'.config/alacritty/alacritty.toml',
);

export const templateLocal = join(homedir(), '.config/alacritty/nocritty.txt');
