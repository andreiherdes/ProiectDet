import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule }   from './core/core.module';
import { SharedModule } from './shared/shared.module';

//import { MatButtonModule } from '@angular/material';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserModule, 
    AppRoutingModule,
    CoreModule,   //Singleton objects
    SharedModule,  //Shared (multi-instance) objects
    //BrowserAnimationsModule,
    //MatButtonModule
  ],
  declarations: [ AppComponent, AppRoutingModule.components ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }