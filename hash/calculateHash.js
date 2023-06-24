import { readFile } from 'fs';
import { resolve } from 'path';

const { createHash } = await import('node:crypto');

export const calculateHash = (fileName) => {
	const pathToFile = resolve(process.cwd(), fileName);

	readFile(pathToFile, (err, data) => {
		if (err) {
			console.log('Operation failed');
		} else {
			const hashSum = createHash('sha256');
			hashSum.update(data);

			const hex = hashSum.digest('hex');

			console.log(hex);
		}
	});
}
