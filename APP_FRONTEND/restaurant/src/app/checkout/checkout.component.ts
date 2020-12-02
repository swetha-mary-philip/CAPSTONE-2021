import { Component, OnInit, AfterViewChecked } from '@angular/core';

declare let paypal : any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements AfterViewChecked {

  addScript : boolean = false;
  paypalLoad : boolean = true;
  finalAmount : number = 1;

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
        console.log("done");
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

  constructor() { }

  ngOnInit(): void {
  }

}
