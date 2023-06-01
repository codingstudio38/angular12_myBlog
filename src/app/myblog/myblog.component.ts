import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { RegisterApiServiceService } from '../services/register-api-service.service'; 
import { HttpEvent, HttpEventType } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css'],
})
export class MyblogComponent implements OnInit {
  @ViewChild('myIdentifier') myIdentifier: any;
  constructor(private API: RegisterApiServiceService) {}

  ngOnInit(): void {
    $(document).ready(() => {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    }); 
  }


  data: any[] = [
    { no: 0, name: 'vidyut1', phone: 1234567891 },
    { no: 1, name: 'vidyut2', phone: 1234567892 },
    { no: 2, name: 'vidyut3', phone: 1234567893 },
  ];
  local_scroll: any;
  local_scroll_down: any;
  current_scroll: any;
  current_down: any;
  function_status: boolean = true;
  checklocalscroll() {
    this.local_scroll = localStorage.getItem('scroll') ? localStorage.getItem('scroll') : 0;
    return this.local_scroll;
  }
  checklocalscrolldown() {
    this.local_scroll_down = localStorage.getItem('scroll_down') ? localStorage.getItem('scroll_down') : 0;
    return this.local_scroll_down;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    return [window.innerWidth, window.innerHeight];
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll($event: any) {
    this.current_scroll = document.documentElement.scrollTop;
    this.current_down = document.documentElement.scrollTop;
    console.clear();
    console.log("current_scroll ",this.current_scroll);
    console.log("current_down ",this.current_down);
    if (this.function_status) {
      if (this.checklocalscroll() > this.current_scroll) {
        // console.clear();
        // console.log('UP');
        //this.onScrollUp();
      } else {
        if (315 * this.data.length - this.current_down < 300) {
           this.function_status=false;
          setTimeout(() => {
            this.onScrollDown();//working
          }, 10);
          // console.clear();
          //console.log('Down');
        }
        if (this.checklocalscrolldown() > this.current_down) {
          //  if(this.current_down < 700 && this.data.length < 3){//no need
          //     this.onScrollDown();
          //  }
          //  if(this.current_down < 1000 && this.data.length < 6) {//no need
          //     this.onScrollDown();
          //  }
        } else {
          window.localStorage.removeItem('scroll_down');
          window.localStorage.setItem('scroll_down', this.current_down);
        }
      }
      window.localStorage.removeItem('scroll');
      window.localStorage.setItem('scroll', this.current_scroll);
    }
  }
  //npm install ngx-infinite-scroll --save
total:number=0;
blog_data:any;
blog_res:any;
show_loader:boolean=false;
last_page:any;
current_page:number=1;
next_page_url:any;
next_page:any;
  onScrollDown() {
    if(this.current_page==0){
        this.function_status=false; 
        this.show_loader=false; 
        return;
    } 
     this.API.getblogdata(this.current_page,10).subscribe((response: HttpEvent<any>) => {
       this.show_loader=true; 
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
            for (let i = 0; i < this.blog_data.length; i++) {
           this.data.push(this.blog_data[i][1]);
           } 
           if(this.blog_res.alldata.next_page_url !==null){
              this.function_status=true;
              this.next_page_url = this.blog_res.alldata.next_page_url.split("=");
              this.current_page=this.next_page_url[1];
           } else {
              this.current_page=0;
              this.function_status=false; 
           }
            this.show_loader=false; 
            console.clear();
            console.log(this.data);
        }
      });
   
  }
  onScrollUp() {
    if (this.data.length > 3) {
      for (let x = 0; x < 3; x++) {
        this.data.pop();
      }
    }
  }
}
