import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BikesComponent } from './bikes/bikes.component';

const routes: Routes = [
  {path: ' ', component: AppComponent},
  {path: 'bikes', component: BikesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
