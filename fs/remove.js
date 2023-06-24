import { unlink } from 'fs';
import { resolve } from 'path';
import { getCurrent } from '../nwd/getCurrent.js';

export const remove = (fileName) => {
	const pathToFile = resolve(process.cwd(), fileName);

	unlink(pathToFile, (err) => {
		if (err) {
			console.log('Operation failed');
		} else {
			getCurrent();
		}
	});
}
