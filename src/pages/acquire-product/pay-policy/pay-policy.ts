import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


/**
 * Generated class for the AdvertisementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'pay-policy-page',
    templateUrl: 'pay-policy.html',
})
export class PayPolicyPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    }

    goToProductsPage(){
        let data = { 'searchValue': "rtl" };
        this.viewCtrl.dismiss(data);
    }

    goBack(){
        this.navCtrl.pop();
    }
}
