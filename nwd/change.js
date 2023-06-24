import { resolve } from 'path';
import { getCurrent } from './getCurrent.js';

export const change = (pathName) => {
	const newPath = resolve(process.cwd(), pathName);
	try {
		process.chdir(newPath);
		getCurrent();
	} catch (err) {
		console.error(`Directory "${newPath}" does not exist.`);
	}
}