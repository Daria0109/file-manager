import { createReadStream } from 'fs';
import { access } from 'fs/promises';
import { stat } from 'fs/promises';
import { resolve } from 'path';
import * as readline from 'readline';
import { INVALID_INPUT_ERROR, OPERATION_FAILED_ERROR } from '../utils/constants/messages.js';

export const readFile = async (pathName) => {
	try {
		const pathToFile = resolve(process.cwd(), pathName);
		await access(pathToFile);
		const stats = await stat(pathToFile);

		if (!stats.isFile()) {
			throw new Error(INVALID_INPUT_ERROR);
		}

		if (stats.isFile()) {
			const stream = createReadStream(pathToFile, { encoding: 'utf-8' });

			await new Promise((res) => {
				const rl = readline.createInterface({
					input: stream,
					output: process.stdout,
					terminal: false
				});

				rl.on('line', (line) => {
					console.log(line);
				});

				rl.on('close', () => {
					res();
				});
			});
		}
	} catch (err) {
		throw new Error(OPERATION_FAILED_ERROR);
	}

}
