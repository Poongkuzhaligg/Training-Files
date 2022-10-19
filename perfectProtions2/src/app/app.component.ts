import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Capacitor, Plugins, StatusBarStyle } from '@capacitor/core';

const { SplashScreen, StatusBar } = Plugins;

import { AccountService } from 'src/app/services/account.service';
import { LoggerService } from 'src/app/services/logger.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	private readonly loggedInRoute = '/home';
	private readonly loggedOutRoute = '/landing';
	private readonly statusBarColorOptions = {
		color: '#65BB6A'
	};
	private readonly statusBarStyleOptions = {
		style: StatusBarStyle.Dark
	};

	constructor(
		private account: AccountService,
		private logger: LoggerService,
		private platform: Platform,
		private router: Router
	) {
		this.initializeApp();
	}

	async initializeApp() {
		try {
			await this.platform.ready();
			this.logger.add('AppComponent', 'initializeApp', 'platform.ready fired');
			if (Capacitor.isPluginAvailable('StatusBar')) {
				StatusBar.setBackgroundColor(this.statusBarColorOptions);
				StatusBar.setStyle(this.statusBarStyleOptions);
			}
			const route = await this.userCheck();
			await this.router.navigateByUrl(route);
		} catch (err) {
			this.logger.add('AppComponent', 'initializeApp', 'Startup error', err);
			await this.router.navigateByUrl(this.loggedOutRoute);
		} finally {
			setTimeout(() => {
				SplashScreen.hide();
			}, 750);
		}
	}

	async userCheck(): Promise<string> {
		try {
			await this.account.checkForLoggedInUser();
			return this.loggedInRoute;
		} catch (err) {
			if (err.message === HttpService.HTTP_NO_CONNECTION
				&& this.account.getAccount()) {
				return this.loggedInRoute;
			}
		}

		if (this.account.getAccount()) {
			try {
				this.account.logOut();
			} catch (err) {
				this.logger.add('AppComponent', 'userCheck', 'Error logging user out', err);
			}
		}

		return this.loggedOutRoute;
	}
}
