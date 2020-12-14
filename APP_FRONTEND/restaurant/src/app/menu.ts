import {Component, OnInit} from '@angular/core';

export class Menu {
    _id: string;
    name : string;
    description: string;
    imageurl: string;
    price: number;
    ingredients: ingredientsList[];
    //createdate: Date;
    //modifieddate: Date;
    avg_rating: number;
}

export class ingredientsList{

    name: string;
}

export class UserLogin {
    _id : string;
    email: string;
    password: string;
}
export class UserRegister {
    _id : string;
    username : string;
    email: string;
    password: string;
}

export class UserToken {
    token : string;
}

export class Customer {
    _id : string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address : addressList[];
}
export class addressList {
    addressline1: string;
    addressline2: string;
    city: string;
    zipcode: string;
    province: string;
    country: string;
}

export class Order{
    _id: string;
    status: string;
    order_type: string;
    special_instructions: string;
    paymentType : string;
    amount: number;
    orderdate: Date;
    customer_id : string;
    email : string;
    order_details : orderList[];
}


export class orderList{
    name: string;
    quantity: number;
    Menu_item_id: string;
    imageurl : string;
}

export class Review {
    _id : string;
    reviewername: String;
    reviewcomment: String;
    menuid : String;
    rating : Number;
    reviewdate: Date;
}