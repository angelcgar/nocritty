import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
	// todo: ordenar las opciones
	.scriptName('alacritty-config-theme')
	.option('s', {
		alias: 'size',
		type: 'number',
		describe: 'Size of font',
	})
	.option('o', {
		alias: 'opacity',
		type: 'number',
		describe: 'Opacity',
	})
	.option('p', {
		alias: 'padding',
		type: 'number',
		describe: 'Padding',
	})
	.option('t', {
		alias: 'theme',
		type: 'string',
		describe: 'Theme of terminal',
	})
	.option('h', {
		alias: 'help',
		type: 'boolean',
		describe: 'Show help',
	})
	// todo: manejar la excepción donde no tenga ningún tema
	.options('l', {
		alias: 'list',
		type: 'boolean',
		describe: 'List all themes available',
	})
	.option('S', {
		alias: 'show',
		type: 'boolean',
		describe: 'Show the current configuration',
	})
	.option('f', {
		alias: 'font',
		type: 'string',
		describe: 'Font of terminal',
	})
	.check((argv, options) => {
		if (
			argv.s === undefined &&
			argv.o === undefined &&
			argv.p === undefined &&
			argv.l === undefined &&
			argv.S === undefined &&
			argv.f === undefined &&
			argv.t === undefined
		) {
			yargs.showHelp();
		}

		// if (argv.s < 1) throw 'Error: base must be greater than 0';
		// if (argv.l < 1) throw "Error: base must be greater than 0";

		return true;
	})
	.parseSync();
