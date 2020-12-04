import { Injectable, Injector } from '@angular/core';
import {HttpClient,HttpHeaders,HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

 export class TokenInterceptService implements HttpInterceptor {

   constructor(private injector: Injector) {
     
    }

   intercept(req,next){
     var x = sessionStorage.getItem("usertoken")
     console.log(req.url.indexOf('user'));

     if(req.method != "GET" && req.url.indexOf('user') == -1  && req.url.indexOf('reviews') == -1 
          && req.url.indexOf('customer') == -1 && req.url.indexOf('orders') == -1)
    {
     let tokenrequest = req.clone({
       setHeaders:{
         token: x
       }
     }) 
     console.log(tokenrequest);
    return next.handle(tokenrequest)
     }
     return next.handle(req)

   }
 }

