import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IProducts } from '../../models/product.model';
import { Router } from '@angular/router';
import { ProductServService } from '../../services/product-serv.service';


@Component({
  selector: 'app-management',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {

  managementForm!:FormGroup

  private _router=inject(Router)
  _http=inject(ApiService)
  _productServ=inject(ProductServService)
  
  newProduct?:IProducts;
  updateProd?:IProducts;
 menuOption:string=""

  constructor(private formBuilder:FormBuilder){
    this.updateProd=this._productServ.getProductUpdate()
  
   
   this.managementForm=formBuilder.group({
             
        title:[this.updateProd?.title,[Validators.required,Validators.minLength(3)]],
        price:[this.updateProd?.price,Validators.required],
        description:[this.updateProd?.description,[Validators.required,Validators.minLength(6)]],
        category:[this.updateProd?.category,[Validators.required,Validators.minLength(6)]],
        image:[this.updateProd?.image,Validators.required],
        rate:[this.updateProd?.rating.rate,Validators.required],
        count:[this.updateProd?.rating.count,Validators.required],


      })
         
     
        }


  enviar(event:Event){

    event.preventDefault();
   
  }

  onOption(menuOption:string){
    this.menuOption=menuOption
   
  }


  ngOnInit(): void {
    

      }

  postProduct(){
 
    this.newProduct={
      _id:"",
      __v:0,
      title:this.managementForm.value.title,
      price:this.managementForm.value.price,
      description:this.managementForm.value.description,
      category:this.managementForm.value.category,
      image:this.managementForm.value.image,
      rating:{
        rate:this.managementForm.value.rate,
        count:this.managementForm.value.count
      }
      
    }

    this._http.postProduct(this.newProduct).subscribe((data:any)=>{
      this._router.navigate(['products'])
     })
  }


  updateProduct(){
  
   
  
    if(this.updateProd){
      
      this.newProduct={
      _id:"",
      __v:0,
      title:this.managementForm.value.title,
      price:this.managementForm.value.price,
      description:this.managementForm.value.description,
      category:this.managementForm.value.category,
      image:this.managementForm.value.image,
      rating:{
        rate:this.managementForm.value.rate,
        count:this.managementForm.value.count
       }
      
      }
     
    
    this._http.updateProduct(this.updateProd._id,this.newProduct).subscribe((data:any)=>{
    
      this._router.navigate(['products'])
    })

    if(!this.updateProd){
      this._router.navigate(['products'])
      } 
    }

    
  }


  deleteProduct(){
    if(this.updateProd){
    this._http.deteleProduct(this.updateProd?._id).subscribe((data:any)=>{
      this._router.navigate(['products'])
    })

    if(!this.updateProd){
      this._router.navigate(['products'])
    }
    }
  }


  clear(){
    this.managementForm.patchValue({
             
      title:[""],
      price:[""],
      description:[""],
      category:[""],
      image:[""],
      rate:[""],
      count:[""],


    })
  }

  home(){
    
    this.updateProd={
      _id:"",
      __v:0,
      title:"",
      price:0,
      description:"",
      category:"",
      image:"",
      rating:{
        rate:0,
        count:0
       }
      
      }
      this._productServ.setProductUpdate(this.updateProd)
    this._router.navigate(['/home'])
  }

}





