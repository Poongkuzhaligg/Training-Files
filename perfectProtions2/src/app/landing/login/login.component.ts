import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { Logger } from 'src/app/classes/Logger';
import { AccountService } from 'src/app/services/account.service';
import { HttpService } from 'src/app/services/http.service';

import { emailValidator } from 'src/app/validators/email';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	loginForm: FormGroup = this.fb.group({
		email: ['', [Validators.required, Validators.pattern(emailValidator)]],
		password: ['', [Validators.required, Validators.minLength(6)]],
	});
	private readonly invalidEmailString = 'Invalid Email Address';

	constructor(
		private account: AccountService,
		private alert: AlertController,
		private fb: FormBuilder,
		private loading: LoadingController,
		private route: ActivatedRoute,
		private router: Router,
		private toast: ToastController
	) { }

	get email() {
		return this.loginForm.get('email');
	}

	get password() {
		return this.loginForm.get('password');
	}

	ngOnInit() {
		const email = this.route.snapshot.paramMap.get('email');
		if (email) {
			this.email.setValue(email);
		}
	}

	async login() {
		Logger.add('LoginComponent', 'login', `Attempting to log in to ${this.email.value}`);
		const loader = await this.showLoader('Logging In');
		try {
			await this.account.logIn(this.email.value, this.password.value);
			Logger.add('LoginComponent', 'login', `Logged in to ${this.email.value}`);
			this.router.navigateByUrl('/home');
		} catch (err) {
			this.handleLoginError(err.message);
		} finally {
			loader.dismiss();
		}
	}

	async handleLoginError(errorString: string) {
		const options = {
			header: 'Login Error',
			message: 'Something went wrong. Please try again. '
				+ 'If the problem continues, contact customer service.',
			duration: 3000
		};

		switch (errorString) {
			case HttpService.HTTP_NOT_AUTHORIZED:
				options.message = 'Your email or password is incorrect. '
					+ 'Please try again.';
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

	async showPasswordResetPrompt() {
		const alert = await this.alert.create({
			header: 'Password Reset',
			subHeader: 'Enter your email below.',
			inputs: [
				{
					name: 'email',
					type: 'text',
					placeholder: 'Email',
					value: this.email.value
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Submit',
					handler: (res) => {
						this.requestPasswordReset(res.email);
					}
				}
			]
		});
		alert.present();
	}

	async requestPasswordReset(email: string) {
		if (!email || !emailValidator.test(email)) {
			return this.handlePasswordResetError(this.invalidEmailString);
		}

		const loader = await this.showLoader('Sending email');
		try {
			await this.account.requestPasswordReset(email);
			this.handlePasswordResetSuccess(email);
		} catch (err) {
			this.handlePasswordResetError(err.message);
		} finally {
			loader.dismiss();
		}
	}

	async handlePasswordResetSuccess(email: string) {
		const toast = await this.toast.create({
			position: 'top',
			header: 'Success!',
			message: `An email with a link to reset your password as been sent to `
				+ `${email}. The link will be valid for the next 10 minutes.`,
			duration: 3000
		});
		toast.present();
	}

	async handlePasswordResetError(errorString: string) {
		const options = {
			header: 'Password Reset Error',
			message: 'Something went wrong. Please try again. '
				+ 'If the problem continues, contact customer service.',
			duration: 3000
		};

		switch (errorString) {
			case this.invalidEmailString:
				options.message = 'The email address you provided is invalid. '
					+ 'Please try again.';
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

}
