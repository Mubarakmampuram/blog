import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms' ;
import { ApiService } from '../service/api.service';
import { Blogmodel } from './blog.user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  formvalue !:FormGroup

  createBlogForm !: FormGroup;
  blogData !:any;
  blogModelObj :Blogmodel = new Blogmodel();
  constructor(private formbuilder: FormBuilder,
    private api : ApiService,private router : Router) { }
  ngOnInit(): void {
    this.createBlogForm = this.formbuilder.group({
      title :[''],
      description :[''],
      content :['']
     
    })
    this.getAllBlogs();
  }
  addBlog(){
    this.blogModelObj.title = this.createBlogForm.value.title;
    this.blogModelObj.description = this.createBlogForm.value.description;
    this.blogModelObj.content = this.createBlogForm.value.content;
    this.api.createNewPost(this.blogModelObj)
    .subscribe(res=>{
      console.log(res);
      alert(" Succesfully Added");
      let ref = document.getElementById("cancel")
      ref?.click();
      this.formvalue.reset();
      this.getAllBlogs();
      
      
      
      
    })
  }
  getAllBlogs(){
    this.api.getPosts()
    .subscribe(res => {
      this.blogData = res ;
    })
  }

}
