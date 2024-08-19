import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IProducts } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductServService } from '../../services/product-serv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{

private _api=inject(ApiService)
private _producServ=inject(ProductServService)
private _route=inject(ActivatedRoute)
private _navigate=inject(Router)
loading:boolean=true
public product?:IProducts;

ngOnInit(): void {

  this._route.params.subscribe(param=>{
    this._api.getProductById(param['id']).subscribe((data:IProducts)=>{
      this.product=data
      this.loading=false

    })
  })

  
}

update(){

  this._producServ.setProductUpdate(this.product)
  console.log(this._producServ.getProductUpdate())
  this._navigate.navigate(['management'])
}


}
