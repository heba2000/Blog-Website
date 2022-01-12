import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/postModel';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm:FormGroup = new FormGroup({});
  newPost :Post = new Post(); 
  imagePreview:any;
  tagsArray:string[] =[];
  env = environment;
  constructor(private _formBuilder:FormBuilder , private _router:Router , private _postService:PostService) { }

  ngOnInit(): void {
    this.createPostForm = this._formBuilder.group({
      title:['', [Validators.required , Validators.minLength(3)]],
      postBody:['', [Validators.required , Validators.minLength(3) ]],
      tags:['' , Validators.minLength(3)] ,
      image:['',[Validators.required]], 
    })
  
  }

  selectImage(event:any){
    const file = event.target.files[0];
    this.createPostForm.patchValue({ image: file });
    this.createPostForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
}

addtags(){
  this.tagsArray.push(this.createPostForm.value.tags);
  console.log(this.tagsArray)
}
splicetags(index:number){
  this.tagsArray.splice(index,1);
  console.log(this.tagsArray)
}

  addNewPost(){
    const postData = new FormData();
    postData.append('image',this.createPostForm.value.image ,this.createPostForm.value.title) ;
    postData.append('title', this.createPostForm.value.title);
    postData.append('postBody', this.createPostForm.value.postBody);
    for (let tag of this.tagsArray) {
      postData.append('tags[]', tag);
    }

    this._postService.post(postData).subscribe(
      (response:any) => 
      {
        this.newPost = response.Data;
         console.log(this.newPost) 
      },
      (error) => {
         console.log(error) 
      },
      ()=> 
      {
         this._router.navigate([`/profile/postDetails/${this.newPost._id}`]);   //to redirect to the post page ofter creation 
         console.log("Compelete") 
      }
    )
  }

}
