import { EditPostComponent } from './components/edit-post/edit-post.component';
import { MaxLengthPipe } from './pipes/stringMaxLengthPipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule} from '@angular/common/http';
import { SignUpComponent} from './components/sign-up/sign-up.component'
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainComponent } from './components/main/main.component';

import { CommonModule } from '@angular/common';
import { AuthorProfileComponent } from './components/author-profile/author-profile.component';  

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostPageComponent,
    UserProfileComponent,
    CreatePostComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    MaxLengthPipe,
    MainComponent,
    EditPostComponent,
    AuthorProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
