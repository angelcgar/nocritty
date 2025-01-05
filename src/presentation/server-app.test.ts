import { ChangeConfigService } from '../services/change-config.service';
import { ServerApp } from './server-app';
describe('Server app', () => {
	const options = {
		size: 12,
		opacity: 0.7,
		padding: 12,
		theme: 'darcula',
		list: false,
		show: false,
		font: 'ubuntu',
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Deria de crear una instancia de Server app', () => {
		const serverapp = new ServerApp();

		expect(serverapp).toBeInstanceOf(ServerApp);
		expect(typeof ServerApp.run).toBe('function');
	});

	test('Deberia de ejecutarse Server app con opciones', () => {
		const logSpy = jest.spyOn(console, 'log');
		const writeConfigAlacritty = jest.spyOn(
			ChangeConfigService.prototype,
			'writeConfigAlacritty',
		);

		ServerApp.run(options);
		expect(logSpy).toHaveBeenCalledTimes(7);
		expect(logSpy).toHaveBeenNthCalledWith(1, 'alacritty-config-theme');

		expect(writeConfigAlacritty).toHaveBeenCalledTimes(1);
		expect(writeConfigAlacritty).toHaveBeenCalledWith({
			size: options.size,
			opacity: options.opacity,
			padding: options.padding,
			font: options.font,
			theme: options.theme,
		});
	});
});
