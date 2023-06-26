import { appendFile } from 'fs/promises';
import { resolve, extname } from 'path';
import { getCurrentPath } from '../nwd/getCurrentPath.js';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { getErrorMessage } from '../utils/helpers/getErrorMessage.js';

export const addFile = async (fileName) => {
	try {
		const pathToFile = resolve(process.cwd(), fileName);
		const ext = extname(pathToFile);

		if (ext) {
			await appendFile(pathToFile, '', { flag: 'wx' });
			getCurrentPath();
		} else {
			throw new Error(INVALID_INPUT_ERROR);
		}
	} catch (err) {
		throw new Error(getErrorMessage(err.message));
	}
}
