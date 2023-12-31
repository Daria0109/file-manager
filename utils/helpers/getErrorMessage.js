import { INVALID_INPUT_ERROR, OPERATION_FAILED_ERROR } from '../constants/messages.js';

export const getErrorMessage = (message) => {
	return message === INVALID_INPUT_ERROR
		? INVALID_INPUT_ERROR
		: OPERATION_FAILED_ERROR;
}
