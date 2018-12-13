import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

//MQTT
import { Paho } from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  client: any;
  message: any;
  phoneLat: any;
  phoneLng: any;

  duidInput: String = 'aTopic'; // initialize in case user has it null
  alertStatus: String
  recievedStatus: String

  constructor(private storage: Storage,
    private toastCtrl: ToastController,
    public geolocation: Geolocation) {
  }

  public saveDUID() {
    // set a key/value
    this.storage.set('watchDUID', this.duidInput).then(data => {
      // Or to get a key/value pair
      this.storage.get('watchDUID').then((val) => {
        console.log('watch DUID is: ', val);
        this.presentToast(val);
        this.getLocation();
      }, err => {
        console.log(err)
      })
    }, err => {
      console.log(err);
    }) //check this later
  }

  presentToast(duid) {
    let toast = this.toastCtrl.create({
      message: 'Saved DUID: ' + duid,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    //this.getLocation();
    //this.connectToMqtt();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      let lat = res.coords.latitude ;
      let lng = res.coords.longitude;
      console.log(location);
      let toast = this.toastCtrl.create({
        message: lat + '-'+ lng,
        duration: 3000
      });
      toast.present();

      this.phoneLat = lat;
      this.phoneLng = lng;
      this.saveDUID;
      this.connectToMqtt(); // connect to mqtt after getting location


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //MQTT functions
  connectToMqtt() {
    this.client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "someClientID");

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived.bind(this);

    // connect the client
    this.client.connect({ onSuccess: this.onConnect.bind(this) });
  }

  // called when the client connects
  onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    this.client.subscribe("S2watch/" + this.duidInput + "/alert_status", { qos: 1 });

  }

  // called when the client loses its connection
  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  onMessageArrived(message) {

    //this.saveDUID(); // update the topic based on user input
    console.log("messageRecieved: " + message.payloadString);

    if (message.payloadString == 'confirmed') {
      console.log("topic now is: " + this.duidInput);
      console.log('lat: ' + this.phoneLat);

      let msg ={
        alertStatus: message.payloadString,
        alertID:  this.duidInput,
        time: Date.now().toString() ,
        location: {
          lat:this.phoneLat ,
          lng: this.phoneLng
        }
      }

      this.message = new Paho.MQTT.Message(JSON.stringify(msg));
      this.message.destinationName = "S2watch/" + this.duidInput; // topic to publish to
      this.client.send(this.message);
      console.log('published: ' + JSON.stringify(msg));

    }
  }
}


