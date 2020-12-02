import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-local-storage';



//import { AppComponent } from './app.component';
import { FrameworkComponent } from './framework/framework.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { CartComponent } from './cart/cart.component';
import { UpdateMenuComponent } from './update-menu/update-menu.component';
import { TokenInterceptService } from './token-intercept.service';
import { NewMenuComponent } from './new-menu/new-menu.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    //AppComponent,
    FrameworkComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    FieldErrorDisplayComponent,
    FilterMenuComponent,
    CartComponent,
    UpdateMenuComponent,
    NewMenuComponent,
    CheckoutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '', // the home page
        component : HomeComponent
        },
        {
          path: 'about', // the home page
          component : AboutComponent
          },
          {
            path: 'menu', // the menu page
            component : MenuComponent
            },
            {
              path: 'update/:_id', // to update menu details
              component : UpdateMenuComponent,
            },
            {
              path: 'menu/:searchstring', // the menu page
              component : MenuComponent
              },
              {
                path: 'new', // to create a new food receipe
                component : NewMenuComponent,
              },
              {
                path: 'contact', // raise an enquiry
                component : ContactComponent,
              },
              {
                path: 'checkout', // checkout
                component : CheckoutComponent,
              },
            {
              path: 'login', // login user
              component : LoginComponent,
            },
            {
              path: 'register', // register user
              component : RegisterComponent,
            },
            {
              path: 'cart', // the cart page
              component : CartComponent
              }
    ])
  ],
  providers: [{provide:APP_BASE_HREF, useValue: '/'},{
  provide: HTTP_INTERCEPTORS,
   useClass: TokenInterceptService,
   multi: true
 }
],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
