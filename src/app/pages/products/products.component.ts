import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { IProducts } from '../../models/product.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
 

  productsList:IProducts[]=[]
  private _apiService=inject(ApiService)
  private _router=inject(Router)
 



  ngOnInit(): void {
   this._apiService.getProducts().subscribe((data:IProducts[])=>{
   
    this.productsList=data
   

    })  
  
  }


  navigate(id:String):void{
      
      this._router.navigate(['products',id])

  }

}
