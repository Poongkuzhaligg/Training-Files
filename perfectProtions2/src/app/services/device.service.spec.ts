import { TestBed } from '@angular/core/testing';

import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { DeviceService } from './device.service';

describe('DeviceService', () => {
	let service: DeviceService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: HttpService, useClass: MockHttpService },
			]
		});
		service = TestBed.inject(DeviceService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
