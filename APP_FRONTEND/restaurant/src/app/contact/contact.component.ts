import { Component, OnInit } from '@angular/core';
import { Contact} from '../menu';
import { MenuService} from "../menu.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MenuService]
})
export class ContactComponent implements OnInit {

  public contactdata: Contact = {
    email: '',
    name: '',
    message: ''
  };
  form: FormGroup;
  message : string;

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      message: [null, Validators.required],
    });
  }

  public submitMessage(contactdata: Contact): void{

    if (this.form.valid) {
      console.log('form submitted');
    } else {
      Object.keys(this.form.controls).forEach(field => { 
        const control = this.form.get(field);            
        control.markAsTouched({ onlySelf: true });      
      });
    }

    this.menuService.SubmitMessage(contactdata).then((response: string)=>{
      console.log(response);
      this.message = "Your Message Has been Successfully sent to Bon Appetit!";
      this.form.reset();
     
  });
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
