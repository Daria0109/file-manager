import { readdir } from 'fs';
import { getCurrent } from './getCurrent.js';

export const list = () => {
	readdir(process.cwd(), { withFileTypes: true }, (err, data) => {
		const directories = [];
		const files = [];

		data.forEach((item) => {
			if (item.isFile()) {
				files.push({ Name: item.name, Type: 'file' });
			} else if (item.isDirectory()) {
				directories.push({ Name: item.name, Type: 'directory' });
			}
		});

		const sortedDirectories = directories.sort((a, b) => a.Name - b.Name);
		const sortedFiles = files.sort((a, b) => a.Name - b.Name);

		console.log(process.cwd());
		console.table([...sortedDirectories, ...sortedFiles]);
		getCurrent();
	});
};
