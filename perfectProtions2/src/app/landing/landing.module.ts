import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
	{
		path: '',
		component: LandingComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'signup',
		children: [
			{
				path: '',
				component: SignupComponent
			},
		]
	}
];

@NgModule({
	declarations: [
		LandingComponent,
		LoginComponent,
		SignupComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	],
	exports: [],
	providers: [],
})

export class LandingModule {}
