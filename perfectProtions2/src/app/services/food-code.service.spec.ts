import { TestBed } from '@angular/core/testing';

import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { MockFavoritesService, MOCK_FAVORITES } from 'src/app/services/mocks/mock-favorites.service';

import { FoodCodeService } from './food-code.service';

describe('FoodCodeService', () => {
	let service: FoodCodeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: HttpService, useClass: MockHttpService },
				{ provide: FavoritesService, useClass: MockFavoritesService }
			]
		});
		service = TestBed.inject(FoodCodeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize the service', async () => {
		spyOn(service, 'generateCategories');
		await service.initializeService();
		expect(service.favorites[3]).toEqual(MOCK_FAVORITES[3]);
		expect(service.search).toBeUndefined();
		expect(service.generateCategories).toHaveBeenCalled();
	});

	it('should update foodCategories when a search is made', async () => {
		await service.initializeService();
		service.updateFilter('0693');
		const foodCategories: FoodCategories = service.foodCategories.value;
		expect(foodCategories).toEqual(
			jasmine.objectContaining({
				'Fruits, raw': [
					{
						category: 'Fruits, raw',
						code: '0693',
						favorite: false,
						name: 'Apples, raw, with skin',
						searchString: '0693 apples raw with skin fruits raw'
					}
				]
		}));
		expect(foodCategories).not.toEqual(
			jasmine.objectContaining({
				'Fruits, raw': [
					{
						category: 'Fruits, raw',
						code: '0311',
						favorite: false,
						name: 'Apples, raw, w/o skin',
						searchString: '0311 apples raw wo skin fruits raw'
					}
				]
		}));
	});

	it('should clear the search', async () => {
		await service.initializeService();
		service.updateFilter('0693');
		service.clearFilter();
		const foodCategories: FoodCategories = service.foodCategories.value;
		const code0693 = foodCategories['Fruits, raw'].find((code) => {
			return code.code === '0693'
		});
		const code0311 = foodCategories['Fruits, raw'].find((code) => {
			return code.code === '0311'
		});
		expect(code0693).toEqual(
			jasmine.objectContaining({
				category: 'Fruits, raw',
				code: '0693',
				favorite: false,
				name: 'Apples, raw, with skin',
				searchString: '0693 apples raw with skin fruits raw'
			}));
		expect(code0311).toEqual(
			jasmine.objectContaining({
				category: 'Fruits, raw',
				code: '0311',
				favorite: false,
				name: 'Apples, raw, w/o skin',
				searchString: '0311 apples raw wo skin fruits raw'
			}));
	});

	it('should return a normalized string', () => {
		const normalizedString = service.normalizeString(' food-code t#$+    4  ');
		expect(normalizedString).toEqual('foodcode t 4')
	});

	it('should return null if string to be normalized is empty', () => {
		const normalizedString = service.normalizeString('');
		expect(normalizedString).toBeNull();
	});

	it('should return an array of filter terms', () => {
		const filterArray = service.getFilterArray('one two three four');
		expect(filterArray).toEqual(['one', 'two', 'three', 'four']);
	});
});
