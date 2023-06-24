import { pipeline } from 'stream';
import { resolve, parse } from 'path';
import { createReadStream, createWriteStream } from 'fs';

export const copyFile = (file, directory) => {
	const pathToFile = resolve(process.cwd(), file);
	const fileName = parse(pathToFile).base;
	const pathToDirectory = resolve(process.cwd(), directory, fileName);

	const readStream = createReadStream(pathToFile);
	const writeStream = createWriteStream(pathToDirectory, { flags: 'wx' });

	pipeline(
		readStream,
		writeStream,
		(err) => {
			if (err) {
				console.log(`Operation failed: ${err}`);
			}
		}
	)
}
