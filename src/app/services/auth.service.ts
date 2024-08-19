
// import { HttpClient } from '@angular/common/http';
// import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import {IUser} from '../models/user.models'
// import { ProductServService } from './product-serv.service';
// import { IProducts } from '../models/product.model';



// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
  


//   private _http=inject(HttpClient)
//   private url_base="https://backendproducts508-production.up.railway.app/users"
                  
//   private _router=inject(Router)
//   private _productService=inject(ProductServService)
 

//   token:boolean=false
//   updateProd?:IProducts;
  

//   signUp(user:IUser):Observable<IUser>{
  
//     return this._http.post<IUser>(this.url_base+"/register",user)
//   }

// signIn(user:IUser):Observable<IUser>{
 
//   return this._http.post<IUser>(this.url_base+"/login",user)
// }


// loggedIn(): boolean {
//   // Verificar si `localStorage` está disponible
//   if (typeof localStorage==="undefined") {
   
//    this.token=true
 
//   }
//   else if(localStorage.getItem('token')){
   
//     this.token = true
   
//   }
//   else if(!localStorage.getItem('token')){

//     this.token=false
   
//   }
  
//   return this.token;
// }


//  getToken(){

//  return localStorage.getItem('token')
// }




// logout(){
//   this.updateProd={
//     _id:"",
//     __v:0,
//     title:"",
//     price:0,
//     description:"",
//     category:"",
//     image:"",
//     rating:{
//       rate:0,
//       count:0
//      }
    
//     }
//     this._productService.setProductUpdate(this.updateProd)
//   localStorage.removeItem('token')
//    this._router.navigate(['/signIn'])

// }
// }

//_______________________________________________________________________________
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.models';
import { ProductServService } from './product-serv.service';
import { IProducts } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _productService = inject(ProductServService);
  private url_base = "https://backendproducts508-production.up.railway.app/users";

  token: boolean = false;
  updateProd?: IProducts;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  signUp(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(this.url_base + "/register", user);
  }

  signIn(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(this.url_base + "/login", user);
  }

  loggedIn(): boolean {
    if (this.isBrowser && localStorage.getItem('token')) {
      this.token = true;
    } else {
      this.token = false;
    }
    return this.token;
  }

  getToken() {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null; // o cualquier valor que consideres adecuado para el entorno del servidor
  }

  logout() {
    this.updateProd = {
      _id: "",
      __v: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0
      }
    };
    this._productService.setProductUpdate(this.updateProd);
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this._router.navigate(['/signIn']);
  }
}

