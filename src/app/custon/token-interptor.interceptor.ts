import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterptorInterceptor: HttpInterceptorFn = (req, next) => {

let _auth=inject(AuthService)

  

  const cloneReq= req.clone({
    setHeaders: {
      Authorization: `Bearer ${_auth.getToken()}`
    }
  });



  return next(cloneReq);

};
