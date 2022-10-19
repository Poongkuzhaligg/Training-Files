import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

import { Logger } from 'src/app/classes/Logger';
import { AccountService } from 'src/app/services/account.service';
import { HttpService } from 'src/app/services/http.service';

import { matchValues, passwordMatchValidator} from 'src/app/validators/confirm-password';
import { emailValidator } from 'src/app/validators/email';

@Component({
	selector: 'signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
	currentSlide: number = 0;
	hidePassword: boolean = true;
	scaleModel: string;
	showSignup: boolean = false;

	signupFormName: FormGroup = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required]
	});

	signupFormEmailPassword: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.pattern(emailValidator)] ],
		password: ['', [Validators.required, Validators.minLength(6)]],
		confirmPassword: ['', [Validators.required, matchValues('password'), Validators.minLength(6)]],
		willReceiveEmails: [true]
	}, { validator: [passwordMatchValidator] });

	constructor(
		private account: AccountService,
		private fb: FormBuilder,
		private loading: LoadingController,
		private router: Router,
		private toast: ToastController
	) { }

	get firstName() {
		return this.signupFormName.get('firstName');
	}

	get lastName() {
		return this.signupFormName.get('lastName');
	}

	get password() {
		return this.signupFormEmailPassword.get('password');
	}

	get confirmPassword() {
		return this.signupFormEmailPassword.get('confirmPassword');
	}

	get email() {
		return this.signupFormEmailPassword.get('email');
	}

	get willReceiveEmails() {
		return this.signupFormEmailPassword.get('willReceiveEmails');
	}

	ngOnInit() {
		this.signupFormEmailPassword.controls.password.valueChanges.subscribe(() => {
			this.signupFormEmailPassword.controls.confirmPassword.updateValueAndValidity();
		});
	}

	scaleModelChange(scale) {
		this.scaleModel = scale;
	}

	async signUp() {
		Logger.add('SignupComponent', 'signUp', `Attempting to log in to ${this.email.value}`);
		const loader = await this.showLoader('Signing Up');
		try {
			const newAccount = this.getAccountData();
			await this.account.createAccount(newAccount);
			Logger.add('SignupComponent', 'signUp', `Signed up as ${this.email.value}`);
			this.router.navigateByUrl('/home');
		} catch (err) {
			this.handleSignupError(err);
		} finally {
			loader.dismiss();
		}
	}

	getAccountData(): AccountSignup {
		const newAccount: AccountSignup = {
			...this.signupFormName.value,
			...this.signupFormEmailPassword.value,
			scale: this.scaleModel
		};

		delete newAccount['confirmPassword'];
		return newAccount;
	}

	async handleSignupError(error) {
		const options = {
			header: 'Sign Up Error',
			message: 'Something went wrong. Please try again. '
				+ 'If the problem continues, contact customer service.',
			duration: 3000,
			buttons: null
		};

		switch (error.message) {
			case 'Email already in use':
				options.message = 'Email address already in use.';
				options.buttons = [
					{
						side: 'end',
						text: 'Login',
						handler: () => {
							this.router.navigate(['/landing/login', { email: this.email.value }]);
						}
					}
				];
				break;
			case HttpService.HTTP_NO_CONNECTION:
				options.message = 'No connection detected. Please make sure '
					+ 'you have internet access and try again.';
				break;
			case HttpService.HTTP_SERVER_ERROR:
				options.message = 'Unable to reach the Greater Goods servers. '
					+ 'The issue is probably on our end. Try again later, but '
					+ 'if the problem continues, contact customer service.';
				break;
		}

		const toast = await this.toast.create({ ...options, position: 'top' });
		toast.present();
	}

	async showLoader(message: string) {
		const loader = await this.loading.create({
			message,
			spinner: 'dots'
		});

		loader.present();
		return loader;
	}

	toggleHidePassword() {
		this.hidePassword = !this.hidePassword;
	}

	slideBack() {
		if (this.currentSlide === 0) {
			this.router.navigate(['/landing']);
		} else {
			this.currentSlide = 0;
		}
		this.onSlideChange();
	}

	slideNext() {
		this.currentSlide = 1;
		this.onSlideChange();
	}

	private onSlideChange() {
		if (this.currentSlide === 0) {
			this.showSignup = false;
		} else if (this.currentSlide === 1) {
			this.showSignup = true;
		}
	}
}
