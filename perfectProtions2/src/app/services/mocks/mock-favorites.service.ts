import { BehaviorSubject } from 'rxjs';

export const MOCK_FAVORITES = ['1110', '1111', '1112', '1113'];

export class MockFavoritesService {
	static readonly DATA_FAVORITES_NOT_FOUND = 'No favorites found in storage';
	favorites: BehaviorSubject<string[]> = new BehaviorSubject([]);
	private readonly serviceEndpoint = 'favorite';
	private readonly favoritesKey = 'favorites';

	async initializeService() {
		this.favorites.next(MOCK_FAVORITES);
	}

	async updateFavorites() {
	}

	async addFavorite(code: string) {
		const newFavorites = this.favorites.value;
		newFavorites.push(code);
		this.favorites.next(newFavorites);
	}

	async removeFavorite(code: string) {
		const newFavorites = this.favorites.value.filter((fav) => {
			return fav !== code;
		});
		this.favorites.next(newFavorites);
	}

	async clearFavorites() {
		this.favorites.next([]);
	}
}
