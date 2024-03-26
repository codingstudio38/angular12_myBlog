import { Component, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
import { ChatServiceService } from '../../services/chat-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
interface currentChatuserObj {
  id: any,
  name: any,
  email: any,
  phone: any,
  photo: any
};
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
  chatmessage: any = '';
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
  user_websocket_id: any = '';
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
        // console.log(event);
        if (event.data.datainfo.code = 100) {
          this.onNewMessage(event.data.data)
        }

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
    this.user_websocket_id = WS.socketId();
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
    setTimeout(() => {
      this.userlist.forEach((item: any) => {
        if (this.checkuserId(item.id)) {
          $(`#activeuser_${item.id}`).css('display', 'block');
          $(`#deactivateuser_${item.id}`).css('display', 'none');
        } else {
          $(`#activeuser_${item.id}`).css('display', 'none');
          $(`#deactivateuser_${item.id}`).css('display', 'block');
        }
      })
    }, 500)
  }
  checkuserId(id: any): boolean {
    let check: boolean = false;
    // console.log(this.ActiveUsers);
    this.ActiveUsers.forEach((item: any) => {
      if (item.id == id) {
        check = true;
      }
    })
    return check;
  }

  currentChatuser: currentChatuserObj = {
    id: '', name: '', email: '', phone: '', photo: ''
  };
  totalchatofcurrentuser: any = '';
  chatofcurrentuser: any[] = [];
  setcurrentChatandStart(user: any) {
    const f = new FormData();
    f.append('from', this.loggedinuserdata.id);
    f.append('to', user.id);
    this.APIservice.CallCommonPOSTSrFn(f, '/myblog/access/user-chat-list').subscribe(
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
              // console.log(apistatus);
              this.totalchatofcurrentuser = apistatus.total;
              this.chatofcurrentuser = apistatus.data;
              this.currentChatuser = {
                id: user.id, name: user.name, email: user.email, phone: user.phone, photo: user.photo
              };
              $('.chat_people').removeClass('active_chat');
              $(`#chat_people${user.id}`).addClass('active_chat');
              $(`#chat_date_${user.id}`).html(``);
              $(`#unsceendiv_${user.id}`).html(``);

              setTimeout(() => {
                const element = $('#msg_history');
                element.animate({
                  scrollTop: element.prop("scrollHeight")
                }, 500);
              }, 500)
            }
        }
      }
    );


  }



  SendChat(): any {
    if (this.currentChatuser.id == '') {
      alert("Please select an user.");
      return false;
    }
    if (this.chatmessage == '') {
      $("#chatmessage").focus();
      return false;
    }

    const f = new FormData();
    f.append('from', this.loggedinuserdata.id);
    f.append('to', this.currentChatuser.id);
    f.append('chat_type', '0');//single_chat_group_chat/0=single,1=group	
    f.append('message', this.chatmessage);
    f.append('chat_file', '');
    this.APIservice.CallCommonPOSTSrFn(f, '/myblog/access/save-new-message').subscribe(
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
              this.chatmessage = '';
              this.chatofcurrentuser.push(apistatus.data);
              const element = $('#msg_history');
              element.animate({
                scrollTop: element.prop("scrollHeight")
              }, 500);
              // console.log(apistatus);
            } else {
              console.error(apistatus);
            }
        }
      }
    );

  }


  onNewMessage(data: any) {
    this.totalchatofcurrentuser = this.totalchatofcurrentuser + 1;
    // console.log(data,this.loggedinuserdata.id);
    if (data.to_ == this.loggedinuserdata.id) {
      const audio = new Audio(`${this.envdata.websiteUrl}assets/sound/Messenger_Notification.mp3`);
      audio.play();
      if (data.from_ == this.currentChatuser.id) {
        this.chatofcurrentuser.push(data);
        const element = $('#msg_history');
        element.animate({
          scrollTop: element.prop("scrollHeight")
        }, 500);
        this.updatechatreadstatus(data.from_, data.to_, data.id);
      } else {
        this.getnoofunseenchat(data.from_, data.to_);
      }

    }
  }

  getnoofunseenchat(from: any, to: any) {
    const f = new FormData();
    f.append('from', from);
    f.append('to', to);
    this.APIservice.CallCommonPOSTSrFn(f, '/myblog/access/get-no-of-unseen-chat').subscribe(
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
              let date = this.chatservice.currentDateTime(apistatus.data.created_at);
              $(`#chat_date_${apistatus.data.from_}`).html(`${date.current_date} ${date.monthName}, ${date.time_convert}`);
              $(`#unsceendiv_${apistatus.data.from_}`).html(
                `<p id="unsceenp_${apistatus.data.from_}">${this.textlength(apistatus.data.message,15)} </p>
                  <span id="unsceenspan_${apistatus.data.from_}" style="width: 60px;"class="btn btn-danger btn-sm">${apistatus.total} New</span>`
              );
            } else {
              console.error(apistatus);
            }
        }
      }
    );
  }

textlength(text:any, l:any){
  if(text=="" || text== null){
    return text;
  } else if(text.length > l){
return text.substring(0, l)+'...';
  } else {
return text;
  }
}


  updatechatreadstatus(from: any, to: any, id: any) {
    const f = new FormData();
    f.append('from', from);
    f.append('to', to);
    f.append('id', id);
    this.APIservice.CallCommonPOSTSrFn(f, '/myblog/access/update-chat-read-status').subscribe(
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
              console.log(apistatus);
            } else {
              console.error(apistatus);
            }
        }
      }
    );
  }








}
