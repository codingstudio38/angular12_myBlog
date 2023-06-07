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
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]),
    emailid: new FormControl('', [CustomValidators.required('Email id required.'), CustomValidators.email('Enter a valid email.')]),
    p_code: new FormControl('', [Validators.required]),
    phoneno: new FormControl('', [CustomValidators.required('Phone no required.'), CustomValidators.minLength(10,'Phone no should be of minimum length 10'), CustomValidators.maxLength(10,'Phone no should be of maximum length 10'),CustomValidators.onlynumbers('Allow only numbers')]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)])
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
