import { Component, OnInit, Input, Type } from '@angular/core';
import { Menu, ingredientsList} from '../menu';
import { MenuService} from "../menu.service";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.css'],
  providers: [MenuService]
})


export class NewMenuComponent implements OnInit {

  constructor(private fb: FormBuilder,private foodService: MenuService) { }
  foodForm: FormGroup;

  ngOnInit(): void {


    this.foodForm = this.fb.group({
      _id: "",
      name : "",
      description: "",
      imageurl: "",
      price: "",
      avg_rating: "",
      ingredients: this.fb.array([this.fb.group({
        name: ""
      })])
    });
}

// get ingredients from foodform
get _ingredients() {
  return this.foodForm.get('ingredients') as FormArray;
}

// called when add ingredients button clicked
add_ingredients() {
  this._ingredients.push(this.fb.group({name:'', measurement: 0, unit: ""}));
}

// invoked on "remove" button click
delete_ingredients(index) {
  this._ingredients.removeAt(index);
}


public createNewFood(): void{

  // forming the json to be passed as request
  var ing=[];

  for(var i =0; i< this.foodForm.value.ingredients.length; i++ ){
    ing.push({"name": this.foodForm.value.ingredients[i].name, "measurement": this.foodForm.value.ingredients[i].measurement, "unit": this.foodForm.value.ingredients[i].unit})   
  }

  
  var data: Menu={
    "_id": this.foodForm.value._id, 
   "name": this.foodForm.value.name,
   "price" : this.foodForm.value.price,
   "description" : this.foodForm.value.description,
   "imageurl" : this.foodForm.value.imageurl,
   "ingredients" : ing,
   "avg_rating" : this.foodForm.value.avg_rating
   };

  // invoking the createfood methof in food service
  this.foodService.createFood(data);
  }

  isFieldValid(field: string) {
    return !this.foodForm.get(field).valid && this.foodForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}

