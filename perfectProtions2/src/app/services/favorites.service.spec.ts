import { TestBed } from '@angular/core/testing';

import { DataService } from 'src/app/services/data.service';
import { MockDataService } from 'src/app/services/mocks/mock-data.service';
import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { FavoritesService } from './favorites.service';

describe('FavoriteService', () => {
	let service: FavoritesService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: DataService, useClass: MockDataService },
				{ provide: HttpService, useClass: MockHttpService }
			]
		});
		service = TestBed.inject(FavoritesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize the service with http', async () => {
		const httpService = TestBed.get(HttpService);
		spyOn(httpService, 'get').and.resolveTo(['1111']);
		await service.initializeService();
		const favorites = service.favorites.value;
		expect(favorites[0]).toEqual('1111');
	});

	it('should initialize the service without http', async () => {
		const httpService = TestBed.get(HttpService);
		const dataService = TestBed.get(DataService);
		spyOn(httpService, 'get').and.throwError('Error');
		spyOn(dataService, 'getData').and.resolveTo(['1112']);
		await service.initializeService();
		const favorites = service.favorites.value;
		expect(favorites[0]).toEqual('1112');
	});

	it('should update favorites', async () => {
		service.favorites.next(['1111']);
		const httpService = TestBed.get(HttpService);
		spyOn(httpService, 'get').and.resolveTo(['1111', '1112']);
		await service.updateFavorites();
		const favorites = service.favorites.value;
		expect(favorites[1]).toEqual('1112');
	});

	it('should add a favorite', async () => {
		service.favorites.next(['1111']);
		const httpService = TestBed.get(HttpService);
		spyOn(httpService, 'get').and.resolveTo(['1111', '1112']);
		await service.addFavorite('1112');
		const favorites = service.favorites.value;
		expect(favorites[1]).toEqual('1112');
		expect(favorites.length).toEqual(2);
	});

	it('should remove a favorite', async () => {
		service.favorites.next(['1111', '1112', '1113']);
		const favoritesTest1 = service.favorites.value;
		expect(favoritesTest1[1]).toEqual('1112');
		expect(favoritesTest1.length).toEqual(3);
		const httpService = TestBed.get(HttpService);
		spyOn(httpService, 'get').and.resolveTo(['1111', '1113']);
		await service.removeFavorite('1112');
		const favoritesTest2 = service.favorites.value;
		expect(favoritesTest2[1]).toEqual('1113');
		expect(favoritesTest2.length).toEqual(2);
	});

	it('should clear favorites', async () => {
		service.favorites.next(['1111', '1112', '1113']);
		const favoritesTest1 = service.favorites.value;
		expect(favoritesTest1.length).toEqual(3);
		await service.clearFavorites();
		const favoritesTest2 = service.favorites.value;
		expect(favoritesTest2.length).toEqual(0);
	});
});
