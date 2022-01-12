import { Injectable } from '@angular/core';
import { ApiService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private _api:ApiService) { }

  getAuthorDetails(id:string|null){
    return this._api.get(`/Home/author/${id}`)
  }
}
