import { Component, OnInit } from '@angular/core';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private API: RegisterApiServiceService,private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
    this.getallvideos();
  }
  transform(url:any) {
    // switch (url) {
    //       case 'html':
    //         return this._sanitizer.bypassSecurityTrustHtml(value);
    //       case 'style':
    //         return this._sanitizer.bypassSecurityTrustStyle(value);
    //       case 'script':
    //         return this._sanitizer.bypassSecurityTrustScript(value);
    //       case 'url':
    //         return this._sanitizer.bypassSecurityTrustUrl(value);
    //       case 'resourceUrl':
    //         return this._sanitizer.bypassSecurityTrustResourceUrl(value);
    //       default:
    //         return this._sanitizer.bypassSecurityTrustHtml(value);
    //     }
  } 
alldata:any;
viewdata:any;
getallvideos() {
      this.API.gethomevideo().subscribe((response) => {
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
            this.viewdata = response.body;
            this.alldata = "";
            if (this.viewdata.status === 200) {
              this.alldata = this.viewdata.allvideos;
            } else {
              alert(this.viewdata.message);
              this.alldata = "";
            }
            //console.log(this.alldata);
            console.clear();
        }
      })
  }

}
