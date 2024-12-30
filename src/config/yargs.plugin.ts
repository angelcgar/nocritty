import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
	.scriptName('alacritty-config-theme')
	// todo: añadir la opcion de mostrar los temas que el usuario tiene disponible
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
	.check((argv, options) => {
		if (
			argv.s === undefined &&
			argv.o === undefined &&
			argv.p === undefined &&
			argv.t === undefined
		) {
			yargs.showHelp();
		}

		// if (argv.s < 1) throw 'Error: base must be greater than 0';
		// if (argv.l < 1) throw "Error: base must be greater than 0";

		return true;
	})
	.parseSync();
