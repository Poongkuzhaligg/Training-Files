import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from '../account/account.module';
import { FavoritesComponent } from './favorites/favorites.component';
import { HelpComponent } from './help/help.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'favorite',
    component: FavoritesComponent
  },
  {
    path: 'account',
    component: AccountModule,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
