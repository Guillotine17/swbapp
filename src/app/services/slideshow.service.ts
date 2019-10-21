import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {

  constructor(private http: HttpClient) { }
  getImages() {
    return this.http.get('http://guillotine.dev:8081/image');
  }

}
