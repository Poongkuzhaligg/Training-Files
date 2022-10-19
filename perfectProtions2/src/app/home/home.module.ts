import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';

import { RouterModule } from '@angular/router';
import { CodeGroupComponent } from './code-group/code-group/code-group.component';
import { CodeComponent } from './code-group/code/code.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HomePageRoutingModule,
		RouterModule
	],
	declarations: [
		HomePage,
		CodeComponent,
		CodeGroupComponent,
		FavoritesComponent
	]
})
export class HomePageModule {}
