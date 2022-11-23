import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HelpComponent } from './help/help.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings.component';
import { HelpContentComponent } from '../../shared/help-content/help-content.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    SettingsRoutingModule,
    SharedModule
  ],
  declarations: [
    HelpComponent,
    SettingsComponent,
    EditProfileComponent,
    ChangePasswordComponent,
  ]
})
export class SettingsModule { }
