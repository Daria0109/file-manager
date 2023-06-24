import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { change } from './nwd/change.js';
import { list } from './nwd/list.js';
import { getCurrent } from './nwd/getCurrent.js';
import { print } from './fs/print.js';
import { addFile } from './fs/addFile.js';
import { renameFile } from './fs/renameFile.js';
import { copyFile } from './fs/copyFile.js';
import { move } from './fs/move.js';
import { remove } from './fs/remove.js';

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
		// const part = inputSegments.slice(1);
		const pathToFile = inputSegments.slice(1);

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
				change(...pathToFile);
				rl.prompt();
				break;
			case 'ls':
				list();
				rl.prompt();
				break;
			case 'cat':
				print(...pathToFile);
				rl.prompt();
				break;
			case 'add':
				addFile(...pathToFile);
				rl.prompt();
				break;
			case 'rn':
				renameFile(...pathToFile);
				rl.prompt();
				break;
			case 'cp':
				copyFile(...pathToFile);
				rl.prompt();
				break;
			case 'mv':
				move(...pathToFile);
				rl.prompt();
				break;
			case 'rm':
				remove(...pathToFile);
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
