import { Logger } from 'src/app/classes/Logger';

export class LoggerError extends Error {
	constructor(
		sourceClass: string,
		sourceMethod: string,
		message: string,
		error?: Error,
		data?: any
		) {
		super(message);
		Logger.add(sourceClass, sourceMethod, message, error, data);
	}
}
