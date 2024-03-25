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



currentDateTime(dateIs:any) {
  const now = dateIs==false?new Date():new Date(dateIs);
  let year:any = now.getFullYear();
  let month:any = now.getMonth() + 1;
  let dateis:any = now.getDate();
  let h:any = now.getHours();
  let m:any = now.getMinutes();
  let s:any = now.getSeconds();
  if (dateis <= 9) {
    dateis = `0${dateis}`;
} else {
  dateis = dateis;
}
  if (month <= 9) {
      month = `0${month}`;
  } else {
      month = month;
  }
  if (h <= 9) {
    h = `0${h}`;
  } else {
    h = h;
  }
  if (m <= 9) {
    m = `0${m}`;
  } else {
    m = m;
  }
  if (s <= 9) {
    s = `0${s}`;
  } else {
    s = s;
  }
  let date:any = `${now.getFullYear()}-${month}-${dateis}`;
  let reverse_date:any = `${dateis}-${month}-${now.getFullYear()}`;
  let time:any = `${h}:${m}:${s}`;//:${now.getMilliseconds()}
  let HM:any = `${h}:${m}`;
  let hour = (time.split(':'))[0]
  let min = (time.split(':'))[1]
  let part = hour > 11 ? 'PM' : 'AM';
  if(parseInt(hour) == 0)
  hour = 12;
  min = (min+'').length == 1 ? `0${min}` : min;
  hour = hour > 12 ? hour - 12 : hour;
  hour = (hour+'').length == 1 ? `0${hour}` : hour;
  const monthName = now.toLocaleString('default', { month: 'long' });
return {
  reverse_date:reverse_date,
  date:date,
  time:time,
  HM:HM,
  time_convert:`${hour}:${min} ${part}`,
  part:part,
  year:year,
  month:month,
  monthName:monthName,
  current_date:dateis,
};
}






}
