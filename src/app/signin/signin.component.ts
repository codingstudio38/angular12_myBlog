import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private APIservice: RegisterApiServiceService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    // this.checkLogin();
    if (this.APIservice.checkuserIsloggedin()) {
      this.router.navigate(['/user']);
    }
  } 

  loginForm = new FormGroup({
    emailid: new FormControl('', [Validators.required, Validators.email]),
    userAgent: new FormControl(window.navigator.userAgent),
    password: new FormControl('', [Validators.required])
  })
  get emailid() {
    return this.loginForm.get('emailid');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginPoint: boolean = false;
  apistatus: any;
  apistatusCode: any;
  login_message: any;
  progress: number = 0;
  evenTotal: any;

  login() {
    this.APIservice.loginVerify(this.loginForm.value).subscribe((response) => {
      this.apistatus = response;
      //console.log(this.apistatus);
      this.apistatusCode = this.apistatus.status;
      this.login_message = this.apistatus.message;
      this.loginPoint = true;
      if (this.apistatus.status == 200) {
        this.cookieService.deleteAll();
        this.cookieService.set('myUserPhone', this.apistatus.userData.phone);
        this.cookieService.set('myUserid', this.apistatus.userData.id);
        this.cookieService.set('myEmail', this.apistatus.userData.email);
        this.cookieService.set('userName', this.apistatus.userData.name);
        window.localStorage.clear();
        window.localStorage.setItem("userData", JSON.stringify(this.apistatus));
        setTimeout(() => {
          this.loginPoint = false;
          this.router.navigateByUrl('/user');
        }, 1000);
      } else {
        setTimeout(() => {
          this.loginPoint = false;
        }, 5000);
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
