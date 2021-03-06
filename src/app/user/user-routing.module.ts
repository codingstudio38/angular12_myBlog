import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { Class1Component } from './class1/class1.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { Class2Component } from './class2/class2.component';
import { GalleryComponent } from './gallery/gallery.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'class1', component: Class1Component },
      { path: 'class2', component: Class2Component },
      { path: 'gallery', component: GalleryComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
