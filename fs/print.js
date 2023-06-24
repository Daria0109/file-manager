import { createReadStream, statSync } from 'fs';
import { resolve } from 'path';

export const print = (pathName) => {
	const pathToFile = resolve(process.cwd(), pathName);
	const stats = statSync(pathToFile);

	if (stats.isFile()) {
		const readStream = createReadStream(pathToFile, {  encoding: 'utf-8'});
		const writeStream = process.stdout;

		readStream.pipe(writeStream);
	} else {
		console.log('Not a path to file was provided');
	}

}
