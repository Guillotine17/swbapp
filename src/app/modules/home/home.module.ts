import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { MiscComponent } from './pages/misc/misc.component';
import { SlideshowComponent } from './pages/slideshow/slideshow.component';


@NgModule({
  declarations: [HomeComponent, ResumeComponent, MiscComponent, SlideshowComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
