import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HelpComponent } from './help/help.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProductComponent } from './product/product.component';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    HomePage,
    HelpComponent,
    FavoritesComponent,
    EditProfileComponent,
    ProductComponent,
    ProductFilterPipe
  ]
})
export class HomePageModule { }
