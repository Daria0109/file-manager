import path from 'path';
import { change } from './change.js';

export const goUp = () => {
	const { base } = path.parse(process.cwd());
	if (base) {
		change('..');
	}
}
