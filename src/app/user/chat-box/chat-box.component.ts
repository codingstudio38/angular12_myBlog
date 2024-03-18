import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
import { ChatServiceService } from '../../services/chat-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  constructor(
    private APIservice: RegisterApiServiceService,
    private chatservice: ChatServiceService
  ) {}
  // private echo: Echo
  envdata: any = environment;

  loggedinuserdata: any =
    this.APIservice.loggedinuserdata() !== 0
      ? this.APIservice.loggedinuserdata().userData
      : { id: '', name: '', email: '' };
  wsdata: any = '';
  ngOnInit(): void {
    this.websocket();
    this.getChatUserlist();
  }
  ActiveUsers: any[] = [];
  user_websocket_port: any = '';
  websocket(): any {
          const WS:any = new Echo({
      broadcaster: 'pusher',
      key: environment.wskey,
      cluster: environment.wscluster,
      // wsHost: window.location.hostname, // this also work
      wsHost:environment.wsHost,// this also work
      wsPort: environment.wsPort,
      forceTLS: environment.wsforceTLS,
      disableStats: true,
      enabledTransports:['ws'],
      authEndpoint:`${environment.apiUrl}/custom/broadcasting/auth`,
      auth:{ 
        headers:{
          Authorization:`Bearer ${this.APIservice.loggedinuserdata().token}`,
        }
      }
    });
    setTimeout(() => {

      WS.join('track-public-channel')
        .here((user: any) => {
          this.ActiveUsers = user;
        })
        .joining((user: any) => {
          this.JoinAnUser(user);
          console.log('joining', user);
        })
        .leaving((user: any) => {
          this.LeaveAnUser(user);
          console.log('leaving', user);
        })
        .listen('Publicchannel', (event: any) => {
          this.wsdata = event;
           console.log(WS);
        })
        .error((error: any) => {
          console.log('error', error);
        });
        //  console.log(WS.connector.pusher);
        console.log(WS.connector.pusher.channels.channels['presence-track-public-channel'].members);
      // https://github.com/tald7344/laravel-ngrx-ecommerce/tree/websocket
      // WS.channel('public-channel')
      //     .listen('Publicchannel', (event:any) => {
      //         console.log("data",event);
      //         this.wsdata=event;
      //     }).error((e:any)=>{
      //       console.log('error',e);
      //     });

      this.user_websocket_port = WS.socketId();

      console.log(this.ActiveUsers);
    }, 1000);
  }

  JoinAnUser(user: any) {
    this.ActiveUsers.push(user);
    console.log(this.ActiveUsers);
  }

  LeaveAnUser(user: any) {
    this.ActiveUsers.filter((item: any) => {
      return item.id !== user.id;
    });
    console.log(this.ActiveUsers);
  }

  userlist: any[] = [];
  getChatUserlist() {
    let name = '';
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
            let apistatus: any = response.body;
            if (apistatus.status == 200) {
              this.userlist = apistatus.data;
            }
        }
      }
    );
  }
}
