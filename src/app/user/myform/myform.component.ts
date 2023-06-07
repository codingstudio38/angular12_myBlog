import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterApiServiceService } from './../../services/register-api-service.service';
import { CustomValidators } from './../../custom_form_validation/custom_validation';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css']
})
export class MyformComponent implements OnInit {


  constructor() { }
 
  ngOnInit(): void {
  }

  
  myform = new FormGroup({ 
    name: new FormControl('', [CustomValidators.namecheck('Enter your full name')]),
    emailid: new FormControl('', [CustomValidators.emailcheck('Enter a valid email')]),
    p_code: new FormControl('', [CustomValidators.required('Select country code')]),
    phoneno: new FormControl('', [CustomValidators.phonecheck('Phone no required',10,10)]),
    password: new FormControl('', [CustomValidators.passwordcheck('Password required',8,12)])
  })
  get name() {
    return this.myform.get('name');
  }
   
  get emailid() {
    // console.log(this.myform.get('emailid'));
    return this.myform.get('emailid');
  }
  get phoneno() {
    return this.myform.get('phoneno');
  }
  get password() {
    return this.myform.get('password');
  }
  get p_code() {
    return this.myform.get('p_code');
  }

check(){
  console.clear();
  console.log(this.myform);
}


}
