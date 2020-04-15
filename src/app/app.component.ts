import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Covid-19';
  dataformated = [];
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.dataService.getData().subscribe(
      (res) => {
        this.dataformated = this.formatData(res as any[]);
      },
      (err) => {
        console.log('ocurrio un error');
      }
    );
  }

  formatData(data) {
    const ciudad = [];

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const cityName = key;
        const deaths = data[key][data[key].length - 1].deaths;
        const confirmed = data[key][data[key].length - 1].confirmed;
        const recovered = data[key][data[key].length - 1].recovered;
        ciudad.push({ cityName, deaths, confirmed, recovered });
      }
    }

    return ciudad;
  }
}
