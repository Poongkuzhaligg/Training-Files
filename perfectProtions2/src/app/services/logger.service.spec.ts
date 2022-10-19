import { TestBed } from '@angular/core/testing';

import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { Logger } from 'src/app/classes/Logger';
import { LoggerError } from 'src/app/classes/LoggerError';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
	let service: LoggerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: HttpService, useClass: MockHttpService },
			]
		});
		service = TestBed.inject(LoggerService);
		service.clear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should add a log', () => {
		service.add('class1', 'method', 'message');
		expect(service.logArray.length).toEqual(1);
	});

	it('should add a log via the Logger class', () => {
		Logger.add('class2', 'method', 'message');
		expect(service.logArray.length).toEqual(1);
	});

	it('should add a log via the LoggerError', () => {
		// tslint:disable-next-line
		new LoggerError('class3', 'method', 'message');
		expect(service.logArray.length).toEqual(1);
	});
});
