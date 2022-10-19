import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { HelpComponent } from './help.component';

describe('HelpComponent', () => {
	let component: HelpComponent;
	let fixture: ComponentFixture<HelpComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HelpComponent ],
			imports: [IonicModule.forRoot()],
			providers: [
				{ provide: HttpService, useClass: MockHttpService },
				{ provide: NavParams, useValue: { data: { scale: '0000' } } }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(HelpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
