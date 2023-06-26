import { readdir } from 'fs/promises';
import { getCurrentPath } from './getCurrentPath.js';
import { resolve } from 'path';
import { OPERATION_FAILED_ERROR } from '../utils/constants/messages.js';

export const list = async (pathName = '') => {
	try {
		if (pathName) {
			const newPath = resolve(process.cwd(), pathName.trim());
			process.chdir(newPath);
		}

		const directories = [];
		const files = [];

		const data = await readdir(process.cwd(), { withFileTypes: true });

		data.forEach((item) => {
			if (item.isDirectory()) {
				directories.push({ Name: item.name, Type: 'directory' });
			} else if (item.isFile()) {
				files.push({ Name: item.name, Type: 'file' });
			}
		});

		const sortedDirectories = directories.sort((a, b) => a.Name - b.Name);
		const sortedFiles = files.sort((a, b) => a.Name - b.Name);

		console.log(process.cwd());
		console.table([...sortedDirectories, ...sortedFiles]);
		getCurrentPath();
	} catch(err) {
		throw new Error(OPERATION_FAILED_ERROR);
	}
};
