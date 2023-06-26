import path from 'path';
import { changePath } from './changePath.js';
import { getCurrentPath } from './getCurrentPath.js';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';

export const goUpperPath = async (pathName) => {
	const { base } = path.parse(process.cwd());

	if (pathName) {
		throw new Error(INVALID_INPUT_ERROR);
	}

	if (base) {
		await changePath('..');
	} else {
		getCurrentPath();
	}
}
