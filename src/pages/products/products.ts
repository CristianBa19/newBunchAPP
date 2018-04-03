import { AcquireProductPage } from './../acquire-product/acquire-product';
import { GetMarcasPage } from './../get-marcas/get-marcas';
import { Localstorage } from './../../_helpers/localstorage.controller';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { AdvertisementPage } from './../advertisement/advertisement';
import { NewAdvertisementPage } from './../new-advertisement/new-advertisement'
import { TextingPage } from './../texting/texting'




@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  tab1Root:GetMarcasPage;
  public isClient: boolean;
  public prevPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private lStorage: Localstorage,
              public _event: Events) {
    _event.subscribe('user:client', (isClient) =>{
      this.isClient = isClient;
    });
    this.prevPage = this.navParams.get("prevPage");
  }

  ionViewDidEnter(){
    let t = document.getElementById("tab-t0-5");
    if(t!=null){
      setTimeout(()=>{
        document.getElementById("tab-t0-5").setAttribute("aria-selected", "true");
        document.getElementById("tab-t0-4").setAttribute("aria-selected", "false");
      },50);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.goGetMarcas();
  }

  public throwTopicPage(num = 1) {
    if (localStorage.getItem("isClient") == "false" && this.prevPage !== "AcqureProductsPage") {
      this.lStorage.addItemToUserForm('type', num, (res) => {
        console.log('res ', res);
        if(this.prevPage == "chat"){
          this.navCtrl.setRoot(TextingPage, null, {animate: false});
        }else {
          this.navCtrl.setRoot(AdvertisementPage, res, {animate: false});
        }
      });
    } else {
      this.navCtrl.push(NewAdvertisementPage, null, {animate: false});
      localStorage.setItem("isFirstEnterToHomeScreeb", "false");
    }     
  }
  goGetMarcas = () => {
    this.navCtrl.push(AdvertisementPage, {animate: true});
  }
 
}
