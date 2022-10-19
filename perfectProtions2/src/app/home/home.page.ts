import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Logger } from 'src/app/classes/Logger';

import { DataService } from 'src/app/services/data.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { FoodCodeService } from 'src/app/services/food-code.service';
import { HttpService } from 'src/app/services/http.service';

import { FavoritesComponent } from './favorites/favorites.component';
import { MessageModalComponent } from 'src/app/shared/message-modal/message-modal.component';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	foodCategories: FoodCategories;
	searchBar: string;
	isFavorite: boolean;
	favoriteCode: string;
	showCodesOnly: boolean = false;
	private unSubscribe = new Subject();
	private debounce: boolean = false;

	constructor(
		private codes: FoodCodeService,
		private data: DataService,
		private favoritesService: FavoritesService,
		private modal: ModalController,
		private toast: ToastController
	) {}

	async ngOnInit() {
		await this.codes.initializeService();
		this.codes.foodCategories.pipe(takeUntil(this.unSubscribe)).subscribe((foodCategories) => {
			this.foodCategories = foodCategories;
			this.showCodesOnly = this.codes.totalCodes <= 8;
		});

		this.checkForMessageModal();
	}

	ngOnDestroy() {
		this.unSubscribe.next();
		this.unSubscribe.complete();
	}

	captureFavoriteEvent(favoriteObject: FavoriteStateChange) {
		this.isFavorite = favoriteObject['isFavorite'];
		this.favoriteCode = favoriteObject['code'];
		this.toggleFavorite(this.favoriteCode, this.isFavorite);
	}

	async toggleFavorite(code: string, isFavorite: boolean) {

		if (this.debounce) {
			return;
		}
		this.debounce = true;

		if (isFavorite)  {
			try {
				await this.favoritesService.addFavorite(code);
			} catch (err) {
				this.handleFavoritesError('Error adding favorite', err.message);
			}
		} else {
			try {
				await this.favoritesService.removeFavorite(code);
			} catch (err) {
				this.handleFavoritesError('Error removing favorite', err.message);
			}
		}

		setTimeout(() => {
			this.debounce = false;
		}, 400);
	}

	async handleFavoritesError(header: string, errorString: string) {
		const options = {
			header,
			message: 'Something went wrong. Please try again. '
				+ 'If the problem continues, contact customer service.',
			duration: 3000
		};

		if (errorString === HttpService.HTTP_NO_CONNECTION) {
			options.message = 'No connection detected. Please make sure '
					+ 'you have internet access and try again.';
		}

		const toast = await this.toast.create({ ...options, position: 'top' });
		toast.present();
	}

	async openFavoritesModal() {
		const modal = await this.modal.create({
			component: FavoritesComponent,
			swipeToClose: true,
			componentProps: {
				favorites: this.favoritesService.getFavorites()
			}
		});
		return await modal.present();
	}

	async checkForMessageModal() {
		const key = 'foodcodes2welcome';
		const endDate = new Date('2020-11-20T00:00:00.000');
		if (new Date() < endDate) {
			try {
				const hasBeenSeen = await this.data.getData(key);
				if (!hasBeenSeen) {
					await this.data.setData(key, { hasBeenSeen: true });
					this.openWelcomeModal();
				}
			} catch (err) {
				Logger.add('HomePage', 'checkForMessageModal', 'Error checking if "foodcodes2welcome" has been seen', err);
			}
		}
	}

	async openWelcomeModal() {
		const modal = await this.modal.create({
			component: MessageModalComponent,
			swipeToClose: true,
			cssClass: 'message-modal',
			componentProps: {
				title: 'Welcome to the Food Codes App!',
				content: 'The team from Greater Goods decided it was time to refresh the app formerly known as '
					+ 'Perfect Portions. That means a ground up rebuild, a few improvements, and updated branding '
					+ 'with a new name and icon. We even added support for dark mode to make it easier to '
					+ 'portion those late night snacks. Enjoy the newer and faster Food Codes 2.0.'
			}
		});
		return await modal.present();
	}

	trackByCategory(index: number, keyvalue) {
		return keyvalue.key;
	}

	updateSearch() {
		this.codes.updateFilter(this.searchBar);
	}

	sortCategories(a, b) {
		// Disable default sort to match original app
		return 0;
	}
}
