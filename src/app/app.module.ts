import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

import {AgmCoreModule} from '@agm/core';
import {HttpModule} from '@angular/http';
import {SensorService} from './services/sensor.service';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCV67vCS7q8idrmbkpf2HXa7fcm9b6wf3o'
    })
  ],
  providers: [SensorService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
