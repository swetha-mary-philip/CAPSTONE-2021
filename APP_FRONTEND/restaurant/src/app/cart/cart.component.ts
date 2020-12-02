import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Menu} from '../menu';
import { MenuService} from "../menu.service";
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MenuService]
})

export class CartComponent implements OnInit {

  foodDetails: any;

  constructor(private fb: FormBuilder,private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.foodDetails=  JSON.parse(localStorage.getItem("cartItems"));
    console.log(this.foodDetails);

}

}

