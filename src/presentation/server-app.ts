import { ShowConfigService } from './../services/show-config.service';
import { ChangeConfigService } from '../services/change-config.service';

import type { ThemeOptions, FontOptions } from '../types';

interface RunOptions {
	size?: number;
	opacity?: number;
	padding?: number;
	theme?: string;
	list?: boolean;
	show?: boolean;
	font?: string;
}

export class ServerApp {
	static run({
		size,
		opacity,
		padding,
		theme,
		list,
		show,
		font,
	}: RunOptions): void {
		if (
			size === undefined &&
			opacity === undefined &&
			padding === undefined &&
			list === undefined &&
			show === undefined &&
			font === undefined &&
			theme === undefined
		) {
			console.log('No arguments passed');
			return;
		}

		console.log('Aplication run...');

		const configService = new ChangeConfigService();
		const showConfigService = new ShowConfigService();

		const readFileConfig = configService.readConfig();
		if (!readFileConfig) return;

		configService.writeConfigAlacritty({
			size,
			opacity,
			padding,
			font: font as FontOptions,
			theme: theme as ThemeOptions,
		});

		showConfigService.showAllThemes(list);
		if (show) {
			console.log(showConfigService.showConfig(show));
		}
	}

	public status = ':)';
}
