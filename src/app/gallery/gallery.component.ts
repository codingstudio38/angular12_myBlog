import { Component, OnInit } from '@angular/core';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private API: RegisterApiServiceService) { }

  ngOnInit(): void {
     this.getallgallery();
  }

 alldata:any;
gallerydata:any;
getallgallery() {
      this.API.getgallery().subscribe((response) => {
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
            this.gallerydata = response.body;
            this.alldata = "";
            if (this.gallerydata.status === 200) {
              this.alldata = this.gallerydata.alldata;
            } else {
              alert(this.gallerydata.message);
              this.alldata = "";
            }
            // console.log(this.alldata);
            console.clear();
        }
      })
  }

 
classtype(val:any){
   switch (val) {
          case 'Web':
            return "filter-web";
          case 'Card':
            return "filter-card";
          case 'App':
            return "filter-app";
          default:
            return "filter-web";
        }
}







}
