import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export abstract class Logger {
	static loggerObject: BehaviorSubject<LoggerSubject> = new BehaviorSubject(null);

	static add(sourceClass: string, sourceMethod: string, message: string, error?: Error, data?: any) {
		Logger.loggerObject.next({ sourceClass, sourceMethod, message, error, data });
	}
}
