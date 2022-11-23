import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpModalComponent } from '../shared/help-modal/help-modal.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landingPage',
    pathMatch: 'full'
  },
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'contact', component: HelpModalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
