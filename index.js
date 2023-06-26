import * as readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import os from 'os';
import { changePath } from './nwd/changePath.js';
import { list } from './nwd/list.js';
import { readFile } from './fs/readFile.js';
import { addFile } from './fs/addFile.js';
import { renameFile } from './fs/renameFile.js';
import { copyFile } from './fs/copyFile.js';
import { moveFile } from './fs/moveFile.js';
import { operationSystem } from './os/operationSystem.js';
import { calculateHash } from './hash/calculateHash.js';
import { compressFile } from './zip/compressFile.js';
import { decompressFile } from './zip/decompressFile.js';
import { goUpperPath } from './nwd/goUpperPath.js';
import {
	ADD_FILE,
	CHANGE_DIRECTORY,
	COMPRESS_FILE,
	COPY_FILE,
	DECOMPRESS_FILE, DELETE_FILE,
	EXIT_PROCESS,
	GO_UPPER,
	HASH_FILE,
	MOVE_FILE,
	OPERATING_SYSTEM,
	PRINT_LIST,
	READ_FILE,
	RENAME_FILE
} from './utils/constants/commands.js';
import { welcomeUser } from './init/welcomeUser.js';
import { exitProcess } from './init/exitProcess.js';
import { removeFile } from './fs/removeFile.js';
import { INVALID_INPUT_ERROR } from './utils/constants/messages.js';

const rl = readline.createInterface({ input, output });

const launchApp = async () => {
	welcomeUser();

	await changePath(os.homedir());

	rl.prompt();

	rl.on('line', async (input) => {
		const inputSegments = input.split(' ');
		const filteredSegments = inputSegments.filter((item) => Boolean(item));
		const command = filteredSegments[0];

		const pathToFile = filteredSegments.slice(1).join(' ');

		const actions = {
			[EXIT_PROCESS]: exitProcess,
			[GO_UPPER]: goUpperPath,
			[CHANGE_DIRECTORY]: changePath,
			[PRINT_LIST]: list,
			[READ_FILE]: readFile,
			[ADD_FILE]: addFile,
			[RENAME_FILE]: renameFile,
			[COPY_FILE]: copyFile,
			[MOVE_FILE]: moveFile,
			[DELETE_FILE]: removeFile,
			[OPERATING_SYSTEM]: operationSystem,
			[HASH_FILE]: calculateHash,
			[COMPRESS_FILE]: compressFile,
			[DECOMPRESS_FILE]: decompressFile
		};

		if (actions[command]) {
			try {
				await actions[command](pathToFile);
			} catch (err) {
				console.log(err.message);
			}
		} else {
			console.log(INVALID_INPUT_ERROR);
		}
		rl.prompt();

	});

	rl.on('close', () => {
		return exitProcess();
	});

};

await launchApp();
