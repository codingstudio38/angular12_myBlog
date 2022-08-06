import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private APIservice: RegisterApiServiceService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    // this.checkLogin();
    if (this.APIservice.checkuserIsloggedin()) {
      this.loginmenu = false;
      this.dashboardmenu = true;
    }
  }
  headerCheck = this.router.url;

  loginmenu: any = true;
  dashboardmenu: any = false;
  // checkLogin() {
  //   var Userid = this.cookieService.get('myUserid');
  //   var userName = this.cookieService.get('userName');
  //   if (!(Userid == "")) {
  //     this.loginmenu = false;
  //     this.dashboardmenu = true;
  //   }
  // }

 
searchtype:any="headersearchbox";
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
                window.location.href = 'http://localhost:4200';
              } else {
                alert(this.logout_res.message);
              }
          }
        })
      }
    }
  }





}
