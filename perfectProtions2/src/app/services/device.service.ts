import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

import { HttpService } from 'src/app/services/http.service';

import { Logger } from 'src/app/classes/Logger';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DeviceService {

	constructor(private http: HttpService) { }

	async updateDeviceInfo(): Promise<void> {
		const info = await Device.getInfo();
		const deviceInfo: DeviceInfo = {
			device: `${info.model} ${info.platform} ${info.osVersion}`,
			appVersion: environment.version,
			timezoneOffset: new Date().getTimezoneOffset()
		};

		// Do not throw an error if this fails.
		try {
			await this.sendDeviceInfo(deviceInfo);
			Logger.add('DeviceService', 'updateDeviceInfo', 'Device info successfully updated', null, { deviceInfo, info });
		} catch (err) {
			Logger.add('DeviceService', 'updateDeviceInfo', 'Error updating device info', err, { deviceInfo, info });
		}
	}

	private sendDeviceInfo(deviceInfo: DeviceInfo): Promise<void> {
		const endpoint = 'account/update';
		return this.http.post(endpoint, deviceInfo);
	}
}
