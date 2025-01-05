#! /usr/bin/env node

import { yarg } from './config/yargs.plugin';
import { ServerApp } from './presentation/server-app';

(async () => {
	await main();
})();

async function main() {
	const {
		s: size,
		o: opacity,
		p: padding,
		t: theme,
		l: list,
		S: show,
		f: font,
	} = yarg;

	ServerApp.run({ size, opacity, padding, theme, list, show, font });
}
