import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountService } from 'src/app/services/account.service';
import { MockAccountService } from 'src/app/services/mocks/mock-account.service';
import { HttpService } from 'src/app/services/http.service';
import { MockHttpService } from 'src/app/services/mocks/mock-http.service';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
	let component: ChangePasswordComponent;
	let fixture: ComponentFixture<ChangePasswordComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ChangePasswordComponent ],
			imports: [ ReactiveFormsModule, RouterTestingModule, IonicModule.forRoot()],
			providers: [
				{ provide: AccountService, useClass: MockAccountService },
				{ provide: HttpService, useClass: MockHttpService }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(ChangePasswordComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
