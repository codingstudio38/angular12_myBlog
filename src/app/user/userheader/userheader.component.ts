import { ArrayType } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private API: RegisterApiServiceService) {
    this.checkActiveUser();
    setInterval(() => {
      this.checkActiveUser();
    }, 100);
  }

  ngOnInit(): void {
    this.getuserDataEvent.emit(this.userdata);
  }
  @Output() getuserDataEvent = new EventEmitter<any>();

  myUserid: any;
  myEmail: any;
  myUserPhone: any;
  userName: any;

  userdata: any = {
    'id': this.cookieService.get('myUserid'),
    'email': this.cookieService.get('myEmail'),
    'phone': this.cookieService.get('myUserPhone'),
    'name': this.cookieService.get('userName')
  };

  Loginis: any;
  checkActiveUser() {
    this.myUserid = this.cookieService.get('myUserid');
    this.myEmail = this.cookieService.get('myEmail');
    this.myUserPhone = this.cookieService.get('myUserPhone');
    this.userName = this.cookieService.get('userName');
    this.Loginis = localStorage.getItem("userData");
    if (this.myUserid == "") {
      this.cookieService.deleteAll();
      window.localStorage.clear();
      window.location.href = 'http://localhost:4200/signin';
    } else if (this.myEmail == "") {
      this.cookieService.deleteAll();
      window.localStorage.clear();
      window.location.href = 'http://localhost:4200/signin';
    } else if (this.myUserPhone == "") {
      this.cookieService.deleteAll();
      window.localStorage.clear();
      window.location.href = 'http://localhost:4200/signin';
    } else if (this.userName == "") {
      this.cookieService.deleteAll();
      window.localStorage.clear();
      window.location.href = 'http://localhost:4200/signin';
    } else if (this.Loginis == null && this.Loginis == undefined) {
      this.cookieService.deleteAll();
      //this.router.navigateByUrl('/signin');
      window.localStorage.clear();
      window.location.href = 'http://localhost:4200/signin';
    } else {
      return;
    }
  }

  logout_res: any;
  progress: number = 0;
  evenTotal: any;
  logout() {
    if (confirm("Are You Sure..") == true) {
      if (this.API.loggedinuserdata() === 0) {
        alert("Unauthorized..!! Please login again."); return;
      } else {
        this.API.logout().subscribe((response) => {
          switch (response.type) {
            case HttpEventType.Sent:
              // console.log('Sent' + HttpEventType.Sent);
              break;
            case HttpEventType.ResponseHeader:
              // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
              break;
            case HttpEventType.UploadProgress:
              this.evenTotal = response.total;
              this.progress = Math.round(response.loaded / this.evenTotal * 100);
              // console.log('UploadProgress' + HttpEventType.UploadProgress);
              break;
            case HttpEventType.Response:
              this.logout_res = response.body;
              if (this.logout_res.status === 200) {
                this.cookieService.deleteAll();
                window.localStorage.clear();
                window.location.href = 'http://localhost:4200/signin';
              } else {
                alert(this.logout_res.message);
              }
          }
        })
      }
    }
  }
}
