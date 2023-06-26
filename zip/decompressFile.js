import { basename, resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import { retrieveFilePaths } from '../utils/helpers/retrieveFilePaths.js';
import { stat } from 'fs/promises';
import { getCurrentPath } from '../nwd/getCurrentPath.js';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { getErrorMessage } from '../utils/helpers/getErrorMessage.js';

export const decompressFile = async (paths) => {
	try {
		const { pathToFile, destinationPath } = retrieveFilePaths(paths);

		const fileStats = await stat(pathToFile);
		const directoryStats = await stat(destinationPath);

		if (fileStats.isFile() && directoryStats.isDirectory()) {
			const fileName = basename(pathToFile);
			const pathToDestination = resolve(destinationPath, fileName.slice(0, -3));

			const readStream = createReadStream(pathToFile);
			const writeStream = createWriteStream(pathToDestination);

			await pipeline(
				readStream,
				createBrotliDecompress(),
				writeStream
			);
			getCurrentPath();
		} else {
			throw new Error(INVALID_INPUT_ERROR);
		}
	} catch (err) {
		throw new Error(getErrorMessage(err.message));
	}
}
