import { environment } from './../../environments/environment.prod';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userToken:any;

  constructor( private _http:HttpClient) {
    this.userToken = localStorage.getItem('userToken');
  }
  // getHeaders():HttpHeaders{
  //   let headers = new HttpHeaders();
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization': this.userToken
  //     })
  //   }; 

  // return httpOptions
  // }
  
  get(url:string){
    return this._http.get(`${environment.apiUrl}${url}`);
  };

  post(url:string , body:any){
    return this._http.post(`${environment.apiUrl}${url}`,body);    
  };

  put(url:string , body:any){
    let headers = new HttpHeaders();
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': this.userToken
      })
    };
    return this._http.patch(`${environment.apiUrl}${url}`, body, httpOptions)   
  };

  deleteUsingToken(url:string){
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': this.userToken
      })
    };
    return this._http.delete(`${environment.apiUrl}${url}`,httpOptions);    
  };

  getUsingToken(url:string){
    let headers = new HttpHeaders();
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.userToken
        })
      };
    return this._http.get(`http://localhost:3000${url}`, httpOptions)
  }   

  postUsingToken(url:string , body:any) {
    let headers = new HttpHeaders();
      const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': this.userToken
        })
      };
    return this._http.post(`http://localhost:3000${url}`, body ,httpOptions)
  }   


  };


