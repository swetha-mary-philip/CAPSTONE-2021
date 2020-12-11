import { Component, OnInit, AfterViewChecked, Input, Type } from '@angular/core';
import { Customer, Order} from '../menu';
import { MenuService} from "../menu.service";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

declare let paypal : any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MenuService]
})
export class CheckoutComponent implements AfterViewChecked, OnInit {

  addScript : boolean = false;
  paypalLoad : boolean = true;
  finalAmount : number;
  foodDetails : any;
  orderForm: FormGroup;

  constructor(private fb: FormBuilder,private orderService: MenuService) { }


  paypalConfig = {
    env : "sandbox",
    client : {
      sandbox : 'AUlFo-kfdg1jD6xxPkE9BHzasf_kXvmL5qVALRWT58cOKuH3sUSetvRCYlglM7J0xxlUYsfwz1US_Jmr',
      production: ''
    },
    commit : true,
    payment : (data, actions) =>{
      return actions.payment.create({
        payment : {
          transactions : [
            {amount: 
              {total:  this.finalAmount, 
                currency : 'CAD'
              }
            }
          ]
        }
      })
    },
    onAuthorize: (data, actions) =>{
      return actions.payment.execute().then((payment)=> {
        this.SaveOrder();
      })
    }
  };

  ngAfterViewChecked(): void{
    if(!this.addScript)
    {
      this.addPaypalScript().then(()=>{
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript(){
    this.addScript = true;
    return new Promise ((resolve, reject)=>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src ="https://www.paypalobjects.com/api/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  
  ngOnInit(): void {

    this.orderForm = this.fb.group({
      _id: "",
      firstname : "",
      lastname: "",
      email: "",
      phone: "",
        addressline1: "",
        addressline2: "",
        city: "",
        zipcode: "",
        province: "",
        country: "",
        special_instructions : ""
    });
   
    this.foodDetails=  JSON.parse(localStorage.getItem("cartItems"));
    this.finalAmount=  JSON.parse(localStorage.getItem("amount"));
    console.log(this.foodDetails);
  }

  public SaveOrder(): void{

  

    //forming the json to be passed as request
  var orderitems=[];
  
    for(var i =0; i< this.foodDetails.length; i++ ){
   orderitems.push({
    "name": this.foodDetails[i].itemName, 
    "quantity": this.foodDetails[i].quantity, 
    "Menu_item_id": this.foodDetails[i].item_id
    })   
    }
  
    
    var data: Customer={
      "_id": this.orderForm.value._id, 
     "firstname": this.orderForm.value.firstname,
     "lastname" : this.orderForm.value.lastname,
     "email" : this.orderForm.value.email,
     "phone" : this.orderForm.value.phone,
     "address" : [{
      "addressline1": this.orderForm.value.addressline1,
      "addressline2": this.orderForm.value.addressline2,
      "city": this.orderForm.value.city,
      "zipcode": this.orderForm.value.zipcode,
      "province": this.orderForm.value.province,
      "country": this.orderForm.value.country
     }]
     };


    //invoking the createfood methof in food service

   this.orderService.createCustomer(data)
   .then((response: Customer)=>{
     console.log(response);
    var Order: Order={
      "_id": "", 
     "status": "Ordered",
     "order_type" : "Delivery",
     "special_instructions" : this.orderForm.value.special_instructions,
     "paymentType" : "paypal",
     "amount": this.finalAmount,
     "customer_id": response._id,
     "order_details" : orderitems
     };
     this.orderService.createOrder(Order);
 });


    }

  isFieldValid(field: string) {
    return !this.orderForm.get(field).valid && this.orderForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

}
