import { parse, resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { retrieveFilePaths } from '../init/retrieveFilePaths.js';
import { stat, unlink } from 'fs/promises';
import { getCurrentPath } from '../nwd/getCurrentPath.js';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { getErrorMessage } from '../init/getErrorMessage.js';

export const moveFile = async (paths) => {
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

			await unlink(pathToFile);
			getCurrentPath();
		} else {
			throw new Error(INVALID_INPUT_ERROR);
		}
	} catch (err) {
		throw new Error(getErrorMessage(err.message));
	}
};
