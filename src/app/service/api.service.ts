import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  registerUser(data : any){
    return this.http.post<any>("http://localhost:3000/signupUsers",data)
   
  }

  loginUser(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data)
  }
  createNewPost(data:any){
    return this.http.post<any>("http://localhost:3000/blogs",data)
  }
  getPosts(){
    return this.http.get<any>("http://localhost:3000/blogs")
    
    
  }
  updatePosts(data :any,id: number){
    return this.http.put<any>("http://localhost:3000/blogs/"+id,data)
    
  }
  deletePosts(id : number){
    return this.http.delete<any>("http://localhost:3000/blogs/"+id)
    
  }

  
}
