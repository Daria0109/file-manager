export const getUsername = () => {
	const defaultName = 'Anonymous'

	const usernameArgument = process.argv.find((arg) => arg.includes('--username='));

	if (usernameArgument) {
		const userName = usernameArgument.split('=')[1];

		return userName ? userName : defaultName;
	} else {
		return defaultName;
	}
};
