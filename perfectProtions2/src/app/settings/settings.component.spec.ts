import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
	let component: SettingsComponent;
	let fixture: ComponentFixture<SettingsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SettingsComponent ],
			imports: [ ReactiveFormsModule, RouterTestingModule, IonicModule.forRoot()],
			providers: [
				{ provide: HttpService, useClass: MockHttpService },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
