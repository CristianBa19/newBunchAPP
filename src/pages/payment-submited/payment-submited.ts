import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { HomePage } from './../home/home';

@Component({
    selector: 'payment-submited-page',
    templateUrl: 'payment-submited.html',
})
export class PaymentSubmittedPage {

    private prevPage: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.prevPage = this.navParams.get("prevPage");
    }

    goToProducts(){
       this.navCtrl.push(HomePage, {prevPage: this.prevPage}, {animate: true});
    }
    goBack(){
        this.navCtrl.pop();
    }
}
