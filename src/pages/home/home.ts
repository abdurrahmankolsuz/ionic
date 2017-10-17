import { Component, ViewChild } from '@angular/core';
import { AutocompletePage } from './autocomplete';

import { NavController, ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement;
  map: any;
  address;
  geo;
  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {
    this.address = {
      place: ''
    };
    this.geo = {
      lat: 39.925533,
      long: 32.866287
    }

  }

  ionViewDidLoad() {
    this.initMap(this.geo.lat, this.geo.long);
  }

  showAddressModal() {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
      this.geoCode(this.address);
    });
    modal.present();
  }


  initMap(lat: any, long: any) {

    let latLng = new google.maps.LatLng(lat, long);
    let mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
  }


  //convert Address string to lat and long
  geoCode(address: any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address.place }, (results, status) => {
      this.geo.lat = results[0].geometry.location.lat();
      this.geo.lang = results[0].geometry.location.lng();
      this.initMap(this.geo.lat, this.geo.long);
    });
  }

}
