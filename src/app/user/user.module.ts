import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { UserheaderComponent } from './userheader/userheader.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Class1Component } from './class1/class1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Class2Component } from './class2/class2.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { GalleryComponent } from './gallery/gallery.component';
import { MyformComponent } from './myform/myform.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
@NgModule({
  declarations: [ 
    HomeComponent,
    UserheaderComponent,
    UserDetailsComponent,
    Class1Component, 
    DashboardComponent,
    Class2Component,
    GalleryComponent,
    MyformComponent,
    ChatBoxComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class UserModule { }
