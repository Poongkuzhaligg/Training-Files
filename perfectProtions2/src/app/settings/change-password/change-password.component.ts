import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

import { AccountService } from 'src/app/services/account.service';

import { Logger } from 'src/app/classes/Logger';
import { changePasswordMatchValidator, matchValues } from 'src/app/validators/confirm-password';

@Component({
	selector: 'change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
	hidePassword: boolean = true;

	changePasswordForm: FormGroup = this.fb.group({
		oldPassword: ['', [Validators.required, Validators.minLength(6)]],
		newPassword: ['', [Validators.required, Validators.minLength(6)]],
		confirmPassword: ['', [Validators.required, matchValues('newPassword'), Validators.minLength(6)]]
	}, { validator: [changePasswordMatchValidator] });

	constructor(
		private account: AccountService,
		private loading: LoadingController,
		private modal: ModalController,
		private fb: FormBuilder,
		private toast: ToastController
	) { }

	get oldPassword() {
		return this.changePasswordForm.get('oldPassword');
	}

	get newPassword() {
		return this.changePasswordForm.get('newPassword');
	}

	get confirmPassword() {
		return this.changePasswordForm.get('confirmPassword');
	}

	ngOnInit() {
		this.changePasswordForm.controls.newPassword.valueChanges.subscribe(() => {
			this.changePasswordForm.controls.confirmPassword.updateValueAndValidity();
		});
	}

	async changePassword(): Promise<void> {
		const loader = await this.showLoader('Updating your password');
		try {
			await this.account.updatePassword(this.oldPassword.value, this.newPassword.value);
			await this.showToast('Success!', 'Your account info was successfully updated.');
			this.changePasswordForm.reset();
		} catch (err) {
			Logger.add('ChangePasswordComponent', 'changePassword', 'Error changing password', err);
			this.showToast(
				'Unable to password!',
				'Something went wrong. Please check your password and try again. '
				+ 'If this problem continues, please contact customer service.'
			);
		} finally {
			loader.dismiss();
		}
	}

	dismiss() {
		this.modal.dismiss();
	}

	toggleHidePassword() {
		this.hidePassword = !this.hidePassword;
	}

	private async showLoader(message: string): Promise<any>  {
		const loader = await this.loading.create({
			message,
			spinner: 'dots'
		});

		loader.present();
		return loader;
	}

	private async showToast(header: string, message: string) {
		const toast = await this.toast.create({
			header,
			message,
			position: 'top',
			duration: 3000
		});
		toast.present();
	}
}
