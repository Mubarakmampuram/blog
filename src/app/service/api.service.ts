import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  registerUser(data : any){
    return this.http.post<any>("http://localhost:3000/register",data)
   
  }

  loginUser(data:any){
    return this.http.post<any>("http://localhost:3000/login",data)
  }

  
}
