import { getUsername } from './getUsername.js';

export const welcomeUser = () => {
	console.log(`Welcome to the File Manager, ${getUsername()}!`);
};
