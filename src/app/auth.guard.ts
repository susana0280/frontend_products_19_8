import { CanActivateFn,CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
import { booleanAttribute, inject } from '@angular/core';
import {Router} from '@angular/router'

export const authGuard: CanActivateFn = (route, state) => {

  const _auth=inject(AuthService)
  const _router=inject(Router)

 
  if(_auth.loggedIn()){
    return true
  }
  else{
    _router.navigate(['/signIn'])
    return false
  }

 


};


