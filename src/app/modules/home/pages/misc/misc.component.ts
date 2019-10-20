import { Component, OnInit } from '@angular/core';
// const hands = require('src/assets/scripts/hands');
// const skull = require('src/assets/scripts/skull');
import * as skull from 'src/assets/scripts/skull';
import * as hands from 'src/assets/scripts/hands';
@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.less']
})
export class MiscComponent implements OnInit {

  constructor() {
    // const ourNewIllustration = newIllustration;
   }

  ngOnInit() {
    // console.log(hands);
    // hands.mirrorCanvas('zdog-canvas0');
    hands.newIllustration('.zdog-canvas0');
    skull.newIllustration('.zdog-canvasonehalf');
    hands.newIllustration('.zdog-canvas1');
  }

}
