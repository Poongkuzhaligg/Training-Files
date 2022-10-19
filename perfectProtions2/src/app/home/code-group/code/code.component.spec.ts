import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodeComponent } from './code.component';

describe('CodeComponent', () => {
	let component: CodeComponent;
	let fixture: ComponentFixture<CodeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CodeComponent ],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(CodeComponent);
		component = fixture.componentInstance;
		component.code = {
			name: 'test',
			code: '1000',
			category: 'cat',
			favorite: true,
			searchString: 'looking for me?'
		};
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
