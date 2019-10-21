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
  windowHeight = 50;
  windowWidth = 50;
  maxTimeLeft = 90;
  timeLeft = this.maxTimeLeft;
  interval;
  ngOnInit() {
    this.getImage();
    this.startTimer();
  }
  getImage() {
    this.resetTimer();
    this.slideshow.getImages().subscribe((data) => {
      console.log(data);
      if (data[0].url) {
        this.image = data[0];
      }
    });
  }
  ban(imageId) {
    this.slideshow.banImage(imageId).subscribe((data) => {
      this.getImage();
    });
  }
  resetTimer() {
    this.timeLeft = this.maxTimeLeft;
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.getImage();
        // this.resetTimer();
      }
    }, 1000 );
  }

  pauseTimer() {
    clearInterval(this.interval);
  }




}
