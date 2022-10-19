import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen, StatusBar } = Plugins;

import { AccountService } from 'src/app/services/account.service';
import { LoggerService } from 'src/app/services/logger.service';
import { MockAccountService } from 'src/app/services/mocks/mock-account.service';
import { MockLoggerService } from 'src/app/services/mocks/mock-logger.service';

import { HomePage } from 'src/app/home/home.page';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let platformReadySpy;
	let platformSpy;

	beforeEach(async(() => {
		platformReadySpy = Promise.resolve();
		platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [RouterTestingModule.withRoutes([
				{ path: 'home', component: HomePage}
			])],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: Platform, useValue: platformSpy },
				{ provide: AccountService, useClass: MockAccountService },
				{ provide: LoggerService, useClass: MockLoggerService }
			],
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should initialize the app', async () => {
		const fixture = TestBed.createComponent(AppComponent);
		const component = fixture.debugElement.componentInstance;
		spyOn(component.router, 'navigate').and.returnValue(true);
		expect(platformSpy.ready).toHaveBeenCalled();
		await platformReadySpy;
	});
});
