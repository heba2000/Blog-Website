import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postModel';
import { PostService } from '../../services/post.service'
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts:Post[]=[];
  searchRetrievedPosts:number = 0;
  env = environment;
  page:number = 2;
  constructor(private _postService:PostService) {}

  ngOnInit(): void {
    this. _postService.get().subscribe(
      (response:any) =>{
        this.posts = response.Data;
      },
      (error)=> {alert("error")}
    )
  }

  searchPosts(searchTerm:string){
    this._postService.searchPost(searchTerm).subscribe(
      (response:any) =>{
        this.posts = response.Data;
        this.searchRetrievedPosts = this.posts.length;
      },
      (error)=> {alert("error",)}
    )
  }

  getOlderPosts(){
    this._postService.getByPagination(this.page).subscribe(
      (response:any) => {
        this.posts = [...this.posts ,...response.Data ]
        console.log(this.posts.length , response.Data.length)
      },
      (error)=> {alert("error")},
      () => { this.page++ , console.log(this.page)} 
    )
  }
}
