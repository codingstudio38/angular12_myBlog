import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  constructor() { }
// private echo: Echo
wsdata:any='';
  ngOnInit(): void {
    this.websocket();
  }

  websocket(){
    const WS = new Echo({
      broadcaster: 'pusher',
      key: 'ABCDEFGH',
      cluster: 'mt1',
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      enabledTransports:['ws']
    });
      // WS.join('public-channel')
      //   .here((user:any)=>{
      //       console.log("user",user);
      //   }) 
      //   .joining((user:any)=>{
      //       console.log("joining",user);
      //   }) 
      //   .leaving((user:any)=>{
      //       console.log("leaving",user);
      //   })
      //   .listen('Publicchannel', (event:any) => {
      //       console.log("data",event);
      //  })
    WS.channel('public-channel')
        .listen('Publicchannel', (event:any) => {
            console.log("data",event);
            this.wsdata=event;
        }).error((e:any)=>{
          console.log('error',e);
        });
        // this.echo.connector.socket.on('close', (close:any) => {
        // console.log('close',close);
        // })
        // console.log(WS);
  }



}
