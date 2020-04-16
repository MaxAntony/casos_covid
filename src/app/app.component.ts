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

  public single = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getToday();
    this.getData();
    // TODO: convertir el input de pais en desplegable y listar paises
    // TODO: agregar funcionalidad de seleccionar fecha por rangos
  }

  getData() {
    this.dataService.getData().subscribe(
      (res) => {
        this.formatData(res as any[]);
      },
      (err) => {
        console.log('ocurrio un error');
      }
    );
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
      this.single = [
        {
          name: 'Muertos',
          value: dayStatus?.deaths,
        },
        {
          name: 'Infectados',
          value: dayStatus?.confirmed,
        },
        {
          name: 'Recuperados',
          value: dayStatus?.recovered,
        },
      ];
    } else {
      this.single = [
        {
          name: 'No hay datos',
          value: 0,
        },
      ];
    }
  }

  onSelect(e) {
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
  countryChanged(e) {
    this.getData();
  }

  dateChanged(e) {
    if (this.today && this.today.year && this.today.month && this.today.day) {
      this.getData();
    }
  }
}
