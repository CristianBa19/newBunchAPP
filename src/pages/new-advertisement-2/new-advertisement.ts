import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-new-advertisement-2',
  templateUrl: 'new-advertisement.html',
})
export class NewAdvertisementPage2 {

  step:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing) {    } 

  public showStep(stepIndex:number):void {        

    this.step = stepIndex;      
  }

  public share() {
    this.socialSharing.share('Message','subject', undefined, 'http://xataka.com');
  }
}
