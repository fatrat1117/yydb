import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Generated class for the SelectCountryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'select-country',
  templateUrl: 'select-country.html'
})
export class SelectCountryComponent {
 countries:any;

  text: string;
selected: any;
countriesInitial:any;
  constructor(private http: Http, public viewCtrl: ViewController) {
  http.get('assets/co.json')
      // Call map on the response observable to get the parsed people object
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(data =>{ 
        this.countries = data.data;
        this.countriesInitial = data.data;
      
      });
  }
  selectC(selectedItem) {
    this.selected = selectedItem;
    console.log(this.selected);
    this.viewCtrl.dismiss(this.selected);
  }
  searchCountry(ev: any) {
        // reset countries list with initial call
        this.countries = this.countriesInitial;
        // set q to the value of the searchbar


    // if the value is an empty string don't filter the items
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.countries = this.countries.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
}

}
