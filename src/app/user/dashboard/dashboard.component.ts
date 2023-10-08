import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private APIservice: RegisterApiServiceService, private cookieService: CookieService) {

  }
  loginuser: any;
  page: number = 1;
  limit:number = 5;
  total: number =0;
 
  ngOnInit(): void {
    this.viewalltbldata(this.page);
  }

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
    if (this.APIservice.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    } else {
      this.APIservice.viewallvideolist(num).subscribe((response) => {
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            //this.evenTotal = response.total;
            //this.progress = Math.round(response.loaded / this.evenTotal * 100);
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
                    title: this.gettbldata[c].title,
                    id: this.gettbldata[c].id,
                    link: this.gettbldata[c].link,
                    date: this.gettbldata[c].date,
                    link_href: this.gettbldata[c].link_href,
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


  checkuser() {
    this.loginuser = this.APIservice.loggedinuserdata();
  }

  public formlist: any[] = [{
    id: 0,
    title: '',
    link: '',
    date: '',
    link_href: ''
  }];

  addnew() {
    this.formlist.push({
      id: this.formlist.length + 1,
      title: '',
      link: '',
      date: '',
      link_href: ''
    });
  }

  removeThis(id: number) {
    this.formlist.splice(id, 1)
  }


  apistatus: any;
  formValue() {
    const rgForm = new FormData();
    for (var i = 0; i < this.formlist.length; i++) {
      rgForm.append('id[]', "");
      rgForm.append('title[]', this.formlist[i].title);
      rgForm.append('link[]', this.formlist[i].link);
      rgForm.append('date[]', this.formlist[i].date);
      rgForm.append('link_href[]', this.formlist[i].link_href);
    }
    if (this.APIservice.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    } else {
      this.APIservice.addvideolist(rgForm).subscribe((response: HttpEvent<any>) => {
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
            console.log(this.apistatus);
            for (var i = 0; i < this.formlist.length; i++) {
              this.removeThis(i);
            }
            this.removeThis(0);
            this.formlist = [];
            this.viewalltbldata(1);
        }
      });
    }
  }

  delete_result: any;
  deletevideo(id: any) {
    if (confirm("Are you sure to delete this record ?")) {
      if (this.APIservice.loggedinuserdata() === 0) {
        alert("Unauthorized..!! Please login."); return;
      } else {
        this.APIservice.deletevideo(id).subscribe((response: HttpEvent<any>) => {
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
              if (this.delete_result.status === 200) {
                this.viewalltbldata(1);
                alert(this.delete_result.message);
              } else {
                alert(this.delete_result.message);
              }
            // console.log(this.userdata);
          }
        });
      }
    }
  }

  updateform = new FormGroup({
    id: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    link_href: new FormControl('', [Validators.required]),
  });
  get id() {
    return this.updateform.get('id');
  }
  get title() {
    return this.updateform.get('title');
  }

  get link() {
    return this.updateform.get('link');
  }
  get date() {
    return this.updateform.get('date');
  }
  get link_href() {
    return this.updateform.get('link_href');
  }
  displayStyle = "none";
  openPopup(data: any) {
    this.updateform = new FormGroup({
      id: new FormControl(data.id),
      title: new FormControl(data.title),
      link: new FormControl(data.link),
      date: new FormControl(data.date),
      link_href: new FormControl(data.link_href),
    });
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  update: any;
  updatevideo() {
    if (this.APIservice.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    } else {
      this.APIservice.updatevideo(this.updateform.value).subscribe((response: HttpEvent<any>) => {
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
            this.update = response.body;
            // console.log(this.update);
            if (this.update.status == 200) {
              alert(this.update.message);
            } else {
              alert(this.update.message);
            }
            this.closePopup();
            this.viewalltbldata(1);
        }
      });
    }
  }

  DownloadPDF():any {
    const databoj = new Date();
    let month: any = databoj.getMonth()+1 <=9 ? `0${databoj.getMonth()+1}`:databoj.getMonth()+1;
    let date: any = databoj.getDate() <=9 ? `0${databoj.getDate()}`:databoj.getDate();
    let today:any = `${databoj.getFullYear()}-${month}-${date}`
    //npm install @types/file-saver --save-dev
    if (this.APIservice.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    }
    this.APIservice.ExportPDF(this.page,this.limit).subscribe((response:any) => {
      // console.log("ExportPDF ",response);
     	let blob:any = new Blob([response], { type: 'application/pdf; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
      // console.log(url,blob);
			fileSaver.saveAs(blob, `pdf-file-${today}.pdf`);
    }, (error: any) => console.error('Error downloading the pdf file.. ',error));

  }  

  DownloadExcel() {
    const databoj = new Date();
    let month: any = databoj.getMonth()+1 <=9 ? `0${databoj.getMonth()+1}`:databoj.getMonth()+1;
    let date: any = databoj.getDate() <=9 ? `0${databoj.getDate()}`:databoj.getDate();
    let today:any = `${databoj.getFullYear()}-${month}-${date}`
    if (this.APIservice.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login."); return;
    }
    this.APIservice.ExporEXCEL(this.page,this.limit).subscribe((response: any) => {
     console.log("DownloadExcel ",response);
      // var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
     	// let blob:any = new Blob([response], { type: 'application/excel; charset=utf-8' });
			// const url = window.URL.createObjectURL(blob);
      // console.log(url,blob);
			// fileSaver.saveAs(blob, `excel-file-${today}.pdf`);
    }, (error: any) => console.error('Error downloading the excel file.. ',error));
  }

}
