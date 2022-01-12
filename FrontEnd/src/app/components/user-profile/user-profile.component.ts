import { environment } from './../../../environments/environment.prod';
import { NewUser } from './../../models/newUserModel';
import { UserServiceService } from './../../services/user-service.service';
import { Post } from 'src/app/models/postModel';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  posts:Post[] = [];
  postsLength:number = 0;
  loggedUser:NewUser = new NewUser();
  env = environment;
  
  constructor(private _postService:PostService , private _userService:UserServiceService){}

  ngOnInit(): void {
    this. _postService.getUserPosts().subscribe(
      (response:any) =>{
        this.posts = response.Data;
        this.postsLength = this.posts.length;
      },
      (error)=> {alert("error",)},
      ()=>{ console.log("compelete")}
    )
  
    this. _userService.getUserDetails().subscribe(
      (response:any) =>{
        this.loggedUser = response.Data;
        console.log(this.loggedUser)
      },
      (error)=> {alert("error",)},
      ()=>{ console.log("compelete")}
    );
  }

  deletePost(index:number){
      let postToDelete =  this.posts[index]
      console.log(postToDelete._id)
      this._postService.deleteByID(postToDelete._id).subscribe(
        (response:any) => {
          console.log(response)
          if(response.Success)
          {
            this.posts.splice(index,1); 
          }
          else 
          { console.error(); }
        },
        (error)=>{
          console.log("delete error");
        }

      )

    } 
  }

