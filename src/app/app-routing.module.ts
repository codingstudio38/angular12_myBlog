import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { SocialloginComponent } from './sociallogin/sociallogin.component';
import { MyblogComponent } from './myblog/myblog.component';
import { MyNewBlogComponent } from './my-new-blog/my-new-blog.component';
const routes: Routes = [
  {  
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutComponent },
  { path: 'contactus', component: ContactComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sociallogin', component: SocialloginComponent },
  { path: 'myblog', component: MyblogComponent },
  { path: 'blog', component: MyNewBlogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
