import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
	.option('s', {
		alias: 'size',
		type: 'number',
		demandOption: true,
		describe: 'Size of font',
	})
	.option('o', {
		alias: 'opacity',
		type: 'number',
		default: 1,
		describe: 'Opacity',
	})
	.option('p', {
		alias: 'padding',
		type: 'number',
		default: 5,
		describe: 'Padding',
	})
	.option('t', {
		alias: 'theme',
		type: 'string',
		default: 'alacritty',
		describe: 'Theme of terminal',
	})
	.check((argv, options) => {
		if (argv.s < 1) throw 'Error: base must be greater than 0';
		// if (argv.l < 1) throw "Error: base must be greater than 0";

		return true;
	})
	.parseSync();
