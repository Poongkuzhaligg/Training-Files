import { BehaviorSubject} from 'rxjs';

export class MockHttpService {
	isConnectionAvailable: BehaviorSubject<boolean> = new BehaviorSubject(true);
	private token = 'test';

	setToken(token) {
		this.token = token;
	}

	clearToken() {
		this.token = null;
	}

	getToken() {
		if (!this.token) {
			throw new Error('No token available');
		}
		return this.token;
	}

	get(endpoint, body?, needsAuth?) {
		return this.request(needsAuth);
	}

	delete(endpoint, body?, needsAuth?) {
		return this.request(needsAuth);
	}

	post(endpoint, body?, needsAuth?) {
		return this.request(needsAuth);
	}

	put(endpoint, body?, needsAuth?) {
		return this.request(needsAuth);
	}

	private async request(needsAuth) {
		if (needsAuth) {
			this.getToken();
		}
	}
}
