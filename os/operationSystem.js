import { EOL, cpus, homedir, userInfo, arch } from 'os';
import { INVALID_INPUT_ERROR } from '../utils/constants/messages.js';
import { ARCHITECTURE, CPUS, EOL_ARG, HOMEDIR, USERNAME } from '../utils/constants/os.js';

export const operationSystem = (arg) => {
	if (arg.startsWith('--')) {
		const value = arg.slice(2);

		switch (value) {
			case EOL_ARG:
				console.log(JSON.stringify(EOL));
				break;
			case CPUS:
				const cores = cpus();

				const coresInfo = cores.map((core) => {
					const { model, speed } = core;

					return { model, speed: (speed / 1000).toFixed(2) };
				});

				console.log(`Number of CPUs: ${coresInfo.length}`);
				coresInfo.forEach((core, index) => {
					console.log(`CPU ${index + 1}: ${core.model} - ${core.speed} GHz`);
				});
				break;
			case HOMEDIR:
				console.log(homedir());
				break;
			case USERNAME:
				console.log(userInfo().username);
				break;
			case ARCHITECTURE:
				console.log(arch());
				break;
			default:
				throw new Error(INVALID_INPUT_ERROR);
		}

	} else {
		throw new Error(INVALID_INPUT_ERROR);
	}
}
