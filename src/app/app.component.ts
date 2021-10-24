import { Component } from '@angular/core';
import { CoronaService } from './services/corona.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coronavirus';
  countries: any;
  country: any;
  confirmed: number[] = [];
  active: number[] = [];
  deaths: number[] = [];
  dateUtc?: string;
  date: string[] = [];
  display='none';

  constructor(private corona: CoronaService) {
  }
  ngOnInit() {
    this.corona.getCountries().subscribe((data) => {
      this.countries = data;
      this.countries.sort((a:any, b:any) => (a.Country > b.Country ? 1 : -1));
      console.log(data);
    })
  }
  getCoronaData() {
    this.corona.getCoronaRealtimeData(this.country).subscribe((data) => {
      var index = data.length - 1;
      let j = 14;
      for (let i = index - 13; i <= index; i++) {
        this.dateUtc = data[i].Date;
          // @ts-ignore
        this.date[j] = this.dateUtc.substring(0, 10);
        this.confirmed[j] = data[i].Confirmed;
        this.active[j] = data[i].Active;
        this.deaths[j] = data[i].Deaths;
        j--;
        console.log(data[i]);
      }
    })
  }

  getCountry(country: any) {
    this.country = country;
  }
  openModal(){
    this.display='block';
 }
 onCloseHandled(){
  this.display='none';
}
}
