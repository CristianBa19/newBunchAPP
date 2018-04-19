import { PurchasePage } from './../purchase/purchase';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ConfigAdvertisementPage } from './../config-advertisement/config-advertisement';
import { AcquireProductPage } from './../acquire-product/acquire-product';


@Component({
  selector: 'error-page',
  templateUrl: 'error.html',
})
export class errorPage {

  public type: string = "advertisement";
  public titleAdv: string = "Tarjeta de crédito";
  public customMessage: string = "La mejor opción para contratar tu tarjeta es hacerlo en un banco.";
  public provider: string ="";
  public sponsoredBy: string ="MisTarjetas.com";
  public paymentType: string ="";
  public img: string="";
  public minMonthlyIncomming: string = "N";
  public hipoLearn: string ="0"

  public callback: any = (data)=> {
    return new Promise((resolve, reject) =>{
      console.log('cb data ', data);
      this.titleAdv = data.titleAdv;
      this.customMessage = data.customMessage;
      resolve();
    });
  } 


  constructor(public navCtrl: NavController, public navParams: NavParams, private _event: Events) {
    let data = navParams.data;
    this.provider = data.bank
    this.img = data.img;
    this.paymentType = data.paymentType;
  }


  public goToHome = () => {
    this.navCtrl.push(AcquireProductPage, this.callback, { animate:true });
  }




}
