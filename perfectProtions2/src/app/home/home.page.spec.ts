import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoritesService } from 'src/app/services/favorites.service';
import { MockFavoritesService } from 'src/app/services/mocks/mock-favorites.service';

import { HomePage } from './home.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePage', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HomePage ],
			imports: [ RouterTestingModule, IonicModule.forRoot()],
			providers: [
				{ provide: FavoritesService, useClass: MockFavoritesService }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
