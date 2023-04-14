import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import routing module
import { AppRoutingModule } from './app.routing.module';

// Import app component
import { AppComponent } from './app.component';

import {
  AppsAppCoreModule,
} from '@app/apps/app/base/api';

import { AppConfigModule } from './config/app.config.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // ---------------------------------
    BrowserModule,
    BrowserAnimationsModule,
    // --------------------------------
    AppRoutingModule,
    // --------------------------------
    AppConfigModule,
    // --------------------------------
    AppsAppCoreModule,
    // --------------------------------
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    Title,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
