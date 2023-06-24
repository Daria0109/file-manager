import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { change } from './nwd/change.js';
import { list } from './nwd/list.js';
import { getCurrent } from './nwd/getCurrent.js';

const rl = readline.createInterface({ input, output });

const getUsername = () => {
	const usernameArgument = process.argv.find((arg) => arg.startsWith('--username'));
	return usernameArgument.split('=')[1];
};

const welcome = async () => {
	process.stdout.write(`Welcome to the File Manager, ${getUsername()}!\n`);
};

const exit = () => {
	process.stdout.write(`Thank you for using File Manager, ${getUsername()}, goodbye!\n`);
	process.exit(0);
};

const launchApp = async () => {
	await welcome();

	change(os.homedir());

	rl.prompt();

	rl.on('line', (input) => {
		const inputSegments = input.split(' ');
		const command = inputSegments[0];
		const pathToFile = inputSegments[1];

		switch (command) {
			case '.exit':
				return exit();
			case 'up':
				const { base } = path.parse(process.cwd());
				if (base) {
					change('..');
				}
				rl.prompt();
				break;
			case 'cd':
				change(pathToFile);
				rl.prompt();
				break;
			case 'ls':
				list();
				rl.prompt();
				break;
			default:
				console.log('Invalid input');
		}

		// rl.prompt();
	});

	rl.on('close', () => {
		return exit();
	});

};

await launchApp();
