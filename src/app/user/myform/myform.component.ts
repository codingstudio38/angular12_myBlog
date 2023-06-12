import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { RegisterApiServiceService } from './../../services/register-api-service.service';
import { CustomValidators } from './../../custom_form_validation/custom_validation';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
})
export class MyformComponent implements OnInit {
  constructor(private formbuild: FormBuilder) { }

  ngOnInit(): void { }

  hobbies_list: Array<any> = [
    { id: 1, name: 'Playing' },
    { id: 2, name: 'Singing' },
    { id: 3, name: 'Reading' },
    { id: 4, name: 'Writing' },
  ];
  myform = this.formbuild.group({
    photo: new FormControl('', [
      this.checkFileType
      //CustomValidators.required('Photo required'),//filevalidation('Photo required','/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/',1)
    ]),
    name: new FormControl('', [
      CustomValidators.namecheck('Enter your full name'),
    ]),
    emailid: new FormControl('', [
      CustomValidators.emailcheck('Enter a valid email'),
    ]),
    p_code: new FormControl('', [
      CustomValidators.required('Select country code'),
    ]),
    phoneno: new FormControl('', [
      CustomValidators.phonecheck('Phone no required', 10, 10),
    ]),
    password: new FormControl('', [
      CustomValidators.passwordcheck('Password required', 8, 12),
    ]),
    gender: new FormControl('', [CustomValidators.required('Gender required')]),
    hobbies: this.formbuild.array([], [CustomValidators.checkarraylength('Hobbies required')]),
  });


  get photo() {
    return this.myform.get('photo');
  }
  get gender() {
    return this.myform.get('gender');
  }
  get name() {
    return this.myform.get('name');
  }
  get emailid() {
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
  get hobbies() {
    return this.myform.get('hobbies') as FormArray;
  }

  saveItem(event: any, id: any) {
    const formArray: FormArray = this.myform.get('hobbies') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl({ id: id, value: event.target.value }));
    } else {
      let i: number = 0;
      this.myform.get('hobbies')?.value.forEach((val: any, key: number) => {
        if (val.id == id) {
          formArray.removeAt(i);
        }
        i++;
      });
    }
    //console.clear();
    //console.log(this.myform.get('hobbies')?.value);
  }

  uploadFile(event: any): void {
    //  console.log(event.target.files);
    if (event.target.length > 0) {
      this.myform.patchValue({
        photo: <File>event.target.files[0]
      });
    }
  }
checkFileType(control: AbstractControl): { [key: string]: any } | null {
    const files: File[] = control.value;
    //  console.log(files);
    if (files.length <= 0) {
      return { invalid: true,message: 'Photo required',};
    }
   return null;
}
  check() {
    console.clear();
    console.log(this.myform);
    const Form = new FormData();
    Form.append('photo', this.myform.get('photo')?.value);
    Form.append('gender', this.myform.get('gender')?.value);
    Form.append('name', this.myform.get('name')?.value);
    Form.append('emailid', this.myform.get('emailid')?.value);
    Form.append('phoneno', this.myform.get('phoneno')?.value);
    Form.append('phone_code', this.myform.get('p_code')?.value);
    Form.append('hobbies', this.myform.get('hobbies')?.value);
    Form.append('password', this.myform.get('password')?.value);
    console.log(Form);
  }
}
