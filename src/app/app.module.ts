import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
//import { NgxTweetModule } from "ngx-tweet";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { SocialloginComponent } from './sociallogin/sociallogin.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { CustomSrcPipe } from './healperpipe/custom-src.pipe';
import { HeaderSearchBoxComponent } from './header-search-box/header-search-box.component';
import { MyblogComponent } from './myblog/myblog.component';
import { MyNewBlogComponent } from './my-new-blog/my-new-blog.component';
//import {InfiniteScrollModule} from 'ngx-infinite-scroll';
// import { HighchartsChartModule } from 'highcharts-angular';
// import * as echarts from 'echarts';
// import { NgxEchartsModule } from 'ngx-echarts';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    GalleryComponent,
    SigninComponent,
    SignupComponent,
    SocialloginComponent,
    CustomSrcPipe,
    HeaderSearchBoxComponent,
    MyblogComponent,
    MyNewBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTwitterTimelineModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    //InfiniteScrollModule,
    //NgxEchartsModule.forRoot({ echarts }),
  ],
  exports: [
    //HeaderComponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '405380673874-016n2egv9cukde6bvm3k2tijpmios0ve.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('589535416126606'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
