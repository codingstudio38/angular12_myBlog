import { Component, OnInit, HostListener,ElementRef, ViewChild,AfterViewInit} from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css'],
})
export class MyblogComponent implements OnInit {
   @ViewChild('myIdentifier') myIdentifier:any;
  constructor() {}

  ngOnInit(): void {
   $(document).ready(()=>{
    $('html, body').animate({scrollTop:0}, 'slow');
    //https://brianflove.com/2016-10-10/angular-2-window-scroll-event-using-hostlistener/
    // $(window).scroll(function (event:any) {
    //   console.clear();
    //    console.log(event);
    //  })
    //document.body.addEventListener('wheel',(event:any):void=>{
    //if($(window).scrollTop() > 0){
    //console.clear();
    //if (checkScrollDirectionIsUp(event)) {
    //console.log('UP');
    // console.log(event.wheelDelta,event.deltaY);
    //.log("scrollTop ", $(window).scrollTop(), " height ",$(window).height());
    // } else {
    // console.log('Down');
    // console.log(event.wheelDelta,event.deltaY);
    // console.log("scrollTop ", $(window).scrollTop(), " height ",$(window).height());
    // }
    //}
    //});
    // function checkScrollDirectionIsUp(event:any) {
    //   if (event.wheelDelta) {
    //     return event.wheelDelta > 0;
    //   }
    //   return event.deltaY < 0;
    // }
   })
  }

  // checkScrollDirectionIsUp(event:any) {
  //   if (event.wheelDelta) {
  //     return event.wheelDelta > 0;
  //   }
  //   return event.deltaY < 0;
  // }
  // @HostListener('window:wheel', ['$event'])
  //   onWindowupdown(event:any) {
  //     // console.clear();
  //     if (this.checkScrollDirectionIsUp(event)) {
  //       console.log("Up");
  //     }else{
  //       console.log("Down");
  //     }
  //   }
  ngAfterViewInit() {
    var width = this.myIdentifier.nativeElement.offsetWidth;
    var height = this.myIdentifier.nativeElement.offsetHeight;
    return [width,height];
  }
  


  data:any[] = [
  {"no":0,"name":"vidyut1","phone":1234567891},
  {"no":1,"name":"vidyut2","phone":1234567892},
  {"no":2,"name":"vidyut3","phone":1234567893}
  ];
  local_scroll: any;
  checklocalscroll() {
    this.local_scroll = localStorage.getItem('scroll')
      ? localStorage.getItem('scroll')
      : 0;
    return this.local_scroll;
  }
  local_scroll_down: any;
  checklocalscrolldown() {
    this.local_scroll_down = localStorage.getItem('scroll_down')
      ? localStorage.getItem('scroll_down')
      : 0;
    return this.local_scroll_down;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    return [window.innerWidth, window.innerHeight];
  }
  current_scroll: any;
  current_down: any;
  div_difference:any;
  @HostListener('window:scroll', ['$event'])
  checkScroll($event: any) {
     console.clear();
    this.current_scroll = document.documentElement.scrollTop;
    this.current_down = document.documentElement.scrollTop;
    this.div_difference = this.ngAfterViewInit()[1]*5;
    if (this.checklocalscroll() > this.current_scroll) {
      //console.log('UP');
      //this.onScrollUp();
    } else {
      if(315*this.data.length-this.current_down < 300){
        
        setTimeout(()=>{
          this.onScrollDown();
        },1000)
      }
      console.log('DOWN');
      console.log("difference",315*this.data.length-this.current_down);
      console.log(315*this.data.length);
       console.log(this.data);
      //console.log(this.div_difference,this.ngAfterViewInit());
        //console.log("difference",this.div_difference-this.current_down);
       console.log(this.current_down);
       if(this.checklocalscrolldown() > this.current_down){
         console.log("small");
        //  if(this.current_down < 700 && this.data.length < 3){
        //     this.onScrollDown();
        //  }
        //  if(this.current_down < 1000 && this.data.length < 6) {
        //     this.onScrollDown();
        //  }
       } else {
        console.log("big");
        // this.onScrollDown();
        window.localStorage.removeItem("scroll_down");
        window.localStorage.setItem("scroll_down", this.current_down);
       }
    }
    window.localStorage.removeItem('scroll');
    window.localStorage.setItem('scroll', this.current_scroll);
  }
  //npm install ngx-infinite-scroll --save
 
  onScrollDown() {
    let total = this.data.length;
    for (let i = 0; i < 3; i++) {
      this.data.push({"no":total,"name":`vidyut${total}`,"phone":1234567891});
      total++;
    }
     console.clear();
    console.log(this.data);
  }
  onScrollUp() {
    if(this.data.length > 3){
      for (let x = 0; x < 3; x++) {
        this.data.pop();
      }
    }
    console.clear();
    console.log(this.data);
  }
}
