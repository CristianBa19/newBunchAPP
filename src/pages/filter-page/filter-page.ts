import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'filter-page',
    templateUrl: 'filter-page.html',
})
export class FilterPage {
    private blockNumber: any = "1";

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidEnter(){
        document.getElementById("tab-t0-4").setAttribute("aria-selected","true");

    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad NotificationPage');
    }
    goPrevBlock(){
        this.blockNumber>1? this.blockNumber--: this.blockNumber=4;
    }
    goNextBlock(){
        this.blockNumber<4? this.blockNumber++: this.blockNumber=1;
    }
}
