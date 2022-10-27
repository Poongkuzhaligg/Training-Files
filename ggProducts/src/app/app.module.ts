import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations:
  [
    AppComponent,
  ],
  imports:
  [
    BrowserModule,
    IonicModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AccountModule
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
