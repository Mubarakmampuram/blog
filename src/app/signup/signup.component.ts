import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms' ;
import { ApiService } from '../service/api.service';
import { Usermodel } from './signup.user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit { 
  signupForm !: FormGroup;
  userModelObj :Usermodel = new Usermodel();
  
 
  constructor(private formbuilder: FormBuilder,
    private api : ApiService,private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      fullname :[''],
      email :[''],
      password :['']
     
    })
    
  }
 
  signUp(){
    this.userModelObj.fullname = this.signupForm.value.firstName;
    this.userModelObj.email = this.signupForm.value.email;
    this.userModelObj.password = this.signupForm.value.password;

    this.api.registerUser(this.userModelObj)
    .subscribe(res=>{
      console.log(res);
      alert(" Succesfully Registered");
      this.router.navigate(['login'])
      
      
      
    })
   
  
  }
}