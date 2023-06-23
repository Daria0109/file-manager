import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import os from 'os';

const rl = readline.createInterface({ input, output })

const getUsername = () => {
	const usernameArgument = process.argv.find((arg) => arg.startsWith('--username'));
	return usernameArgument.split('=')[1];
}

const welcome = () => {
	process.stdout.write(`Welcome to the File Manager, ${getUsername()}!\n`);
}

const exit = () => {
	process.stdout.write(`Thank you for using File Manager, ${getUsername()}, goodbye!\n`);
	process.exit(0);
}

const launchApp = async () => {
	welcome();

	process.stdout.write(`You are currently in ${os.homedir()}\n`)

	rl.prompt();

	rl.on('line', (input) => {
		if (input === '.exit') {
			return exit();
		}

		rl.prompt();
	});

	rl.on('close', () => {
		return exit();
	});

}

await launchApp();
