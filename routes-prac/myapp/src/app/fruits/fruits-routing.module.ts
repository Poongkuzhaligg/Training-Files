import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FruitsComponent } from "./fruits.component";
import { GrapeComponent } from "./grape/grape.component";
import { LemonComponent } from "./lemon/lemon.component";
import { MangoComponent } from "./mango/mango.component";
import { StrawberryComponent } from "./strawberry/strawberry.component";



const routes: Routes = [
  { path: '',
  component: FruitsComponent,
  children: [
    { path: '/lemon', component:LemonComponent },
    { path: '/grape', component:GrapeComponent },
    { path: '/mango', component:MangoComponent },
    { path: '/strawberry', component:StrawberryComponent },
  ] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FruitsRoutingModule {}
