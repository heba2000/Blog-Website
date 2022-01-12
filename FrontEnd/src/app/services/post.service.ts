import { Post } from './../models/postModel';
import {HttpHeaders} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';


@Injectable({
  providedIn: 'root'
})

export class PostService {
  constructor(private _api:ApiService , private _http:HttpClient) { 
    this.userToken = localStorage.getItem('userToken');
  }
  userToken:any;

  get(){
    return this._api.get(`/Home`)
  }
  getByPagination(page:number){
    return this._api.get(`/Home/?page=${page}&size=5`)
  }
  searchPost(term:string){
    return this._api.get(`/Home/search/${term}`)
  }
  getByID(id:string|null){
    return this._api.get(`/Home/${id}`)
  }
  
  post(post:any){
    return this._api.postUsingToken(`/posts`, post)
  }

  getUserPosts(){
    return this._api.getUsingToken(`/posts`)
  }

  deleteByID(id:string | null){
      return this._api.deleteUsingToken(`/posts/${id}`)
  }
  
  putByID(id:string | null , post:any){
    return this._api.put(`/posts/${id}`,post)
  }

  getAuthorPosts(id:string | null){
    return this._api.get(`/Home/authorPosts/${id}`)
  }

}

