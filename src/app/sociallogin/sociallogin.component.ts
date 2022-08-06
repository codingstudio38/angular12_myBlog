import { Component, OnInit } from '@angular/core';
import {  FacebookLoginProvider,GoogleLoginProvider,SocialAuthService,SocialUser } from "angularx-social-login";
declare var jQuery: any;

@Component({
  selector: 'app-sociallogin',
  templateUrl: './sociallogin.component.html',
  styleUrls: ['./sociallogin.component.css']
})
export class SocialloginComponent implements OnInit {
  loggedIn: boolean=false;
  username:string="";
  userid:string="";  
  useremail:string="";
  userphoto:string="";
  provider:string="";
  constructor(private authService: SocialAuthService) { 
  }

  ngOnInit(): void {
      this.authService.authState.subscribe((user) => {
         console.clear();  
        // console.log(user);
      if(user!==null){
        this.loggedIn=true;
        this.username = user.name;
        this.useremail = user.email;
        this.userid = user.id;
        this.userphoto = user.photoUrl;
        this.provider = user.provider;
      } else{
         this.loggedIn=false;
      }
    });
  } 

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (res)=>{
        console.clear();
       console.log(res); return;
      this.username = res.name;
      this.useremail = res.email;
      this.userid = res.id;
      this.userphoto = res.photoUrl;
      this.provider = res.provider;
      this.loggedIn=true;
      }
    );
  }  

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (res)=>{
      console.clear();
      // console.log(res);
      this.username = res.name;
      this.useremail = res.email;
      this.userid = res.id;
      this.userphoto = res.response.picture.data.url;
      this.provider = res.provider;
      this.loggedIn=true;
      }
    );
  }

  googleSignOut(): void {
    this.authService.signOut();
    this.loggedIn=false;
    this.username = "";
    this.useremail = "";
    this.userid = "";
    this.userphoto = "";
    this.provider ="";
    console.clear();
  }
}
