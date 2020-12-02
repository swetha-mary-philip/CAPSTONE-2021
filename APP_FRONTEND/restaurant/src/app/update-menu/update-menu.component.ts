import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Menu} from '../menu';
import { MenuService} from "../menu.service";
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
  providers: [MenuService]
})

export class UpdateMenuComponent implements OnInit {

  foodDetails: Menu;
  menuId: string;

  constructor(private fb: FormBuilder,private menuService: MenuService, private route: ActivatedRoute) { }
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

  this.route.params.pipe(switchMap((params: Params) =>{     
    this.menuId = params['_id'];
    return this.menuService.getSingleMenu(params['_id']) // get the details of the selected Menu
  })
).subscribe((foodDetails: Menu) =>{
  this.foodDetails = foodDetails;
  
  // code to bind existing ingredients to the form table
  for(var i=0; i< this.foodDetails[0].ingredients.length; i++){
    this.add_ingredients1(this.foodDetails[0].ingredients, i);
  }

  // workaround
  this.delete_ingredients(0); // remove extra first row
})

}


// get ingredients from foodform
get _ingredients() { 
  return this.foodForm.get('ingredients') as FormArray;
}

// called when add ingredients button clicked
add_ingredients() {
  this._ingredients.push(this.fb.group({name:''}));
}

// called on page load inside subscribe function to bind existing ingredients to the json and html
add_ingredients1(data,position) {
  
  this._ingredients.push(this.fb.group({name:data[position].name}));
}

// invoked on "remove" button click
delete_ingredients(index) {
  this._ingredients.removeAt(index);
}


// called on the submit event of the form
public updateFood(): void{

  // to form the json request with ingredients and procedures subdocument
  var ing=[];

  for(var i =0; i< this.foodForm.value.ingredients.length; i++ ){
    ing.push({"name": this.foodForm.value.ingredients[i].name})   
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

  // invoking the updatefood methof from food service
  this.menuService.updateFood(data, this.menuId);
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

  myFunc(menuid : string){
    console.log("function called" + menuid);
    return this.menuService.deleteFood(menuid)
  }

}
