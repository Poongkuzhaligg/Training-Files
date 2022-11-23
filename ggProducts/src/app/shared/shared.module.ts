import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { HelpContentComponent } from './help-content/help-content.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule
  ],
  declarations: [
    HelpModalComponent,
    ViewProductComponent,
    HelpContentComponent
  ],
  exports: [
    HelpModalComponent,
    ViewProductComponent,
    HelpContentComponent
  ]
})
export class SharedModule { }
