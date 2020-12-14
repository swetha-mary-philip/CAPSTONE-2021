import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Order} from '../menu';
import { MenuService} from "../menu.service";

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
  providers: [MenuService]
})
export class CustomerOrdersComponent implements OnInit {

  menuitems: Order[];
  searchstring: string;
  

  constructor(private menuService: MenuService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchstring = sessionStorage.getItem('email');
    this.menuService.GetCustomerOrders(this.searchstring)
      .then((menuitems: Order[])=>{this.menuitems = menuitems.map(menuitems =>{
        return menuitems;
      });
    });
    
}

}
