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
  showAdd !: boolean;
  showUpdate !: boolean; 

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
      this.createBlogForm.reset();
      this.getAllBlogs();
      
      
      
      
    })
  }
  getAllBlogs(){
    this.api.getPosts()
    .subscribe(res => {
      this.blogData = res ;
    })
  }
  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.blogModelObj.id = row.id; 
    this.createBlogForm.controls['title'].setValue(row.title)
    this.createBlogForm.controls['description'].setValue(row.description)
    this.createBlogForm.controls['content'].setValue(row.content)

    
  }
  deleteBlog(row:any){
    this.api.deletePosts(row.id)
    .subscribe(res => {
      console.log(res);
      alert("Blog Deleted");
      this.getAllBlogs();
    })
  }
  clickCreatePost(){
    this.createBlogForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  updateBlog(){
    this.blogModelObj.title = this.createBlogForm.value.title;
    this.blogModelObj.description = this.createBlogForm.value.description;
    this.blogModelObj.content = this.createBlogForm.value.content;
   
    this.api.updatePosts(this.blogModelObj,this.blogModelObj.id)
    .subscribe(res => {
      alert("Updated Succesfully");

      let ref = document.getElementById("cancel")
      ref?.click();
      this.createBlogForm.reset();
      this.getAllBlogs();
    })

  }

}
