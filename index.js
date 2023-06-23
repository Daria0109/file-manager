import os from 'os';

const readableStream = process.stdin;

const getUsername = () => {
	const usernameArgument = process.argv.find((arg) => arg.startsWith('--username'));
	const username = usernameArgument.split('=')[1];

	return username;
}

const welcome = () => {
	process.stdout.write(`Welcome to the File Manager, ${getUsername()}!\n`);
}

const exit = () => {
	process.stdout.write(`Thank you for using File Manager, ${getUsername()}, goodbye!`);
	process.exit(0);
}

const launchApp = async () => {
	welcome();

	process.stdout.write(`You are currently in ${os.homedir()}\n`)

	readableStream.on('data',  (chunk) => {
		if (chunk.toString().trim() === '.exit') {
			exit();
		}
		const data = chunk.toString();
		console.log(typeof chunk.toString());
	});

	process.on('SIGINT', () => {
		exit();
	});

}

await launchApp();
