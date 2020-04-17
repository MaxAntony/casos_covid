import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // title = 'Covid-19';
  dataformated = [];
  country = 'Peru';
  // date
  today: NgbDateStruct;
  // chart
  dataChart = [];
  view: any[] = [600, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Casos';
  showYAxisLabel = true;
  yAxisLabel = 'Personas';
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB'],
  };
  // input country suggestions
  countries = [];

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    this.getToday();
    const data = await this.getData();
    this.getCountries(data);
    this.formatData(data);
    // TODO: mejorar el input, aqui una libreria interesante: https://www.npmjs.com/package/angular-ng-autocomplete
    // TODO: agregar funcionalidad de seleccionar fecha por rangos
  }

  async getData() {
    let data = {};
    try {
      data = await this.dataService.getData();
    } catch (e) {
      console.log(e);
    }
    return data;
  }

  formatData(data) {
    let dayStatus;

    for (const key in data) {
      if (
        data.hasOwnProperty(key) &&
        key.toLowerCase() === this.country.toLowerCase()
      ) {
        for (const day of data[key]) {
          const date = day.date.split('-');
          if (
            Number(date[0]) === Number(this.today.year) &&
            Number(date[1]) === Number(this.today.month) &&
            Number(date[2]) === Number(this.today.day)
          ) {
            dayStatus = day;
          }
        }
      }
    }

    if (dayStatus) {
      this.dataChart = [
        {
          name: 'Muertos',
          value: dayStatus.deaths,
        },
        {
          name: 'Infectados',
          value: dayStatus.confirmed,
        },
        {
          name: 'Recuperados',
          value: dayStatus.recovered,
        },
      ];
    } else {
      this.dataChart = [
        {
          name: 'No hay datos',
          value: 0,
        },
      ];
    }
  }

  onclickChart(e) {
    console.log(e);
  }

  getToday() {
    const date = new Date();
    this.today = {
      year: Number(date.getFullYear()),
      month: Number(date.getMonth()) + 1,
      day: Number(date.getDate()) - 1,
    };
  }

  async countryChanged(e) {
    this.formatData(await this.getData());
  }

  async dateChanged(e) {
    if (this.today && this.today.year && this.today.month && this.today.day) {
      this.formatData(await this.getData());
    }
  }
  getCountries(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this.countries.push(key);
      }
    }
  }
}
