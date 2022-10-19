import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { LoggerError } from 'src/app/classes/LoggerError';

describe('HttpService', () => {
	let service: HttpService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ]
		});
		service = TestBed.inject(HttpService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set and return token', () => {
		service.setToken('test_token');
		const token = service.getToken();
		expect(token).toEqual('test_token');
	});

	it('getToken should throw an error if no token set', () => {
		service.clearToken();
		expect(() => {
			service.getToken();
		}).toThrow(new LoggerError('HttpService', 'getToken', 'No token available'));
	});

	it('should make an endpoint', () => {
		const endpoint = service.makeApiEndpoint('test');
		expect(endpoint).toEqual('https://api.perfectportions.greatergoods.com/v1/test');
	});
});
