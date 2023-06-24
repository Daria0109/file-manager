export const getCurrent = () => {
	process.stdout.write(`You are currently in ${process.cwd()}\n`);
}
