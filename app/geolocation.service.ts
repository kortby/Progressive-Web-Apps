import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable()
export class GeolocationService {

  constructor() { }

  requestLocation(callback) {
    // w3c geolocation API
    navigator.geolocation.getCurrentPosition(
      position => {
        callback(position.coords);
      },
      error => {
        callback(null);
      }
    );
  }

  getMapLink(location: PlaceLocation) {
    // Universal link
    let query = "";
    if(location.latitude) {
      query = location.latitude + ',' + location.longitude;
    } else {
      query = `${location.address}, ${location.city}`;
    }

    if(/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.apple.com/?q=${query}`;
    }
  }

}
