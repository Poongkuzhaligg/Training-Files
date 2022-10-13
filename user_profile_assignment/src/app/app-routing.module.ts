import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home/home.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
//TODO configure routes
//'' - home use auth guard
//users - load children usersmodule - use auth guard
//account - load children accountmodule
//wild card - redirect to empty(home) canActivate: [AuthGuard]

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'users', 
  loadChildren:() => import('./users/users.module').then(m => m.UsersModule),
  canActivate: [AuthGuard]
  },
  { path: 'account',
   loadChildren:() => import('./account/account.module').then(m => m.AccountModule)
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
