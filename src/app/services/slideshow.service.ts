import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {

  constructor(private http: HttpClient) { }
  getImages() {
    return this.http.get('https://guillotine.dev:8081/image');
  }
  banImage(imageId) {
    console.log('banning:' + imageId);
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = {
      imageId
    };
    return this.http.post(`https://guillotine.dev:8081/image/ban/${imageId}`, body);
  }

}
