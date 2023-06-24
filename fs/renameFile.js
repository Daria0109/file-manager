import { resolve } from 'path';
import { rename } from 'fs';
import { getCurrent } from '../nwd/getCurrent.js';

export const renameFile = (file, newFile) => {
	// const [file, newFile] = files.split(' ');

	const pathToFile = resolve(process.cwd(), file);
	const pathToNewFile = resolve(process.cwd(), newFile);

	rename(pathToFile, pathToNewFile, (err) => {
		if (err) {
			console.log('Operation failed');
		} else {
			getCurrent();
		}
	});
}
