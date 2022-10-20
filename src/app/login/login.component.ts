import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms' ;
import { ApiService } from '../service/api.service';
import { Loginmodel } from './login.user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  loginModelObj :Loginmodel = new Loginmodel();
  
 
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      
      email :[''],
      password :['']
     
    })
    
  }
 
  login(){
    
    this.loginModelObj.email = this.loginForm.value.email;
    this.loginModelObj.password = this.loginForm.value.password;

    this.api.loginUser(this.loginModelObj)
    .subscribe(res=>{
      console.log(res);
      alert(" Succesfully Registered")
      
      
      
    })
   
  
  }

}
