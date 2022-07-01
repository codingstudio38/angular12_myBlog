import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private APIservice: RegisterApiServiceService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
  }

  loginuser: any;
  checkuser() {
    this.loginuser = this.APIservice.loggedinuserdata();
  }

  public formlist: any[] = [{
    id: 0,
    title: '',
    link: '',
    date: ''
  }];

  formValue() {
    console.log(this.formlist);
  }

  addnew() {
    this.formlist.push({
      id: this.formlist.length + 1,
      title: '',
      link: '',
      date: ''
    });
  }

  removeThis(id: number) {
    this.formlist.splice(id, 1)
  }
}
