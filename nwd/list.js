import { readdir, statSync } from 'fs';
import { join } from 'path';
import { getCurrent } from './getCurrent.js';

export const list = () => {
	readdir(process.cwd(), (err, data) => {
		const directories = [];
		const files = [];

		data.sort().forEach((item) => {
			const stats = statSync(join(process.cwd(), item));
			if (stats.isFile()) {
				files.push({ Name: item, Type: 'file' });
			} else if (stats.isDirectory()) {
				directories.push({ Name: item, Type: 'directory' });
			}
		});
		console.log(process.cwd());
		console.table([...directories, ...files]);
		getCurrent();
	});
}
