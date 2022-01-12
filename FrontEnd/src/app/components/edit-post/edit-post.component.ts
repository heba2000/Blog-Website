import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { Post } from 'src/app/models/postModel';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editPostForm:FormGroup = new FormGroup({});
  env = environment
  post :Post = new Post(); 
  imagePreview:any;
  recievedImage:any;

  tagsArray:string[] =[];
  postID:any ;
  updatedPost:Post = new Post();

  constructor(private _formBuilder:FormBuilder , private _router:Router , private _postService:PostService ,private _activeRouter:ActivatedRoute ,private _cdref:ChangeDetectorRef) { }

  ngOnInit(): void {
    this._activeRouter.paramMap.subscribe( params => {
      this._postService.getByID(params.get('id')).subscribe(
        (response:any)=>{ 
          this.post = response.Data;
          this.recievedImage = `${this.env.apiUrl}/${this.post.image}`
          this.postDetails(this.post.tags ,this.post.image , params.get('id') );
          this.editPostForm.patchValue({title:this.post.title , postBody:this.post.postBody})
        },
        (error) => { alert("error") } 
      ) 
    })

    this.editPostForm = this._formBuilder.group({
      title:['', [Validators.required , Validators.minLength(3)]],
      postBody:['', [Validators.required , Validators.minLength(3) ]],
      tags:[null, Validators.minLength(3)] ,
      image:[''], 
    })
  
  }
  addtags(){
    this.tagsArray.push(this.editPostForm.value.tags);
    console.log(this.editPostForm.value)
  }
  splicetags(index:number){
    this.tagsArray.splice(index,1);
    console.log(this.tagsArray)
  }

  selectImage(event:any){
    const file = event.target.files[0];
    this.editPostForm.patchValue({ image: file });
    this.editPostForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
}
  postDetails(tags:string[] , img:String , id:string|null ){
    this.tagsArray = this.post.tags
    this.postID = id;
  }

  EditPost(){
    const postData = new FormData();
    postData.append('title', this.editPostForm.value.title);
    postData.append('postBody', this.editPostForm.value.postBody);
    for (let tag of this.tagsArray) {
      postData.append('tags[]', tag);
    }
    if (this.imagePreview!= '')
    {
        postData.append('image',this.editPostForm.value.image) ;
    } 

      this._postService.putByID(this.postID, postData).subscribe(
        (response:any) => 
        {
          console.log(response) 
        },
        (error) => {
          console.log(error) 
        },
        ()=> 
        {
          this._router.navigate([`/profile/postDetails/${this.post._id}`])
        }
      )
  }
}
