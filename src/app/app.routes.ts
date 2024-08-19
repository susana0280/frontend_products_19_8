import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ManagementComponent } from './pages/management/management.component';
import {  SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { authGuard } from './auth.guard';
 



export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"products",component:ProductsComponent},
    {path:"products/:id",component:ProductDetailComponent},
    {path:"contact",component:ContactComponent},
    {path:"management",component:ManagementComponent, canActivate:[authGuard]},
    {path:"signUp",component:SignUpComponent},
    {path:"signIn",component:SignInComponent},
    {path:"**",redirectTo:"",pathMatch:"full"}


];
