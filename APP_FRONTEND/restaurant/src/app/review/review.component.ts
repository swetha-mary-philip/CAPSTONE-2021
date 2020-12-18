import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router'
import { Review} from '../menu';
import { MenuService} from "../menu.service";
import { switchMap } from 'rxjs/operators';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  providers: [MenuService]
})
export class ReviewComponent implements OnInit {

  reviews: Review[];
  foodid: string;

  public reviewdata: Review = {
    _id:'',
    reviewername: '',
    reviewcomment: '',
    reviewdate : null,
    menuid : "",
    rating : null
  };

  form: FormGroup;
  message: string;

  constructor(private foodDataService: MenuService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      reviewername: [null, Validators.required],
      reviewcomment: [null, Validators.required],
      rating : [null, Validators.required],
});


    this.route.params.pipe(switchMap((params: Params) =>{   
    this.foodid = params['_id']; 
    return this.foodDataService.getFoodReviews(params['_id'])
  })
).subscribe((reviews: Review[]) =>{
  this.reviews = reviews.map(review =>
    {
    return review;
  });
  console.log(reviews);
})
  }

public reviewrecipe(reviewdata: Review): void{

    if (this.form.valid) {
      console.log('form submitted');
    } else 
    {
      console.log ("issue");
      Object.keys(this.form.controls).forEach(field => { 
        const control = this.form.get(field);            
        control.markAsTouched({ onlySelf: true });      
      });
    }

    console.log(this.foodid);

    this.reviewdata.menuid = this.foodid;
    this.foodDataService.createFoodReview(this.reviewdata, this.foodid).then((response: Review)=>{
     this.message = "Review added successfully!!";
      this.reviews.push(response);
      this.form.reset(); 
  });;

  }
counter(i: number) {
    return new Array(i);
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
