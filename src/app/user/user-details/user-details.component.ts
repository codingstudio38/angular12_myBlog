import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private APIservice: RegisterApiServiceService,) {
    this.checkActiveUser();
  }

  ngOnInit(): void {
  }

  userid1: any = this.APIservice.loggedin_userdata()[0].userid;
  email1: any = this.APIservice.loggedin_userdata()[0].email;
  userPhone1: any = this.APIservice.loggedin_userdata()[0].userPhone;
  userName1: any = this.APIservice.loggedin_userdata()[0].userName;

  userid: any;
  email: any;
  userPhone: any;
  userName: any;


  checkActiveUser() {
    this.userid = this.cookieService.get('myUserid');
    this.email = this.cookieService.get('myEmail');
    this.userPhone = this.cookieService.get('myUserPhone');
    this.userName = this.cookieService.get('userName');
  }

  logout_res: any;
  progress: number = 0;
  evenTotal: any;
  logout() {
    if (confirm("Are You Sure..") == true) {
      if (this.APIservice.loggedinuserdata() === 0) {
        alert("Unauthorized..!! Please login again."); return;
      } else {
        this.APIservice.logout().subscribe((response) => {
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
