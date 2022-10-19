import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { FavoritesService } from 'src/app/services/favorites.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
	@Input() favorites: FoodCode[] = [];
	private debounce: boolean = false;

	constructor(
		private modal: ModalController,
		private favoritesService: FavoritesService,
		private toast: ToastController
	) { }

	async ngOnInit() {
			this.favoritesService.favorites.subscribe((favorites: string[]) => {
				this.favorites = this.favorites.map((code) => {
					code.favorite = favorites.includes(code.code);
					return code;
				});
			});
		}

	trackByCode(index: number, code: FoodCode) {
		return code;
	}

	dismiss() {
		this.modal.dismiss();
	}

	async toggleFavorite(favoriteObject: FavoriteStateChange) {

		if (this.debounce) {
			return;
		}
		this.debounce = true;

		if (favoriteObject.isFavorite)  {
			try {
				await this.favoritesService.addFavorite(favoriteObject.code);
			} catch (err) {
				this.handleFavoritesError('Error adding favorite', err.message);
			}
		} else {
			try {
				await this.favoritesService.removeFavorite(favoriteObject.code);
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
}
