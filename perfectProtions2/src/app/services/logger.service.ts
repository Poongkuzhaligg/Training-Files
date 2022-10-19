import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Logger } from 'src/app/classes/Logger';
import { HttpService } from 'src/app/services/http.service';

interface Log {
	time: Date;
	data: object;
}

@Injectable({
	providedIn: 'root'
})
export class LoggerService {
	private log: Log[] = [];

	constructor(
		private http: HttpService,
		private platform: Platform
		) {
		Logger.loggerObject.subscribe((log) => {
			if (log) {
				this.add(log.sourceClass, log.sourceMethod, log.message, log.error, log.data);
			}
		});
	}

	get logArray() {
		return this.log;
	}

	add(sourceClass: string, sourceMethod: string, message: string, ...data) {
		let output;
		data = data.filter((dataItem) => {
			return dataItem !== null
				&& dataItem !== undefined;
		})
		.map((dataItem) => {
			if (dataItem && dataItem.__zone_symbol__currentTask) {
				return JSON.stringify(dataItem, Object.getOwnPropertyNames(dataItem));
			} else {
					return dataItem;
			}
		});

		if (data && data.length) {
			output = [`${sourceClass}: ${sourceMethod} - ${message}`, data];
		} else {
			output = `${sourceClass}: ${sourceMethod} - ${message}`;
		}
		this.log.push({
			time: new Date(),
			data: output
		});
	}

	async send() {
		await this.http.post('log', { data: this.log });
		this.clear();
	}

	print() {
		if (this.platform.is('cordova')) {
			// tslint:disable-next-line
			console.log(JSON.stringify(this.log, null, 2));
		} else {
			// tslint:disable-next-line
			console.log(this.log);
		}
	}

	clear() {
		this.log = [];
	}
}
