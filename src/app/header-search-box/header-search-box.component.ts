import { Component, OnInit,Input } from '@angular/core';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-header-search-box',
  templateUrl: './header-search-box.component.html',
  styleUrls: ['./header-search-box.component.css']
})
export class HeaderSearchBoxComponent implements OnInit {

  constructor(private API: RegisterApiServiceService) { }

  ngOnInit(): void {
  }
 @Input() stype:any;

showresult:boolean=false;


svalue:any=null;
searchvalue(val:any){
  this.showresult=false;
  this.svalue = val;
}


search_res:any;
search_data:any[]=[];
finddata(kw:any) {
  if(kw==""){
    this.search_data = [];
    this.showresult=false;
  } else {
      this.API.searchdata(this.stype,kw).subscribe((response: HttpEvent<any>) => {
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
            this.search_res = response.body;
            console.clear();
            //console.log(this.search_res);
            //this.search_data = this.search_res.data;
            this.search_data = [];
            for (let i = 0; i < this.search_res.data.length; i++) {
            if (this.search_res.data[i].name.substr(0, kw.length).toUpperCase() == kw.toUpperCase()) {
                    this.search_data.push({
                      name:this.search_res.data[i].name,
                      thistag:`<strong>${this.search_res.data[i].name.substr(0, kw.length)}</strong>${this.search_res.data[i].name.substr(kw.length)}`
                    }) 
                  }  else {
                    this.search_data.push({
                      name:this.search_res.data[i].name,
                      thistag:this.search_res.data[i].name
                    })
                  }
              } 
            this.showresult=true;
        }
      });
    }
  }



}
