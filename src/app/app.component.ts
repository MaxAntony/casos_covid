import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { createInput } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test';
  data = [];
  dataformated = [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.dataService.getData().subscribe(
      (res) => {
        console.log(res);
        this.data = res as any[];
        this.dataformated = this.formatData(this.data);
      },
      (err) => {
        console.log('ocurrio un eror');
      }
    );
  }

  formatData(data) {
    let ciudad = [];
    for (const key in data) {
      let cityName = key;
      let deaths = 0;
      let confirmed = 0;
      let recovered = 0;
      // BUG: solo se tiene que obtener el ultimo elemento del array para los casos actuales
      for (const frame of data[key]) {
        deaths = deaths + frame.deaths;
        confirmed = confirmed + frame.confirmed;
        recovered = confirmed + frame.recovered;
      }
      ciudad.push({ cityName, deaths, confirmed, recovered });
    }
    return ciudad;
  }
}
