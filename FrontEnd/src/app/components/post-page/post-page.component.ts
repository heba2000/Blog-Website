import { environment } from './../../../environments/environment.prod';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/postModel';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  constructor(private _postService:PostService , private activeRouter:ActivatedRoute) { }
  post:Post = new Post();
  imgSplit:any ='';
  env = environment
  
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe( params => {
      this._postService.getByID(params.get('id')).subscribe(
       (response:any)=>{
         this.post = response.Data;
         this.imgSplit =  `${this.env.apiUrl}/uploads/${this.post.image.split('uploads\\')[1]}`;
        console.log(this.imgSplit)
       },
       (error) => { alert("error") } 
      )
    })
   
  }

}
