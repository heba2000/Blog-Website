import { PostService } from './../../services/post.service';
import { NewUser } from 'src/app/models/newUserModel';
import { AuthorService } from './../../services/author.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postModel';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit {
  posts:Post[] = [];
  postsLength:number = 0;
  author:NewUser = new NewUser();
  env = environment;

  constructor(private _authorService:AuthorService , private _activeRouter:ActivatedRoute ,private _postService:PostService) { }

  ngOnInit(): void {

    this._activeRouter.paramMap.subscribe( params => {
      this._authorService.getAuthorDetails(params.get('id')).subscribe(
        (response:any)=>{
          this.author = response.Data;
        },
        (error) =>{
          alert("Error in author details")
        },
        () => { 
          console.log("Complete");
          this.getPosts(this.author._id);
        }

      ) }) 
  }

  getPosts(id:string){
    this._postService.getAuthorPosts(id).subscribe(
      (response:any) =>{
        this.posts = response.Data;
        this.postsLength = this.posts.length;
      },
      (error)=> {alert("error",)},
      ()=>{ console.log("compelete")}
    )
  }
}
  

