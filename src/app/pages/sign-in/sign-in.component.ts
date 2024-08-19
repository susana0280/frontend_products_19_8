import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import { IUser } from '../../models/user.models';
import { error } from 'console';



@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {


  user?:IUser;

  _router=inject(Router)
  _auth=inject(AuthService)

 
  authForm!:FormGroup
  
  constructor(private formBuilder:FormBuilder){

    this.authForm=formBuilder.group({

      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.minLength(3)]]

      })

  }

  enviar(event:Event){
 
    event.preventDefault();
   
  }


  signIn(){
    
    
    this.user={
      email:this.authForm.value.email,
      password:this.authForm.value.password
    }
    console.log(typeof localStorage)
    this._auth.signIn(this.user).subscribe({
    
      next: (data:any )=> {
        localStorage.setItem('token',data.token)
        this._router.navigate(['/management'])
      },
      error: (err: string) =>alert("usuario no existe")
      
    }
   
  )

  }


  hasError(controlName:string,errorType:string){
    
    return this.authForm.get(controlName)?.hasError(errorType) && this.authForm.get(controlName)?.touched
  }

}


