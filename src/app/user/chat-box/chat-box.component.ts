import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  constructor(
     private APIservice: RegisterApiServiceService,
  ) { }
// private echo: Echo
envdata:any = environment;
wsdata:any='';
  ngOnInit(): void {
    this.websocket();
    this.getChatUserlist();
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
      // https://github.com/tald7344/laravel-ngrx-ecommerce/tree/websocket
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
userlist:any[]=[];
getChatUserlist() {
      let name ='';
      this.APIservice.getChatUserlist('').subscribe(
        (response: HttpEvent<any>) => {
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
              let apistatus:any = response.body;
              if(apistatus.status==200){
this.userlist=apistatus.data;
              }
          }
        }
      );
   
  }

}
