import {Component, OnInit} from '@angular/core';

export class Menu {
    _id: string;
    name : string;
    description: string;
    imageurl: string;
    price: string;
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
