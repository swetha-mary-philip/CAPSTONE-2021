import { Component, OnInit } from '@angular/core';
import { UserLogin, UserToken, UserRegister} from '../menu';
import { MenuService} from "../menu.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MenuService]
})
export class LoginComponent implements OnInit {

  public logindata: UserLogin = {
    _id:'',
    email: '',
    password: ''
  };

  form: FormGroup;

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    
  }

  public userLogin(logindata: UserLogin): void{
    if (this.form.valid) {
      
    } else {
      Object.keys(this.form.controls).forEach(field => { 
        const control = this.form.get(field);            
        control.markAsTouched({ onlySelf: true });      
      });
    }


    var x = sessionStorage.getItem("attempt")
    if(parseInt(x)== 0){
      alert("Please contact our support team OR login after 1 hour.");
      return;
    }
    if(x == undefined)
    sessionStorage.setItem('attempt', "2");
    else
    {
    var at = parseInt(x);
    at= at-1;
    sessionStorage.setItem('attempt', at.toString());
    }


    this.menuService.userLogin(logindata);
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }
  
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
