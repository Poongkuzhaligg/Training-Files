import { TestBed } from '@angular/core/testing';

import { DataService } from 'src/app/services/data.service';
import { MockDataService } from 'src/app/services/mocks/mock-data.service';
import { DeviceService } from 'src/app/services/device.service';
import { MockDeviceService } from 'src/app/services/mocks/mock-device.service';
import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { LoggerError } from 'src/app/classes/LoggerError';

import { AccountService } from './account.service';
import { MOCK_ACCOUNT_SIGNUP, MOCK_USER_ACCOUNT, MOCK_USER_UPDATED } from './mocks/mock-account.service';

describe('AccountService', () => {
	let service: AccountService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: DataService, useClass: MockDataService },
				{ provide: DeviceService, useClass: MockDeviceService },
				{ provide: HttpService, useClass: MockHttpService },
			]
		});
		service = TestBed.inject(AccountService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should set an account', () => {
		service.setAccount(MOCK_USER_ACCOUNT);
		const account = service.getAccount();
		expect(account.email).toEqual(MOCK_USER_ACCOUNT.email);
	});

	it('should set the token in the Http Service when the account is set', () => {
		const httpService = TestBed.get(HttpService);
		service.setAccount(MOCK_USER_ACCOUNT);
		const token = httpService.getToken();
		expect(token).toEqual(MOCK_USER_ACCOUNT.token);
	});

	it('should clear the active account', () => {
		service.setAccount(MOCK_USER_ACCOUNT);
		service.clearAccount();
		const account = service.getAccount();
		expect(account).toBeNull();
	});

	it('should clear the token in the Http service when the account is cleared', () => {
		const httpService = TestBed.get(HttpService);
		service.setAccount(MOCK_USER_ACCOUNT);
		service.clearAccount();
		expect(() => {
			httpService.getToken();
		}).toThrow(new LoggerError('HttpService', 'getToken', 'No token available'));
	});

	it('should check for a logged in user, and set one', async () => {
		const dataService = TestBed.get(DataService);
		spyOn(dataService, 'getData').and.resolveTo(MOCK_USER_ACCOUNT);
		spyOn(service, 'getApiAccount').and.resolveTo(MOCK_USER_ACCOUNT);
		await service.checkForLoggedInUser();
		const account = service.getAccount();
		expect(account.email).toEqual(MOCK_USER_ACCOUNT.email);
	});

	it('should check for a logged in user, but none exists', async () => {
		const dataService = TestBed.get(DataService);
		spyOn(dataService, 'getData').and.returnValue(null);

		try {
			await service.checkForLoggedInUser();
		} catch(err) {
			expect(err.message).toEqual(AccountService.DATA_USER_NOT_FOUND);
		}
	});

	it('should log in', async () => {
		const httpService = TestBed.get(HttpService);
		spyOn(httpService, 'post').and.resolveTo(MOCK_USER_ACCOUNT);
		await service.logIn('test@test.test', 'testing');
		const account = service.getAccount();
		expect(account.email).toEqual(MOCK_USER_ACCOUNT.email);
	});

	it('should log out', async () => {
		service.setAccount(MOCK_USER_ACCOUNT);
		await service.logOut();
		const account = service.getAccount();
		expect(account).toBeNull();
	});

	it('should create an account', async () => {
		const httpService = TestBed.get(HttpService);
		spyOn(httpService, 'post').and.resolveTo(MOCK_USER_ACCOUNT);
		await service.createAccount(MOCK_ACCOUNT_SIGNUP);
		const account = service.getAccount();
		expect(account.email).toEqual(MOCK_USER_ACCOUNT.email);
	});

	it('should update the account', async () => {
		service.setAccount(MOCK_USER_ACCOUNT);
		const httpService = TestBed.get(HttpService);
		spyOn(httpService, 'put').and.resolveTo(MOCK_USER_UPDATED);
		await service.updateAccount(MOCK_USER_UPDATED);
		const account = service.getAccount();
		expect(account.email).toEqual(MOCK_USER_UPDATED.email);
	});
});
