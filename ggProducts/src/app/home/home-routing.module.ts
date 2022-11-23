import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomePage } from './home.page';
import { ProductComponent } from './product/product.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'products',
        component: ProductComponent
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'favorite',
        component: FavoritesComponent
      },
      {
        path: '**', redirectTo: '/home/products',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**', redirectTo: '/home/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
