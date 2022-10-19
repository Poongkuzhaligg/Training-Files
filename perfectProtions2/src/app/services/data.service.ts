import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

import { LoggerError } from 'src/app/classes/LoggerError';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	static readonly DATA_READ_ERROR = 'Error getting data from storage';
	static readonly DATA_WRITE_ERROR = 'Error writing data to storage';

	async getData(key: string): Promise<object> {
		try {
			const valueObj = await Storage.get({ key });

			if (valueObj && valueObj.value) {
				const value = JSON.parse(valueObj.value);
				return value;
			} else {
				return null;
			}
		} catch (err) {
			throw new LoggerError('DataService', 'getData', DataService.DATA_READ_ERROR, err, {key});
		}
	}

	async setData(key: string, data: any): Promise<void> {
		try {
			await Storage.set({
				key,
				value: JSON.stringify(data)
			});
		} catch(err) {
			throw new LoggerError('DataService', 'setData', DataService.DATA_WRITE_ERROR, err, {key, data});
		}
	}

	async clearData(key: string): Promise<void> {
		try {
			await Storage.remove({ key });
		} catch (err) {
			throw new LoggerError('DataService', 'setData', `Error clearing data for key: ${key}`, err);
		}
	}

	async clearAllData() {
		try {
			await Storage.clear();
		} catch (err) {
			throw new LoggerError('DataService', 'setData', 'Error clearing all data', err);
		}
	}
}
