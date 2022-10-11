import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: '', redirectTo: '/fruits', pathMatch: 'full' },
  {
    path: 'fruits',
    loadChildren:() => import('./fruits/fruits.module').then(m => m.FruitsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
