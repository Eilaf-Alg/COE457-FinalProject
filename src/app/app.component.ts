import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { AndroidPermissions } from '@ionic-native/android-permissions'; // ** to be able to send the location


import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen/*, 
    private androidPermissions: AndroidPermissions*/) {
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // // ** to be able to access device location
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
    // );

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  }
}

