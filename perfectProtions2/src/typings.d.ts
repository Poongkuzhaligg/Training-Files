interface AccountInfo {
	firstName: string;
	lastName: string;
	email: string;
	zipcode?: string;
	dob?: string;
	gender?: string;
	willReceiveEmails?: boolean;
	scale?: string;
}

interface UserAccount extends AccountInfo {
	id: string;
	token?: string;
}

interface AccountSignup extends AccountInfo {
	password: string;
}

interface DeviceInfo {
	device: string;
	appVersion: string;
	timezoneOffset: number;
}

interface LoggerSubject {
	sourceClass: string;
	sourceMethod: string;
	message: string;
	error?: Error;
	data?: any;
}

interface FoodCode {
	name: string;
	code: string;
	category: string;
	favorite?: boolean;
	searchString?: string;
	length?: string;
}

interface FoodCategories {
	[key: string]: FoodCode[];
}

interface FavoriteStateChange {
	code: string;
	isFavorite: boolean;
}
