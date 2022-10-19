import { Injectable } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

import FoodCodeArr from 'src/assets/data/items.json';

import { BehaviorSubject } from 'rxjs';

import { Logger } from 'src/app/classes/Logger';
import { LoggerError } from 'src/app/classes/LoggerError';

interface ReturnedCode {
	code: string;
}

@Injectable({
	providedIn: 'root'
})
export class FavoritesService {
	static readonly DATA_FAVORITES_NOT_FOUND = 'No favorites found in storage';
	favorites: BehaviorSubject<string[]> = new BehaviorSubject([]);
	private readonly serviceEndpoint = 'favorite';
	private readonly favoritesKey = 'favorites';

	constructor(
		private data: DataService,
		private http: HttpService
	) { }

	async initializeService() {
		let favorites: string[] = [];
		try {
			favorites = await this.getApiFavorites();
			this.setStoredFavorites(favorites);
		} catch (err) {
			Logger.add('FavoriteService', 'initializeFavorites', 'Error initializing favorites from api', err);

			try {
				favorites = await this.getStoredFavorites();
			} catch (err) {
				Logger.add('FavoriteService', 'initializeFavorites', 'Error initializing favorites from storage', err);
			}
		}
		this.setFavorites(favorites);
	}

	async updateFavorites() {
		const favorites = await this.getApiFavorites();
		this.setFavorites(favorites);
		this.setStoredFavorites(favorites);
	}

	getFavorites(): FoodCode[] {
		// Use an object instead of array to remove duplicates
		const favoriteCodes = this.favorites.value;
		const codes = {};
		FoodCodeArr.forEach((code: FoodCode) => {
			if (favoriteCodes.includes(code.code)) {
				codes[code.code] = code;
			}
		});

		return Object.values(codes).sort((a: FoodCode , b: FoodCode ) => {
			return a.name > b.name ? 1 : -1;
		}) as FoodCode[];
	}

	async addFavorite(code: string) {
		try {
			await this.setApiFavorite(code);
		} catch (err) {
			throw new LoggerError('FavoriteService', 'addFavorite', 'Error adding favorite', err);
		}
		await this.updateFavorites();
	}

	async removeFavorite(code: string) {
		try {
			await this.deleteApiFavorite(code);
		} catch (err) {
			throw new LoggerError('FavoriteService', 'removeFavorite', 'Error removing favorite', err);
		}
		await this.updateFavorites();
	}

	async clearFavorites() {
		await this.clearStoredFavorites();
		this.favorites.next([]);
	}

	async getStoredFavorites(): Promise<string[]> {
		const data = await this.data.getData(this.favoritesKey);
		if (!data) {
			throw new LoggerError('FavoriteService', 'getStoredFavorites', FavoritesService.DATA_FAVORITES_NOT_FOUND);
		}

		Logger.add('FavoriteService', 'getStoredFavorites', 'Stored favorites found', null, data);
		return data as string[];
	}

	async setStoredFavorites(favorites: string[]): Promise<void> {
		await this.data.setData(this.favoritesKey, favorites);
		Logger.add('FavoriteService', 'getStoredFavorites', 'Stored favorites set');
	}

	async clearStoredFavorites(): Promise<void> {
		await this.data.clearData(this.favoritesKey);
		Logger.add('FavoriteService', 'clearStoredFavorites', 'Stored favorites cleared');
	}

	getApiFavorites(): Promise<string[]> {
		const endpoint = this.serviceEndpoint;
		return this.http.get(endpoint);
	}

	setApiFavorite(code: string): Promise<ReturnedCode> {
		const endpoint = this.serviceEndpoint;
		return this.http.post(endpoint, { code });
	}

	deleteApiFavorite(code: string): Promise<void> {
		const endpoint = `${this.serviceEndpoint}/${code}`;
		return this.http.delete(endpoint);
	}

	private setFavorites(favorites: string[]) {
		this.favorites.next(favorites);
	}
}
