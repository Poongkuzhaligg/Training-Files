import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ViewProductComponent } from './view-product/view-product.component';
import { HelpComponent } from './help/help.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule
  ],
  declarations: [
    ViewProductComponent,
    HelpComponent
  ],
  exports: [
    ViewProductComponent,
    HelpComponent
  ]
})
export class SharedModule { }
