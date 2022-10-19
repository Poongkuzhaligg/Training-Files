import { Injectable } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { DeviceService } from 'src/app/services/device.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { HttpService } from 'src/app/services/http.service';

import { Logger } from 'src/app/classes/Logger';
import { LoggerError } from 'src/app/classes/LoggerError';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	static readonly DATA_USER_NOT_FOUND = 'No user found in storage';
	static readonly DATA_INVALID_USER = 'User is invalid';
	static readonly ACCOUNT_KEYS = ['id', 'firstName', 'lastName', 'email', 'zipcode', 'token'];
	private readonly accountKey = 'account';
	private readonly serviceEndpoint = 'account';
	private account: UserAccount;

	constructor(
		private data: DataService,
		private device: DeviceService,
		private favService: FavoritesService,
		private http: HttpService
	) { }

	getAccount(): UserAccount {
		return this.account;
	}

	setAccount(account: UserAccount) {
		this.account = account;
		this.setToken(account.token);
		Logger.add('AccountService', 'setAccount', `Active account set: ${account.email}`);
	}

	clearAccount() {
		this.http.clearToken();
		this.account = null;
	}

	setToken(token: string) {
		this.http.setToken(token);
	}

	async checkForLoggedInUser() {
		Logger.add('AccountService', 'setAccount', 'Checking for logged in user');
		const storedUser = await this.getStoredAccount();
		this.setAccount(storedUser);
		this.setToken(storedUser.token);
		const retAccount = await this.getApiAccount();
		retAccount.token = storedUser.token;
		await this.setStoredAccount(retAccount);
		this.setAccount(retAccount);
		this.device.updateDeviceInfo();
	}

	async logIn(email: string, password: string): Promise<void> {
		const endpoint = `${this.serviceEndpoint}/login`;
		const retAccount = await this.http.post(endpoint, { email, password }, false);
		await this.setStoredAccount(retAccount);
		this.setAccount(retAccount);
		this.device.updateDeviceInfo();
	}

	async logOut() {
		Logger.add('AccountService', 'logOut', 'Logging out user');
		await this.clearStoredAccount();
		await this.favService.clearFavorites();
		this.clearAccount();
	}

	async createAccount(account: AccountSignup) {
		// Only throw an error on an HTTP error. Allow the user to continue on if there is a data save error.
		const endpoint = `${this.serviceEndpoint}`;
		const retAccount = await this.http.post(endpoint, account, false);
		Logger.add('AccountService', 'createAccount', 'Account successfully created', null, retAccount);
		try {
			await this.setStoredAccount(retAccount);
		} catch (err) {
			Logger.add('AccountService', 'createAccount', 'Error saving new account to storage');
		}

		this.setAccount(retAccount);
		this.device.updateDeviceInfo();
	}

	async updateAccount(account: UserAccount): Promise<void> {
		Logger.add('AccountService', 'updateAccount', `Updating stored account: ${account.email}`);
		const retAccount: UserAccount = await this.editApiAccount(account);
		// The updated account does not contain the token, so it needs to be added before saving.
		retAccount.token = this.getAccount().token;
		await this.setStoredAccount(retAccount);
		this.setAccount(retAccount);
	}

	async updatePassword(oldPassword: string, newPassword: string): Promise<void> {
		Logger.add('AccountService', 'updatePassword', `Updating password`);
		await this.updateApiPassword(oldPassword, newPassword);
	}

	requestPasswordReset(email: string): Promise<UserAccount> {
		const endpoint = `${this.serviceEndpoint}/reset-password/request`;
		return this.http.post(endpoint, { email }, false);
	}

	async deleteAccount(password: string): Promise<void> {
		Logger.add('AccountService', 'updatePassword', `Updating password`);
		const account = this.getAccount();
		await this.deleteApiAccount(account.email, password);
	}

	async getStoredAccount(): Promise<UserAccount> {
		const data = await this.data.getData(this.accountKey);
		if (!data) {
			throw new LoggerError('AccountService', 'getStoredUser', AccountService.DATA_USER_NOT_FOUND);
		}

		AccountService.ACCOUNT_KEYS.forEach((key) => {
			if (!data.hasOwnProperty(key)) {
				throw new LoggerError('DataService', 'getStoredUser', AccountService.DATA_INVALID_USER, null, data);
			}
		});

		Logger.add('AccountService', 'getStoredAccount', 'Stored account found');
		return data as UserAccount;
	}

	async setStoredAccount(account: UserAccount): Promise<void> {
		AccountService.ACCOUNT_KEYS.forEach((key) => {
			if (!account.hasOwnProperty(key)) {
				throw new LoggerError('DataService', 'getStoredUser', AccountService.DATA_INVALID_USER, null, account);
			}
		});

		await this.data.setData(this.accountKey, account);
		Logger.add('AccountService', 'setStoredAccount', 'Stored account set');
	}

	async clearStoredAccount(): Promise<void> {
		await this.data.clearData(this.accountKey);
		Logger.add('AccountService', 'clearStoredAccount', 'Stored account cleared');
	}

	getApiAccount(): Promise<UserAccount> {
		const endpoint = this.serviceEndpoint;
		return this.http.get(endpoint);
	}

	editApiAccount(account: UserAccount): Promise<UserAccount> {
		const endpoint = this.serviceEndpoint;
		return this.http.put(endpoint, account);
	}

	updateApiPassword(oldPassword: string, newPassword: string): Promise<UserAccount> {
		const endpoint = `${this.serviceEndpoint}/password`;
		return this.http.put(endpoint, { oldPassword, newPassword });
	}

	deleteApiAccount(email: string, password: string): Promise<void> {
		const endpoint = `${this.serviceEndpoint}/delete`;
		return this.http.post(endpoint, { email, password });
	}
}
