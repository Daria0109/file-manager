import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { resolve } from 'path';

export const retrieveFilePaths = (paths) => {
	const segments = paths.split(' ');
	if (segments.length !== 2) {
		throw new Error(INVALID_INPUT_ERROR);
	}

	const [oldPath, newPath] = segments;

	const pathToFile = resolve(process.cwd(), oldPath);
	const destinationPath = resolve(process.cwd(), newPath);

	return { pathToFile, destinationPath };
}