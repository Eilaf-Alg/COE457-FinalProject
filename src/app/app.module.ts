import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from "@ionic/storage"; // ** to be able to store DUID
import { Geolocation } from '@ionic-native/geolocation'; // ** to be able to get location
//import { AndroidPermissions } from '@ionic-native/android-permissions'; // ** to be able to send the location
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    /*,
    HttpModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation, /*
    AndroidPermissions,*/
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
