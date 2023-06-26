import { resolve, extname } from 'path';
import { rename } from 'fs/promises';
import { getCurrentPath } from '../nwd/getCurrentPath.js';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { retrieveFilePaths } from '../init/retrieveFilePaths.js';
import { getErrorMessage } from '../init/getErrorMessage.js';

export const renameFile = async (paths) => {
	try {
		const { pathToFile, destinationPath } = retrieveFilePaths(paths);

		if (!extname(pathToFile) || !extname(destinationPath)) {
			throw new Error(INVALID_INPUT_ERROR);
		}

		await rename(pathToFile, destinationPath);
		getCurrentPath();
	} catch (err) {
		throw new Error(getErrorMessage(err.message));
	}
};
