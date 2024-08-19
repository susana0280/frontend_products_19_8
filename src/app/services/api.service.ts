import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http=inject(HttpClient)
  private url_base:string="https://backendproducts508-production.up.railway.app/productos"

 
  constructor() { }

  
  public getProducts():Observable<IProducts[]>{
    return this._http.get<IProducts[]>(this.url_base)
  }

  public getProductById(id:string):Observable<IProducts>{

    return this._http.get<IProducts>(`${this.url_base}/${id}`)
}


public postProduct(product:IProducts):Observable<IProducts>{

  return this._http.post<IProducts>(`${this.url_base}`,product)
}


public updateProduct(id:string,product:IProducts):Observable<IProducts>{

  return this._http.put<IProducts>(`${this.url_base}/${id}`,product)
}

public deteleProduct(id:string):Observable<IProducts>{

  return this._http.delete<IProducts>(`${this.url_base}/${id}`)
}



    }

