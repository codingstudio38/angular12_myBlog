import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  AbstractControl, 
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { RegisterApiServiceService } from './../../services/register-api-service.service';
import { CustomValidators } from './../../custom_form_validation/custom_validation';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
})
export class MyformComponent implements OnInit {
  constructor(private formbuild: FormBuilder) {}

  ngOnInit(): void {
   
  }
 
  hobbies_list: Array<any> = [
    { id: 1, name: 'Playing' },
    { id: 2, name: 'Singing' },
    { id: 3, name: 'Reading' },
    { id: 4, name: 'Writing' },
  ];
  myform = this.formbuild.group({
    photo: new FormControl('', [
      CustomValidators.required('Photo required'), //filevalidation('Photo required','/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/',1)
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
    hobbies: this.formbuild.array(
      [],
      [CustomValidators.checkarraylength('Hobbies required')]
    ),
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

  ex: Array<any> = ['image/png', 'image/jpeg'];
  uploadFile(event: any): any {
    let renderimg = document.getElementById('renderimg');
    let fileis = event.target.files.length>0?event.target.files[0]:'';
    let filetype = event.target.files.length>0?event.target.files[0].type:'';
    let filesize: any = event.target.files.length>0?event.target.files[0].size:0;
    let size:any =0;
    if(fileis!==''){
      $('#renderimg').attr({'src':URL.createObjectURL(fileis),'width':'100', 'height':'100'})
      // console.log(URL.createObjectURL(fileis));//for bob url
      // let reader = new FileReader();
      // reader.onload = function(e) {
      //     console.log(reader.result);//for base64
      // };
      // reader.readAsDataURL(fileis);
    } else {
      $('#renderimg').attr({'src':'','width':'', 'height':''})
    }
    if(event.target.value==""){
      alert('Please select a file');
      this.myform.patchValue({photo: "" })
      return false;
    } else if (event.target.files.length <= 0) {
      alert('Please select a file.');
      this.myform.patchValue({photo: "" })
      return false;
    } else if (this.ex.indexOf(filetype) < 0) {
      alert('Please select png, jpeg file');
      this.myform.patchValue({photo: "" })
      // this.myform.controls['photo'].setValidators([
      //   CustomValidators.invalidfile('Allow only png,jpeg file'),
      // ]);
      return false;
    } else if(size > 500){
      alert("Image size should be size less than 500 kb");
       this.myform.patchValue({photo: "" });
       return false;
    } else {
      this.myform.patchValue({
        photo: <File>event.target.files[0],
      });
      console.clear();
      return true;
    }
  }
  
  check() {
    console.clear();
    console.log(this.myform);
     console.log(this.myform.value);
    const Form = new FormData();
    Form.append('photo', this.myform.get('photo')?.value);
    Form.append('gender', this.myform.get('gender')?.value);
    Form.append('name', this.myform.get('name')?.value);
    Form.append('emailid', this.myform.get('emailid')?.value);
    Form.append('phoneno', this.myform.get('phoneno')?.value);
    Form.append('phone_code', this.myform.get('p_code')?.value);
    Form.append('hobbies', this.myform.get('hobbies')?.value);
    Form.append('password', this.myform.get('password')?.value);
    // console.log(Form);
  }
}
