import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HelpComponent } from './help/help.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FavoritesComponent } from './favorites/favorites.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    HomePage,
    HelpComponent,
    FavoritesComponent
]
})
export class HomePageModule {}
