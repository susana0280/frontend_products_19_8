import { Injectable } from '@angular/core';
import { IProducts } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServService {

product?:IProducts 


  constructor() { }

  getProductUpdate():any{
  
    return this.product 

  }

  setProductUpdate(prod:any){
    
    this.product=prod
  }

 
}
