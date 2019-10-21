import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { MiscComponent } from './pages/misc/misc.component';
import { SlideshowComponent } from './pages/slideshow/slideshow.component';


const routes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'resume',
  component: ResumeComponent
},
{
  path: 'slideshow',
  component: SlideshowComponent
},
{
  path: 'misc',
  component: MiscComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
