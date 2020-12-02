import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Menu} from '../menu';
import { MenuService} from "../menu.service";
import { switchMap } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {

  menuitems: Menu[];
  checkoutForm;
  searchstring: string;
  

  constructor(private menuService: MenuService, private route: ActivatedRoute, private formBuilder: FormBuilder) {

    this.checkoutForm = this.formBuilder.group({
      name: ''
    });
  }

  ngOnInit(): void {
    this.menuService.getMenu()
    .then((menuitems: Menu[])=>{this.menuitems = menuitems.map(menuitems =>{
      return menuitems;
    });
  });
}

counter(i: number) {
  return new Array(i);
}

onSubmit(searchdata) {
  this.searchstring = searchdata.name;
  this.menuService.geFiltertMenu(this.searchstring)
    .then((menuitems: Menu[])=>{this.menuitems = menuitems.map(menuitems =>{
      return menuitems;
    });
  });
  
  }

  

}
