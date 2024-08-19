import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgClass],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  

  formContact!:FormGroup

  constructor(private formBuilder:FormBuilder){
    this.formContact=formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      message:["",[Validators.required,Validators.minLength(10)]]
    })
    

  }


  ngOnInit(): void {
   
  }



  enviar(event:Event){
    event.preventDefault()
  console.log(this.formContact)
  }

  hasError(name:string,typeError:string){
    //console.log(this.formContact.get(name)?.touched)
    return this.formContact.get(name)?.hasError(typeError) && this.formContact.get(name)?.touched
  }

}
