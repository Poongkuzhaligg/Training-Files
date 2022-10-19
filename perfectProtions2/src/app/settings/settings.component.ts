import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';

import { AccountService } from 'src/app/services/account.service';

import { Logger } from 'src/app/classes/Logger';
import { emailValidator } from 'src/app/validators/email';

import { ChangePasswordComponent } from 'src/app/settings/change-password/change-password.component';
import { HelpComponent } from 'src/app/shared/help/help.component';
import { LegalComponent } from 'src/app/shared/legal/legal.component';

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
	changeInfoForm: FormGroup = this.fb.group({
		firstName: ['', Validators.required],
		lastName: ['', Validators.required],
		email: ['', [Validators.required, Validators.pattern(emailValidator)] ],
		scale: ['', Validators.required],
	});
	showScaleSelect: boolean = false;

	constructor(
		private account: AccountService,
		private alert: AlertController,
		private fb: FormBuilder,
		private loading: LoadingController,
		private nav: NavController,
		private modal: ModalController,
		private toast: ToastController
	) { }

	get firstName() {
		return this.changeInfoForm.get('firstName');
	}

	get lastName() {
		return this.changeInfoForm.get('lastName');
	}

	get email() {
		return this.changeInfoForm.get('email');
	}

	get scale() {
		return this.changeInfoForm.get('scale');
	}

	async ionViewWillEnter() {
		const account = this.account.getAccount();
		this.changeInfoForm.controls.firstName.setValue(account.firstName);
		this.changeInfoForm.controls.lastName.setValue(account.lastName);
		this.changeInfoForm.controls.email.setValue(account.email);
		if (account.scale) {
			this.changeInfoForm.controls.scale.setValue(account.scale);
		} else {
			this.showScaleSelect = true;
		}
		this.changeInfoForm.markAsPristine();
		this.changeInfoForm.markAsUntouched();
	}

	scaleModelChange(sku: string) {
		this.changeInfoForm.controls.scale.setValue(sku);
		this.changeInfoForm.markAsTouched();
	}

	async saveUserInfo(): Promise<void> {
		const loader = await this.showLoader('Updating your info');
		try {
			const updatedUserData = this.changeInfoForm.value;
			await this.account.updateAccount(updatedUserData);
			await this.showToast('Success!', 'Your account info was successfully updated.');
			this.changeInfoForm.markAsPristine();
			this.changeInfoForm.markAsUntouched();
		} catch (err) {
			Logger.add('SettingsComponent', 'saveUserInfo', 'Error updating user info', err);
			this.showToast(
				'Unable to update account info!',
				'Something went wrong. If this problem continues, please contact customer service.'
			);
		} finally {
			loader.dismiss();
		}
	}

	async openChangePasswordModal(): Promise<void> {
		await this.openModal(ChangePasswordComponent);
	}

	async openHelpModal(): Promise<void> {
		await this.openModal(HelpComponent, { scale: this.scale.value });
	}

	async openLegalModal(): Promise<void> {
		await this.openModal(LegalComponent);
	}

	attemptToGoBack() {
		if (this.changeInfoForm.touched) {
			this.showEarlyExitModal('Are you sure you want to leave?', 'Leave', this.goBack.bind(this));
		} else {
			this.goBack();
		}
	}

	attemptToLogOut() {
		if (this.changeInfoForm.touched) {
			this.showEarlyExitModal('Are you sure you want to log out?', 'Log Out', this.logOut.bind(this));
		} else {
			this.logOut();
		}
	}

	private goBack() {
		this.nav.navigateBack('/home')
	}

	private async logOut(): Promise<void> {
		const loader = await this.showLoader('Logging you out');
		try {
			await this.account.logOut();
			await this.wait(1000);
			this.nav.navigateRoot('/landing');
		} catch (err) {
			this.showToast(
				'Unable to log out!',
				'Something went wrong. If this problem continues, please contact customer service.'
			);
		} finally {
			loader.dismiss();
		}
	}

	private async showEarlyExitModal(header: string, actionTitle: string, action): Promise<void>  {
		const alert = await this.alert.create({
			header,
			subHeader: 'Your changes have not been saved!',
			buttons: [
				{
					text: actionTitle,
					role: 'cancel',
					handler: () => {
						action();
					}
				},
				{
					text: 'Stay'
				}
			]
		});
		alert.present();
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

	private async openModal(component, params?): Promise<void> {
		const modal = await this.modal.create({ component, componentProps: params });
		await modal.present();
	}

	private async wait(time: number = 0) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, time);
		})
	}
}
