import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class RegisterApiServiceService {

  apiUrl = 'http://127.0.0.1:8000';
  bearerToken = "Bearer Cy5YBGTEwOCpSkilwp1rLqswinPFLmpTThgz99mVTMNO7kUw33ABUfPLB1MC";
  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  checkuserIsloggedin(): boolean {
    if (!this.cookieService.get('myUserid')) {
      return false;
    } else {
      return true;
    }
  }

  Loginis: any;
  loggedinuserdata() {
    this.Loginis = localStorage.getItem("userData");
    if (this.Loginis !== null && this.Loginis !== undefined) {
      return JSON.parse(this.Loginis);
    } else {
      return 0;
    }
  }

  ///////////////////////////// new register services start/////////////////////////////////
  newRegister(data: any) {
    return this.http.post(this.apiUrl + '/myblog/newRegister', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', this.bearerToken)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  ///////////////////////////// new register services end/////////////////////////////////

  ///////////////////////////// login services start/////////////////////////////////


  loginVerify(data: any) {
    return this.http.post(this.apiUrl + '/myblog/loginVerify', data, {
      headers: new HttpHeaders().set('Authorization', this.bearerToken)
    });
  }

  ///////////////////////////// login services end/////////////////////////////////


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Get client-side error\n${error.error.message}`;
    } else {
      errorMessage = `Get server-side error\nError Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }


  loggedin_userdata() {
    return [
      {
        'userid': this.cookieService.get('myUserid'),
        'email': this.cookieService.get('myEmail'),
        'userPhone': this.cookieService.get('myUserPhone'),
        'userName': this.cookieService.get('userName')
      }
    ]
  }

  ///////////////////////////user-class1 start///////////////////////////
  newpost(data: any) {
    return this.http.post(this.apiUrl + '/myblog/access/demotest', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  getalldata() {
    return this.http.get(this.apiUrl + '/myblog/access/alldata', {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  gettbldata(num: number) {
    return this.http.get(this.apiUrl + `/myblog/access/viewalltbldata?page=${num}`, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  usersearch(id: any) {
    return this.http.get(this.apiUrl + '/myblog/access/usersearch/' + id, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  updateUser(data: any) {
    return this.http.post(this.apiUrl + '/myblog/access/userupdate', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  userdelete(id: any) {
    return this.http.delete(this.apiUrl + '/myblog/access/userdelete/' + id, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  ///////////////////////////user-class1 end///////////////////////////










  ///////////////////////////user-class2 end///////////////////////////
  mutiplesPost(data: any) {
    return this.http.post(this.apiUrl + '/myblog/access/uploadmultiples', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  viewallmultidata() {
    return this.http.get(this.apiUrl + '/myblog/access/viewallmultidata', {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  multiusersearch(id: any) {
    return this.http.get(this.apiUrl + '/myblog/access/multiusersearch/' + id, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  mutiplesUpdate(data: any) {
    return this.http.post(this.apiUrl + '/myblog/access/updatemultiples', data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  ///////////////////////////user-class2 end///////////////////////////



  ///////////////////logout start//////////////////////////////
  logout() {
    return this.http.get(this.apiUrl + '/myblog/access/logout', {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.loggedinuserdata().token}`)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  ///////////////////logout end//////////////////////////////

}
