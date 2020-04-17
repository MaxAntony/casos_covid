import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  readonly URL_API = 'https://pomber.github.io/covid19/timeseries.json';

  constructor(private http: HttpClient) {}

  async getData() {
    return await this.http.get(this.URL_API).toPromise();
  }
}
