import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent implements OnInit {

  public  err: String;
  @Input() errorMsg: string;
  @Input() displayError: boolean;

  constructor() { }

  ngOnInit(): void {
    this.err = this.errorMsg;
  }

}
