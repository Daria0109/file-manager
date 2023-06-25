import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createBrotliDecompress } from 'zlib';

export const decompress = (fileName, destination) => {
	const pathToFile = resolve(process.cwd(), fileName);
	const pathToDestination = resolve(process.cwd(), destination);

	const readStream = createReadStream(pathToFile);
	const writeStream = createWriteStream(pathToDestination);

	pipeline(
		readStream,
		createBrotliDecompress(),
		writeStream,
		(err) => {
			if (err) {
				console.log('Operation failed');
			}
		}
	);
}
