import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';
import { Coffee } from './logic/Coffee';
import { Http } from '@angular/http';

@Injectable()
export class DataService {

  public endpoint = 'http://localhost:3000/';

  constructor(private http: Http) { }

  get(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}coffee/${coffeeId}`).subscribe(
      response => {
        callback(response.json());
      }
    );
  }

  getList(callback) {    
    // const list = [
    //   new Coffee("Double Espresso", "Sunny Cafe", new PlaceLocation("123 Market St", "San Francisco")),
    //   new Coffee("Caramel Americano", "Starcoffee", new PlaceLocation("Gran Via 34", "Madrid"))
    // ]; 
    // callback(list);
    this.http.get(`${this.endpoint}coffee`)
      .subscribe(response => {
        console.log(response.json());
        callback(response.json());
      });
  }

  save(coffee, callback) {
    if(coffee._id){
      this.http.put(`${this.endpoint}coffee/${coffee._id}`, coffee).subscribe(
        response => {
          callback(true);
        } 
      );
    } else {
      this.http.post(`${this.endpoint}coffee`, coffee).subscribe(
        response => {
          callback(true);
        } 
      );
    }
  }

}
