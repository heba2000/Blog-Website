import { AuthorProfileComponent } from './components/author-profile/author-profile.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { AuthorizationGuard } from './gaurds/authorization.guard';
import { MainComponent } from './components/main/main.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:MainComponent , children:[  
      {path:'', component:HomeComponent},
      {path:'home', component:HomeComponent},
      {path:'home/postDetails/:id',component:PostPageComponent},
      {path:'home/authorProfile/:id', component:AuthorProfileComponent ,
      canActivate : [AuthorizationGuard]
      },
      {path:'profile',component:UserProfileComponent, 
      canActivate : [AuthorizationGuard]
      },
      {path:'profile/postDetails/:id',component:PostPageComponent},
      {path:'profile/EditPost/:id',component:EditPostComponent},
      {path:'addPost', component:CreatePostComponent ,
      canActivate : [AuthorizationGuard]
      }
  ]},


  {path:'sign-up', component:SignUpComponent},
  {path:'sign-in', component:SignInComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
