import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdDetailPage } from './../ad-detail/ad-detail';
import { StatisticProductsPage } from './../statistics/products/statistic-products';
import { ClienteProductDetailPage } from '../client-mode/cliente-product-detail/cliente-product-detail';
import { ProductsPage } from '../products/products';


@Component({
  selector: 'page-new-advertisement',
  templateUrl: 'new-advertisement.html',
})
export class NewAdvertisementPage {

  public advModels: Array<{ id:string, img:string, paymentType: string, bank:string, accountType:string }>;
  public isClient: any;
  public pageTitle:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.advModels = [
      {id: "0", img:"assets/img/tarjeta 1.png", paymentType: "General", bank: localStorage.getItem("language") == "en"?"Product subscription will be sent":"Se enviará la suscripción del producto", accountType: ""},
      {id: "1", img:"assets/img/tarjeta 2.png", paymentType: "CitiPremier", bank: "CitBanamex", accountType: "Premium"},
      {id: "2", img:"assets/img/tarjeta 1.png", paymentType: "Black", bank: "AMEX", accountType: "Premium"},
      {id: "3", img:"assets/img/tarjeta 2.png", paymentType: "Travel Pass", bank: "CitiBanamex", accountType: "Viajera"},
      {id: "4", img:"assets/img/tarjeta 1.png", paymentType: "B·smart", bank: "CitBanamex", accountType: "Premium"},
      {id: "5", img:"assets/img/tarjeta 2.png", paymentType: "Aeromexico Premier", bank: "AMEX", accountType: "Personalizada"}
    ];
    this.isClient = localStorage.getItem("isClient");
  }
  ngOnInit(){
    this.pageTitle =  this.isClient == 'true'?localStorage.getItem("language") == "en"?"Products":"Productos":localStorage.getItem("language") == "en"?"Create an ad":"Crear un anuncio";
  }

  ionViewWillEnter(){
    if(localStorage.getItem("isFirstEnterToHomeScreeb") == "true") {
      this.navCtrl.push(ProductsPage, null, {animate: false});
    }
  }

  public pushToCreateDetail = (model) =>{
    if(this.isClient == 'true')
      this.navCtrl.push( ClienteProductDetailPage, null, {animate: true});
    else
      this.navCtrl.push( AdDetailPage, model, {animate: true});
  }
  goToStatisticsProducts(){
      this.navCtrl.push(StatisticProductsPage, null, {animate: true});
  }
  goBack(){
    this.navCtrl.pop();
  }

}
