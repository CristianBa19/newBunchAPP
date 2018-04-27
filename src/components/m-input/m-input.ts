import { Component, Input } from '@angular/core';

/**
 * Generated class for the MInputComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'm-input',
  templateUrl: 'm-input.html'
})
export class MInputComponent {
  
  @Input() label: string;
  @Input() field: string;  

  constructor() {
    console.log('Hello MInputComponent Component');    
  }

}
