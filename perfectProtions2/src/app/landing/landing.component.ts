import { Component } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { BrowserOpenOptions, BrowserPrefetchOptions, Plugins } from '@capacitor/core';

const { Browser } = Plugins;

import { HelpComponent } from 'src/app/shared/help/help.component';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
	version: string = environment.version;
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

	async openHelpModal(): Promise<void> {
		const modal = await this.modal.create({ component: HelpComponent });
		await modal.present();
	}

	async openPrivacyLink() {
		await Browser.open(this.options);
	}
}
