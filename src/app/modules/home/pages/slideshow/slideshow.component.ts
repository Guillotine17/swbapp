import { Component, OnInit } from '@angular/core';
import { SlideshowService } from 'src/app/services/slideshow.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.less']
})
export class SlideshowComponent implements OnInit {

  constructor(private slideshow: SlideshowService) { }
  image = {};
  ngOnInit() {
    this.getImage();
  }
  getImage() {
    this.slideshow.getImages().subscribe((data) => {
      console.log(data);
      if (data[0].url) {
        this.image = data[0];
      } 
    })
  }

}
