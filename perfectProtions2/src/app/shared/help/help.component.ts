import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BrowserOpenOptions, Plugins } from '@capacitor/core';
import { LoadingController, NavParams, ToastController } from '@ionic/angular';
const { Browser } = Plugins;

import { AccountService } from 'src/app/services/account.service';
import { LoggerService } from 'src/app/services/logger.service';

import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-help',
	templateUrl: './help.component.html',
	styleUrls: ['./help.component.scss'],
})
export class HelpComponent {
	@Input() scale: string;
	logCount: number = 0;
	version: string = environment.version;
	isLoggedIn: boolean = false;
	private readonly aboutLink: string = 'https://greatergoods.com/community';
	private scaleLink: string = 'https://greatergoods.com/0450';
	private readonly options: BrowserOpenOptions = {
		toolbarColor: '#65BB6A',
		url: null,
		windowName: 'Greater Goods'
	};

	constructor(
		private account: AccountService,
		private alert: AlertController,
		private loading: LoadingController,
		private logger: LoggerService,
		private modal: ModalController,
		private navParams: NavParams,
		private toast: ToastController
		) {
		if (this.account.getAccount()) {
			this.isLoggedIn = true;
		}
	}

	async ionViewWillEnter() {
		if (this.scale) {
			this.scaleLink = `https://greatergoods.com/${this.scale}`;
		}

		this.prefetchLinks();
	}

	async prefetchLinks() {
		await Browser.prefetch({urls: [this.aboutLink, this.scaleLink]});
	}

	async openAboutLink() {
		await Browser.open({ ...this.options, url: this.aboutLink });
	}

	async openScaleLink() {
		await Browser.open({ ...this.options, url: this.scaleLink });
	}

	incrementLog() {
		if (!this.isLoggedIn) {
			return;
		}
		this.logCount++;
		switch(this.logCount) {
			case 1:
				setTimeout(() => {
					this.logCount = 0;
				}, 15000)
				break;
			case 3:
			case 4:
				this.showToast(`Tap ${this.logCount}`, 'Tap 5 times to send a log', 1000);
				break;
			case 5:
				this.askToSendLog();
				break;
		}
	}

	async askToSendLog(): Promise<void> {
		const alert = await this.alert.create({
			header: 'Send Log?',
			subHeader: 'Tapping SEND will send a log of your activity in the '
				+ 'app since it was last opened. This is used to help troubleshoot'
				+ 'issues you may be having.',
			buttons: [
				{
					text: 'CANCEL'
				},
				{
					text: 'SEND',
					role: 'cancel',
					handler: () => {
						this.sendLog();
					}
				}
			]
		});
		alert.present();
	}

	async sendLog(): Promise<void> {
		const loader = await this.showLoader('Sending log');

		try {
			await this.logger.send();
			this.showToast(
				'Log sent!',
				`Don't forget to follow up with customer service.`
			);
		} catch (err) {
			this.showToast(
				'Unable to send a Log',
				'Something went wrong. Try again or contact customer service.'
			);
		} finally {
			loader.dismiss();
		}
	}

	dismiss() {
		this.modal.dismiss();
	}

	private async showLoader(message: string): Promise<any>  {
		const loader = await this.loading.create({
			message,
			spinner: 'dots'
		});

		loader.present();
		return loader;
	}

	private async showToast(header: string, message: string, duration: number = 3000) {
		const toast = await this.toast.create({
			header,
			message,
			position: 'bottom',
			duration: 3000
		});
		toast.present();
	}
}
