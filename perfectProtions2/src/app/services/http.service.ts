import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { NetworkStatus, Plugins } from '@capacitor/core';
const { Network } = Plugins;

import { BehaviorSubject, of, throwError } from 'rxjs';
import { concatMap, delay, retryWhen } from 'rxjs/operators';

import { Logger } from 'src/app/classes/Logger';
import { LoggerError } from 'src/app/classes/LoggerError';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService implements OnInit {
	static readonly HTTP_NO_CONNECTION = 'No connection found';
	static readonly HTTP_NOT_AUTHORIZED = 'Request not authorized';
	static readonly HTTP_SERVER_ERROR = 'Server Error';

	isConnectionAvailable: BehaviorSubject<boolean> = new BehaviorSubject(false);
	connectedHandler;

	private readonly apiUrl: string = environment.apiUrl;
	private token: string;

	constructor(private http: HttpClient) {
	}

	async ngOnInit() {
		this.connectedHandler = Network.addListener('networkStatusChange', (status: NetworkStatus) => {
			this.isConnectionAvailable.next(status.connected);
		});
		await Network.getStatus();
	}

	setToken(token: string) {
		this.token = token;
		Logger.add('HttpService', 'setToken', 'Token set');
	}

	clearToken() {
		this.token = null;
	}

	getToken(): string {
		if (!this.token) {
			throw new LoggerError('HttpService', 'getToken', 'No token available');
		}
		return this.token;
	}

	makeApiEndpoint(endpoint) {
		if (!endpoint) {
			throw new LoggerError('HttpService', 'makeApiEndpoint', 'Missing API endpoint');
		}
		return `${this.apiUrl}${endpoint}`;
	}

	get(endpoint: string, body?, needsAuth?) {
		return this.request('get', endpoint, body, needsAuth);
	}

	delete(endpoint: string, body?, needsAuth?) {
		return this.request('delete', endpoint, body, needsAuth);
	}

	post(endpoint: string, body?: any, needsAuth?) {
		return this.request('post', endpoint, body, needsAuth);
	}

	put(endpoint: string, body?: any, needsAuth?) {
		return this.request('put', endpoint, body, needsAuth);
	}

	private async request(
		requestType: string,
		endpoint: string,
		body?: any,
		needsAuth: boolean = true) {

		if (!this.isConnectionAvailable) {
			throw new LoggerError('HttpService', 'request', HttpService.HTTP_NO_CONNECTION, null, endpoint);
		}

		let httpOptions = {};
		if (needsAuth) {
			httpOptions =  {
				headers: new HttpHeaders({
					Authorization: `Bearer ${this.getToken()}`
				})
			};
		}

		const requestParams = [];
		if (['post', 'put', 'patch'].includes(requestType)) {
			requestParams.push(body);
		}
		requestParams.push(httpOptions);

		try {
			const res = await this.makeRequest(requestType, endpoint, requestParams);
			return res;
		} catch (err) {
			if (err.status === 0) {
				throw new LoggerError('HttpService', 'request', HttpService.HTTP_NO_CONNECTION, err, endpoint);
			} else if (err.status === 401) {
				throw new LoggerError('HttpService', 'request', HttpService.HTTP_NOT_AUTHORIZED, err, endpoint);
			} else if (err.status >= 400 && err.status < 500) {
				throw new LoggerError('HttpService', 'request', err.error.error, err, endpoint);
			} else if (err.status >= 500) {
				throw new LoggerError('HttpService', 'request', HttpService.HTTP_SERVER_ERROR, err, endpoint);
			} else {
				throw new LoggerError('HttpService', 'request', 'Unknown http error', err, endpoint);
			}
		}
	}

	private makeRequest(requestType: string, endpoint: string, requestParams: any[]) {
		return this.http[requestType](this.makeApiEndpoint(endpoint), ...requestParams).pipe(
			retryWhen(
				(errors) => {
					return errors.pipe(
						concatMap((error, retries) => {
							Logger.add('HttpService', 'makeRequest', 'request error', error, {retries});
							if ((error.status >= 500 || error.status === 0) && retries < 2) {
								return of(error).pipe(delay((retries + 1) * 750));
							}

							return throwError(error);
						})
					);
				}
			)
		).toPromise();
	}
}
