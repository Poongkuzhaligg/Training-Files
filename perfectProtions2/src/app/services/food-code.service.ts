import { Injectable } from '@angular/core';

import { FavoritesService } from 'src/app/services/favorites.service';

import FoodCategoryObj from 'src/assets/data/categories.json';
import FoodCodeArr from 'src/assets/data/items.json';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FoodCodeService {
	foodCategories: BehaviorSubject<FoodCategories> = new BehaviorSubject(FoodCategoryObj);
	favorites: string[] = [];
	search: string;
	totalCodes: number = 0;
	private unSubscribe = new Subject();

	constructor(private favoritesService: FavoritesService) {
	}

	async initializeService() {
		await this.favoritesService.initializeService();
		this.favoritesService.favorites.pipe(takeUntil(this.unSubscribe)).subscribe((favorites: string[]) => {
			this.favorites = favorites;
			this.updateFilter(this.search);
		});
	}

	ngOnDestroy() {
		this.unSubscribe.next();
		this.unSubscribe.complete();
	}

	updateFilter(filterString: string) {
		this.search = filterString;
		const normalizedFilter: string = this.normalizeString(filterString);
		const filterArray: string[] = this.getFilterArray(normalizedFilter);

		if (filterArray && filterArray.length) {
			const codes: FoodCode[] = FoodCodeArr.filter((code: FoodCode) => {
				return filterArray.every((term) => {
					return code.searchString.includes(term);
				})
			});

			this.foodCategories.next(this.generateCategories(codes));
		} else {
			this.foodCategories.next(this.generateCategories(FoodCodeArr));
		}
	}

	clearFilter() {
		this.updateFilter(null);
	}

	getFilterArray(str: string): string[] {
		if (str === null || str === '') {
			return null;
		}

		return str.split(' ');
	}

	normalizeString(str: string): string {
		if (str === null || str === undefined || str.trim() === '') {
			return null;
		}

		return str
			.trim()
			.replace(/[^0-9a-zA-Z\ ]/g, '')
			.replace(/\ {2,}/g, ' ')
			.toLowerCase();
	}

	generateCategories(codeArr: FoodCode[]): FoodCategories {
		const categoryObj: FoodCategories = {};
		codeArr.forEach((code: FoodCode) => {
			if (!categoryObj.hasOwnProperty(code.category)) {
				categoryObj[code.category] = [];
			}

			categoryObj[code.category].push({ ...code, favorite: this.favorites.includes(code.code) });
		});

		this.totalCodes = codeArr.length;
		return categoryObj;
	}
}
