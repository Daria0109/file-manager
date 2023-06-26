import { readFile, stat } from 'fs/promises';
import { resolve } from 'path';
import { getErrorMessage } from '../init/getErrorMessage.js';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';

const { createHash } = await import('node:crypto');

export const calculateHash = async (fileName = '') => {
	try {
		const pathToFile = resolve(process.cwd(), fileName);
		const stats = await stat(pathToFile);

		if (stats.isFile()) {
			const content = await readFile(pathToFile);
			const hashSum = createHash('sha256');
			hashSum.update(content);

			const hex = hashSum.digest('hex');

			console.log(hex);
		} else {
			throw new Error(INVALID_INPUT_ERROR);
		}
	} catch (err) {
		throw new Error(getErrorMessage(err.message));
	}
}
