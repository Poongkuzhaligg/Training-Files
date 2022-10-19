import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
	let component: LandingComponent;
	let fixture: ComponentFixture<LandingComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LandingComponent ],
			imports: [ RouterTestingModule, IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(LandingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
