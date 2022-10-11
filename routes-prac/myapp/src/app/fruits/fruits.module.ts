import { NgModule } from '@angular/core';

import { LemonComponent } from './lemon/lemon.component';
import { StrawberryComponent } from './strawberry/strawberry.component';
import { MangoComponent } from './mango/mango.component';
import { GrapeComponent } from './grape/grape.component';
import { RouterModule } from '@angular/router';
import { FruitsRoutingModule } from './fruits-routing.module';

@NgModule({
  declarations: [
    LemonComponent,
    StrawberryComponent,
    MangoComponent,
    GrapeComponent
  ],
  imports:[
    FruitsRoutingModule,
    RouterModule,
  ]
})
export class FruitsModule {

}
