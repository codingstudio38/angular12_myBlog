import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private APIservice: RegisterApiServiceService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    // this.checkLogin();
    if (this.APIservice.checkuserIsloggedin()) {
      this.router.navigate(['/user']);
    }
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]),
    emailid: new FormControl('', [Validators.required, Validators.email]),
    profilePic: new FormControl('', [Validators.required]),
    phoneno: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)])

  })
  get name() {
    return this.registerForm.get('name');
  }
  get emailid() {
    return this.registerForm.get('emailid');
  }
  get phoneno() {
    return this.registerForm.get('phoneno');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get profilePic() {
    return this.registerForm.get('profilePic');
  }
  filename: any = '';
  uploadFile(event: any): void {
    this.filename = event.target.files[0].name;
    this.registerForm.patchValue({
      profilePic: <File>event.target.files[0]
    });

  }
  registerPoint: boolean = false;
  apistatus: any;
  apistatusCode: any;
  register_message: any;
  progress: number = 0;
  evenTotal: any;
  register() {
    const rgForm = new FormData();
    rgForm.append('profilePic', this.registerForm.get('profilePic')?.value);
    rgForm.append('name', this.registerForm.get('name')?.value);
    rgForm.append('email', this.registerForm.get('emailid')?.value);
    rgForm.append('password', this.registerForm.get('password')?.value);
    rgForm.append('phoneno', this.registerForm.get('phoneno')?.value);
    this.APIservice.newRegister(rgForm).subscribe((response: HttpEvent<any>) => {
      switch (response.type) {
        case HttpEventType.Sent:
          //console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          //console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          this.evenTotal = response.total;
          this.progress = Math.round(response.loaded / this.evenTotal * 100);
          break;
        case HttpEventType.Response:
          this.apistatus = response.body;
          this.apistatusCode = this.apistatus.status;
          this.registerPoint = true;
          if (this.apistatus.status == 200) {
            this.register_message = this.apistatus.message;
            this.filename = '';
            this.registerForm.reset();
            setTimeout(() => {
              this.registerPoint = false;
              this.router.navigateByUrl('/signin');
            }, 5000);
          } else {
            this.register_message = this.apistatus.message;
            setTimeout(() => {
              this.registerPoint = false;
            }, 5000);
          }
      }
    });
  }

  checkLogin() {
    var Userid = this.cookieService.get('myUserid');
    var userName = this.cookieService.get('userName');
    if (!(Userid == "")) {
      alert(`Hii ${userName}. You Are Allready Logged In..`);
      this.router.navigateByUrl('/user');
    }
  }







}


