import { Component, OnInit } from '@angular/core';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-my-new-blog',
  templateUrl: './my-new-blog.component.html',
  styleUrls: ['./my-new-blog.component.css']
})
export class MyNewBlogComponent implements OnInit {

  constructor(private API: RegisterApiServiceService) { }

  ngOnInit(): void {
   this.blogdata(this.current_page);
  }
 
current_page:any=1;
last_page:any=1;
show:boolean=true;
show_loader:boolean=false;
next_page_url:any;
blog_res:any;
blog_data:any;
origin_data:any[]=[];

blogdata(page:any) {
  this.show=false;
  this.show_loader=true; 
  setTimeout(()=>{  
  this.API.getblogdata(page,10).subscribe((response: HttpEvent<any>) => {
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
            this.blog_res = response.body;
           console.clear();
             this.blog_data = Object.entries(this.blog_res.alldata.data);
            this.last_page = this.blog_res.alldata.last_page;
            this.next_page_url=this.blog_res.alldata.next_page_url;
            for (let i = 0; i < this.blog_data.length; i++) {
           this.origin_data.push(this.blog_data[i][1]);
           } 
            if(this.current_page < this.last_page){
              this.current_page=this.current_page+1;
            } else {
              this.current_page=this.current_page-1;
            }
           if(this.next_page_url !==null){
              this.show=true;
              this.show_loader=false; 
           } else {
              this.show=false;
              this.show_loader=false; 
           }
        }
      });
      },2000)
  }

 
// setdata(data:any){
//   this.origin_data.push(data);
//    console.log(this.origin_data);
// }








}
