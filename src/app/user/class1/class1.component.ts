import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-class1',
  templateUrl: './class1.component.html',
  styleUrls: ['./class1.component.css']
})
export class Class1Component implements OnInit {

  constructor(private API: RegisterApiServiceService) {
    this.viewalltbldata(1);
    this.getUsers();
  }

  ngOnInit(): void {

  }

  filename: any = '';
  alldata: any = '';
  viewdata: any = '';
  registerPoint: boolean = false;
  apistatus: any;
  apistatusCode: any;
  register_message: any;
  progress: number = 0;
  evenTotal: any;
  userid: any;
  search_result: any;
  photo: any;
  currentdate: any;
  search_status: any;
  update_status: any;
  delete_result: any;
  delete_status: any;
  passwordType: any = "password";



  displayStyle = "none";

  modal_userid: any = "";
  modal_email: any = "";
  modal_photo: any = "";
  modal_date: any = "";
  openPopup(data: any) {
    this.modal_userid = data.id;
    this.modal_email = data.email;
    this.modal_photo = data.photo;
    this.modal_date = data.currentdate;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  getUsers() {
    if (this.API.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login again."); return;
    } else {
      this.API.getalldata().subscribe((response) => {
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
            this.viewdata = response.body;
            this.alldata = "";
            this.search_status = "";
            if (this.viewdata.status === 200) {
              this.alldata = this.viewdata.alldata;
            } else {
              alert(this.viewdata.message);
              this.alldata = "";
            }
        }
      })
    }
  }

  page: number = 1;
  total: number = 5;
  pageChangeEvent(event: number) {
    this.page = event;
    // console.log(this.page);
    this.viewalltbldata(this.page);
  }

  viewtbldata: any;
  tbldata: any[] = [];
  gettbldata: any[] = [];
  tbl_data_status: any;
  datatime: boolean = false;
  check: any[] = [];
  viewalltbldata(num: number) {
    this.datatime = true;
    if (this.API.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    } else {
      this.API.gettbldata(num).subscribe((response) => {
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
            this.viewtbldata = response.body;
            this.check = [];
            this.tbldata = [];
            this.tbl_data_status = "";
            if (this.viewtbldata.status === 200) {
              if (this.viewtbldata.alldata.data.length > 0) {
                this.gettbldata = this.viewtbldata.alldata.data;
                this.total = this.viewtbldata.alldata.total;
                this.page = this.viewtbldata.alldata.current_page;
                var from = this.viewtbldata.alldata.from;
                var to = this.viewtbldata.alldata.to;
                for (let x = from; x <= to; x++) {
                  this.check.push(x);
                }
                for (let c = 0; c < this.gettbldata.length; c++) {
                  this.tbldata.push({
                    currentdate: this.gettbldata[c].currentdate,
                    email: this.gettbldata[c].email,
                    id: this.gettbldata[c].id,
                    password: this.gettbldata[c].password,
                    photo: this.gettbldata[c].photo,
                    user_agent: this.gettbldata[c].user_agent,
                    slno: this.check[c]
                  })
                }
              } else {
                this.total = 0;
                this.tbldata = [];
                this.gettbldata = [];
                this.check = [];
                this.page = 1;
              }
            } else {
              alert(this.viewtbldata.message);
              this.total = 0;
              this.tbldata = [];
              this.gettbldata = [];
              this.check = [];
              this.page = 1;
            }
            this.datatime = false;
        }
      })
    }
  }





  uploadFile(event: any): void {
    if (event.target.files.length > 0) {
      this.filename = event.target.files[0].name;
      this.form2.patchValue({
        profilePic: <File>event.target.files[0]
      });
    }
  }
  form2 = new FormGroup({
    email1: new FormControl('', [Validators.required, Validators.email]),
    userAgent: new FormControl(window.navigator.userAgent),
    pwd1: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    profilePic: new FormControl('', [Validators.required]),
  });

  get email1() {
    return this.form2.get('email1');
  }
  get pwd1() {
    return this.form2.get('pwd1');
  }
  get profilePic() {
    return this.form2.get('profilePic');
  }


  showpass() {
    if (this.passwordType == "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
  }
  userupload() {
    const rgForm = new FormData();
    rgForm.append('profilePic', this.form2.get('profilePic')?.value);
    rgForm.append('email', this.form2.get('email1')?.value);
    rgForm.append('password', this.form2.get('pwd1')?.value);
    rgForm.append('user_agent', this.form2.get('userAgent')?.value);
    if (this.API.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    } else {
      this.API.newpost(rgForm).subscribe((response: HttpEvent<any>) => {
        // console.log(response);
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            // console.log('UploadProgress' + HttpEventType.UploadProgress);
            break;
          case HttpEventType.Response:
            this.apistatus = response.body;
            this.form2.reset();
            this.filename = "";
            alert(this.apistatus.message);
            this.getUsers();
            this.viewalltbldata(1);
          // console.log(this.apistatus);
        }
      });
    }
  }


  useredit(data: any) {
    if (this.API.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    } else {
      this.API.usersearch(data.id).subscribe((response: HttpEvent<any>) => {
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            // console.log('UploadProgress' + HttpEventType.UploadProgress);
            break;
          case HttpEventType.Response:
            this.search_result = response.body;
            this.search_status = this.search_result.status;
            if (this.search_result.status === 200) {
              this.updateform = new FormGroup({
                updateid: new FormControl(this.search_result.userdata.id, [Validators.required]),
                emailnew: new FormControl(this.search_result.userdata.email, [Validators.required, Validators.email]),
                userAgent: new FormControl(window.navigator.userAgent, [Validators.required]),
                oldfile: new FormControl(this.search_result.userdata.photo),
                profilePicnew: new FormControl(''),
              });
              this.userid = this.search_result.userdata.id;
              this.photo = this.search_result.userdata.photo;
              this.currentdate = this.search_result.userdata.currentdate;
            } else {
              alert(this.search_result.message);
              this.userid = "";
              this.photo = "";
              this.currentdate = "";
            }
          // console.log(this.userdata);
        }
      });
    }
  }

  searchuser(usersearch: any) {
    if (usersearch.value.userid == "") {
      alert("No records found..!!");
      this.search_status = "";
      return;
    } else {
      if (this.API.loggedinuserdata() === 0) {
        alert("Unauthorized..!! Please login."); return;
      } else {
        this.API.usersearch(usersearch.value.userid).subscribe((response: HttpEvent<any>) => {
          switch (response.type) {
            case HttpEventType.Sent:
              // console.log('Sent' + HttpEventType.Sent);
              break;
            case HttpEventType.ResponseHeader:
              // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
              break;
            case HttpEventType.UploadProgress:
              // console.log('UploadProgress' + HttpEventType.UploadProgress);
              break;
            case HttpEventType.Response:
              this.search_result = response.body;
              this.search_status = this.search_result.status;
              if (this.search_result.status === 200) {
                this.updateform = new FormGroup({
                  updateid: new FormControl(this.search_result.userdata.id, [Validators.required]),
                  emailnew: new FormControl(this.search_result.userdata.email, [Validators.required, Validators.email]),
                  userAgent: new FormControl(window.navigator.userAgent, [Validators.required]),
                  oldfile: new FormControl(this.search_result.userdata.photo),
                  profilePicnew: new FormControl(''),
                });
                this.userid = this.search_result.userdata.id;
                this.photo = this.search_result.userdata.photo;
                this.currentdate = this.search_result.userdata.currentdate;
              } else {
                alert(this.search_result.message);
                this.userid = "";
                this.photo = "";
                this.currentdate = "";
              }
            // console.log(this.userdata);
          }
        });
      }
    }
  }

  uploadFilenew(event: any): void {
    if (event.target.files.length > 0) {
      this.updateform.patchValue({
        profilePicnew: <File>event.target.files[0]
      });
    }
  }
  updateform = new FormGroup({
    updateid: new FormControl(''),
    emailnew: new FormControl('', [Validators.required, Validators.email]),
    userAgent: new FormControl(window.navigator.userAgent),
    profilePicnew: new FormControl(''),
    oldfile: new FormControl(''),
  });

  get updateid() {
    return this.updateform.get('updateid');
  }

  get emailnew() {
    return this.updateform.get('emailnew');
  }
  get userAgent() {
    return this.updateform.get('userAgent');
  }

  userupdate() {
    const upForm = new FormData();
    upForm.append('oldfile', this.updateform.get('oldfile')?.value);
    upForm.append('profilePic', this.updateform.get('profilePicnew')?.value);
    upForm.append('email', this.updateform.get('emailnew')?.value);
    upForm.append('user_agent', this.updateform.get('userAgent')?.value);
    upForm.append('updateid', this.updateform.get('updateid')?.value);
    if (this.API.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    } else {
      this.API.updateUser(upForm).subscribe((response: HttpEvent<any>) => {
        // console.log(response);
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
            this.update_status = response.body;
            // console.log(this.update_status); return;
            if (this.update_status.status === 200) {
              alert(this.update_status.message);
              this.getUsers();
              this.viewalltbldata(1);
            } else {
              alert(this.update_status.message);
            }
        }
      });
    }
  }

  deleteis(id: any) {
    if (confirm("Are you sure to delete this record ?")) {
      if (this.API.loggedinuserdata() === 0) {
        alert("Unauthorized..!! Please login."); return;
      } else {
        this.API.userdelete(id).subscribe((response: HttpEvent<any>) => {
          switch (response.type) {
            case HttpEventType.Sent:
              // console.log('Sent' + HttpEventType.Sent);
              break;
            case HttpEventType.ResponseHeader:
              // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
              break;
            case HttpEventType.UploadProgress:
              // console.log('UploadProgress' + HttpEventType.UploadProgress);
              break;
            case HttpEventType.Response:
              this.delete_result = response.body;
              this.delete_status = this.delete_result.status;
              if (this.delete_result.status === 200) {
                alert(this.delete_result.message);
                this.search_status = "";
                this.getUsers();
                this.viewalltbldata(1);
              } else {
                alert(this.delete_result.message);
              }
            // console.log(this.userdata);
          }
        });
      }
    }
  }









}
