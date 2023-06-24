import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const operationSystem = (arg) => {
	const value = arg.slice(2);

	if (value === 'EOL') {
		console.log(JSON.stringify(EOL));
	} else if (value === 'cpus') {
		const cores = cpus();

		const coresInfo = cores.map((core) => {
			const { model, speed } = core;

			return { model, speed: (speed / 1000).toFixed(2) };
		});

		console.log(`Number of CPUs: ${coresInfo.length}`);
		coresInfo.forEach((core, index) => {
			console.log(`CPU ${index + 1}: ${core.model} - ${core.speed} GHz`);
		});
	} else if (value === 'homedir') {
		console.log(homedir());
	} else if (value === 'username') {
		console.log(userInfo().username);
	} else if (value === 'architecture') {
		console.log(arch());
	}
}
