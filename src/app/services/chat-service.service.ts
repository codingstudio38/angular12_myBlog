import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { RegisterApiServiceService } from '../services/register-api-service.service';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private APIservice: RegisterApiServiceService,) { }
  private websocketvar: any = false;

  websocketFN() {
    this.websocketvar = new Echo({
      broadcaster: 'pusher',
      key: environment.wskey,
      cluster: environment.wscluster,
      // wsHost: window.location.hostname, // this also work
      wsHost: environment.wsHost,// this also work
      wsPort: environment.wsPort,
      forceTLS: environment.wsforceTLS,
      disableStats: true,
      enabledTransports: ['ws'],
      authEndpoint: `${environment.apiUrl}/custom/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${this.APIservice.loggedinuserdata().token}`,
        }
      }
    });
  }

  websocket(): Echo {
    return this.websocketvar;
  }



}
