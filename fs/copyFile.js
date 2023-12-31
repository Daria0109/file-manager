import { resolve, parse } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { retrieveFilePaths } from '../utils/helpers/retrieveFilePaths.js';
import { getCurrentPath } from '../nwd/getCurrentPath.js';
import { getErrorMessage } from '../utils/helpers/getErrorMessage.js';

export const copyFile = async (paths) => {
	try {
		const { pathToFile, destinationPath } = retrieveFilePaths(paths);

		const fileStats = await stat(pathToFile);
		const directoryStats = await stat(destinationPath);

		if (fileStats.isFile() && directoryStats.isDirectory()) {
			const fileName = parse(pathToFile).base;
			const pathToDirectory = resolve(process.cwd(), destinationPath, fileName);

			const readStream = createReadStream(pathToFile);
			const writeStream = createWriteStream(pathToDirectory, { flags: 'wx' });

			await pipeline(
				readStream,
				writeStream
			);

			getCurrentPath();
		} else {
			throw new Error(INVALID_INPUT_ERROR);
		}
	} catch (err) {
		throw new Error(getErrorMessage(err.message));
	}
};
