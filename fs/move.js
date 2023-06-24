import { parse, resolve } from 'path';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
import { pipeline } from 'stream';

export const move = (file, directory) => {
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
			} else {
				unlinkSync(pathToFile);
			}
		}
	)
}
