import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductComponent } from './product/product.component';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { SettingsComponent } from './settings/settings.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { SettingsModule } from './settings/settings.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    SettingsModule,
  ],
  declarations: [
    HomePage,
    FavoritesComponent,
    ProductComponent,
    ProductModalComponent,
    ProductFilterPipe
  ]
})
export class HomePageModule { }
