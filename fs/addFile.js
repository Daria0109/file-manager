import { appendFile } from 'fs';
import { join } from 'path';
import { getCurrent } from '../nwd/getCurrent.js';

export const addFile = (fileName) => {
	const pathToFile = join(process.cwd(), fileName);
	appendFile(pathToFile, '', (err) => {
		if (err) {
			console.log('Operation failed');
		} else {
			getCurrent();
		}
	});
}
