import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
import { ChatServiceService } from '../../services/chat-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $:any;
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  constructor(
    private APIservice: RegisterApiServiceService,
    private chatservice: ChatServiceService
  ) { }

  envdata: any = environment;

  loggedinuserdata: any =
    this.APIservice.loggedinuserdata() !== 0
      ? this.APIservice.loggedinuserdata().userData
      : { id: '', name: '', email: '' };
  wsdata: any = '';
  ngOnInit(): void {
    this.chatservice.websocketFN();
    setTimeout(() => {
      this.websocket();
    }, 1000);
    this.getChatUserlist();
  }
  ActiveUsers: any[] = [];
  user_websocket_port: any = '';
  websocket(): any {
    const WS: any = this.chatservice.websocket();
    WS.join('trackUserPresenceChatChannel') //channelname
      .here((user: any) => {
        this.getActiveUserlist();
      })
      .joining((user: any) => {
        this.JoinAnUser(user);
        this.getActiveUserlist();
        console.log('joining', user);
      })
      .leaving((user: any) => {
        this.LeaveAnUser(user);
        this.getActiveUserlist();
        console.log('leaving', user);
      })
      .listen('UserPresenceChatChannel', (event: any) => {
        //eventname
        this.wsdata = event;
      })
      .error((error: any) => {
        console.log('error', error);
      });
    // console.log(WS.connector.pusher);
    // console.log(WS.connector.pusher.channels.channels['presence-track-public-channel'].members);
    // https://github.com/tald7344/laravel-ngrx-ecommerce/tree/websocket
    WS.channel('public-channel')//for public channel
      .listen('Publicchannel', (event: any) => {
        console.log('data', event);
        this.wsdata = event;
      })
      .error((e: any) => {
        console.log('error', e);
      });
    this.user_websocket_port = WS.socketId();
  }

  JoinAnUser(user: any) {

  }

  LeaveAnUser(user: any) {

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


  getActiveUserlist() {
    const f = new FormData();
    f.append('channelname', 'presence-trackUserPresenceChatChannel');
    this.APIservice.CallCommonPOSTSrFn(f, '/myblog/access/active-user-list').subscribe(
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
              this.ActiveUsers = apistatus.users;
              // console.log(this.ActiveUsers);
              this.checkOnlineOrOfflineArr();
            } else {
              console.clear();
              console.error(apistatus);
            }
        }
      }
    );
  }


  checkOnlineOrOfflineArr() {
    // console.log(this.userlist);
    setTimeout(()=>{
    this.userlist.forEach((item: any) => {
       if(this.checkuserId(item.id)){
        $(`#activeuser_${item.id}`).css('display','block');
        $(`#deactivateuser_${item.id}`).css('display','none');
       } else{
        $(`#activeuser_${item.id}`).css('display','none');
        $(`#deactivateuser_${item.id}`).css('display','block');
       }
    })
    },500)
  }
  checkuserId(id: any): boolean {
    let check: boolean = false;
    // console.log(this.ActiveUsers);
    this.ActiveUsers.forEach((item: any) => {
      if (item.userid == id) {
        check = true;
      }
    })
    return check;
  }






}
