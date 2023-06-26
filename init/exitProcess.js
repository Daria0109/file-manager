import { getUsername } from './getUsername.js';

export const exitProcess = () => {
	console.log(`Thank you for using File Manager, ${getUsername()}, goodbye!`);
	process.exit(0);
};