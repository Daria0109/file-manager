import { INVALID_INPUT_ERROR } from '../constants/messages.js';
import { resolve } from 'path';

export const retrieveFilePaths = (paths) => {
	const segments = paths.split(' ');
	const filteredSegments = segments.filter((item) => Boolean(item));

	if (filteredSegments.length !== 2) {
		throw new Error(INVALID_INPUT_ERROR);
	}

	const [oldPath, newPath] = segments;

	const pathToFile = resolve(process.cwd(), oldPath);
	const destinationPath = resolve(process.cwd(), newPath);

	return { pathToFile, destinationPath };
}