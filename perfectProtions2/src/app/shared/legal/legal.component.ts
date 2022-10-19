import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BrowserOpenOptions, BrowserPrefetchOptions, Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
	selector: 'app-legal',
	templateUrl: './legal.component.html',
	styleUrls: ['./legal.component.scss'],
})
export class LegalComponent {
	private readonly privacyLink: string = 'https://greatergoods.com/privacy?landing=true';
	private readonly options: BrowserOpenOptions = {
		toolbarColor: '#65BB6A',
		url: this.privacyLink,
		windowName: 'Greater Goods'
	};
	private readonly prefetch: BrowserPrefetchOptions = {
		urls: [this.privacyLink]
	};

	constructor(private modal: ModalController) {
		this.prefetchLink();
	}

	async prefetchLink() {
		await Browser.prefetch(this.prefetch);
	}

	async openPrivacyLink() {
		await Browser.open(this.options);
	}

	dismiss() {
		this.modal.dismiss();
	}
}
