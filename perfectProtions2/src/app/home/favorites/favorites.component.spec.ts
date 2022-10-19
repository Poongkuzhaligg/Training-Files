import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
	let component: FavoritesComponent;
	let fixture: ComponentFixture<FavoritesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FavoritesComponent ],
			imports: [IonicModule.forRoot()],
			providers: [
				{ provide: HttpService, useClass: MockHttpService },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(FavoritesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
