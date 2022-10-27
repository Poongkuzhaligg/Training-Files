import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from '../account/account.module';
import { HelpComponent } from './help/help.component';
// import { HelpComponent } from './help/help.component';
import { HomePage } from './home.page';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
      {
        path: 'product/:code',
        component: ProductsComponent
      },
      {
        path: 'help',
        component: HelpComponent
      },
      {
        path: 'privacy',
        component: PrivacyComponent
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
