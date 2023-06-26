import { unlink, stat } from 'fs/promises';
import { resolve } from 'path';
import { getCurrentPath } from '../nwd/getCurrentPath.js';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { getErrorMessage } from '../utils/helpers/getErrorMessage.js';

export const removeFile = async (fileName) => {
	try {
		const pathToFile = resolve(process.cwd(), fileName);
		const stats = await stat(pathToFile);

		if (stats.isFile()) {
			await unlink(pathToFile);
			getCurrentPath();
		} else {
			throw new Error(INVALID_INPUT_ERROR)
		}
	} catch (err) {
		throw new Error(getErrorMessage(err.message));
	}
}
