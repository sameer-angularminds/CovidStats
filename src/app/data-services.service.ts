import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get("https://api.covid19api.com/summary");

  }
}
