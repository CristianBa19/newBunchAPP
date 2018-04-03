import {Component, Input, ViewChild} from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-recovery',
    templateUrl: 'recovery.html'
})
export class RecoveryPage {

    @ViewChild('slides') slides: Slides;
    @ViewChild('email1') email1Input;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }    

    ionViewDidLoad() {
        //console.log('ionViewDidLoad RecoveryPage ');
        this.slides.lockSwipes(true);
        this.slides.onlyExternal = true;     
        let t = this;
        setTimeout(() => {
            t.email1Input.setFocus();
        }, 900);
    }

    public sendRequest = () => {
        if (this.slides.getActiveIndex() === 1) {
            this.doneRecovery();
        }
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext(300);
    }
    public slidePrev() {
        if (this.slides.getActiveIndex() === 0) {
            this.doneRecovery();
        }
        this.slides.lockSwipeToPrev(false);
        this.slides.slidePrev(300);
    }

    public doneRecovery = () => {
        this.navCtrl.setRoot(LoginPage, false, { animate: true });
    }

    public validarEmail = () => {
        if (this.slides.getActiveIndex() === 1) {
            this.doneRecovery();
        }
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext(300);
    }

}
