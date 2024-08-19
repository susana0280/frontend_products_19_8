import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { IUser } from '../../models/user.models';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  user?:IUser 

  authForm!:FormGroup
  private _auth=inject(AuthService)
  private _router=inject(Router)



  constructor(private formBuilder:FormBuilder){

    this.authForm=formBuilder.group({

      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(3)]]

      })
  }

  enviar(event:Event){
 
    event.preventDefault();
   
  }

  signUp(){
  
   this.user={
      email:this.authForm.value.email,
      password:this.authForm.value.password

    }
    
  
    this._auth.signUp(this.user).subscribe((data:any)=>{
     
      localStorage.setItem('token',data)
       this._router.navigate(['/management'])

    })
  }

  hasError(controlName:string,errorType:string){
    
    return this.authForm.get(controlName)?.hasError(errorType) && this.authForm.get(controlName)?.touched
  }

}
