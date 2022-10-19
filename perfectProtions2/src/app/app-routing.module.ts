import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { HelpComponent } from './shared/help/help.component';
import { LegalComponent } from './shared/legal/legal.component';
import { MessageModalComponent } from './shared/message-modal/message-modal.component';

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
	},
	{
		path: '',
		redirectTo: 'landing',
		pathMatch: 'full'
	},
	{
		path: 'landing',
		loadChildren: './landing/landing.module#LandingModule'
	},
	{
		path: 'settings',
		component: SettingsComponent
	}
];

@NgModule({
	declarations: [
		SettingsComponent,
		ChangePasswordComponent,
		HelpComponent,
		LegalComponent,
		MessageModalComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
