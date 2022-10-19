import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
			imports: [ ReactiveFormsModule, RouterTestingModule, IonicModule.forRoot()],
			providers: [
				{ provide: HttpService, useClass: MockHttpService },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
