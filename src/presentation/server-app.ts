import { ChangeConfigService } from '../services/change-config.service';

import type { ThemeOptions } from '../types';

interface RunOptions {
	size: number | undefined;
	opacity: number | undefined;
	padding: number | undefined;
	theme: string | undefined;
}

export class ServerApp {
	static run({ size, opacity, padding, theme }: RunOptions): void {
		if (
			size === undefined &&
			opacity === undefined &&
			padding === undefined &&
			theme === undefined
		) {
			console.log('No arguments passed');
			return;
		}

		console.log('Aplication run...');

		const configService = new ChangeConfigService();

		const readFileConfig = configService.readConfig();
		if (!readFileConfig) return;

		configService.writeConfigAlacritty(
			size,
			opacity,
			padding,
			theme as ThemeOptions,
		);
	}

	public status = ':)';
}
