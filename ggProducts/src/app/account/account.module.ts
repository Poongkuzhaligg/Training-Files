import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        IonicModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }
