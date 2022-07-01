import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private APIservice: RegisterApiServiceService, private router: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {

  }


  loginid: any;
  loginEmail: any;
  loginPhone: any;
  loginName: any;
  getuserData(data: any): void {
    this.loginid = data.id;
    this.loginEmail = data.email;
    this.loginPhone = data.phone;
    this.loginName = data.name;
  }
} 
