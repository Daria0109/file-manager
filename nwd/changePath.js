import { resolve } from 'path';
import { getCurrentPath } from './getCurrentPath.js';
import { OPERATION_FAILED_ERROR } from '../utils/constants/messages.js';

export const changePath = async (pathName = '') => {
	try {
		const newPath = resolve(process.cwd(), pathName.trim());
		process.chdir(newPath);
		getCurrentPath();
	} catch (err) {
		throw new Error(OPERATION_FAILED_ERROR);
	}
}