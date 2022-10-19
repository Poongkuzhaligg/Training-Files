export const MOCK_USER_ACCOUNT: UserAccount = {
	id: 'test-id',
	firstName: 'Testy',
	lastName: 'McTesterson',
	email: 'testy.the.testman@greatergoods.com',
	zipcode: '63111',
	token: 'random-string',
	scale: '0451'
};

export const MOCK_ACCOUNT_SIGNUP: AccountSignup = {
	firstName: 'Testy',
	lastName: 'McTesterson',
	email: 'testy.the.testman@greatergoods.com',
	zipcode: '63111',
	willReceiveEmails: true,
	password: 'password',
	scale: '0451'
};

export const MOCK_USER_UPDATED: UserAccount = {
	id: 'test-id',
	firstName: 'Testy',
	lastName: 'McTesterson',
	email: 'mr.testman@greatergoods.com',
	zipcode: '63111',
	token: 'random-string2',
	scale: '0451'
};

export class MockAccountService {
	static readonly DATA_USER_NOT_FOUND = 'No user found in storage';
	static readonly DATA_INVALID_USER = 'User is invalid';
	static readonly ACCOUNT_KEYS = ['id', 'firstName', 'lastName', 'email', 'zipcode', 'token'];

	getAccount() {
	}

	setAccount(account) {
	}

	clearAccount() {
	}

	setToken(token) {
	}

	async checkForLoggedInUser() {
	}

	async logIn(email, password) {
	}

	async logOut() {
	}

	async createAccount(account) {
	}

	async updateAccount(account) {
	}
}
