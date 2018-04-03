import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { GetModelosPage } from '../get-modelos/get-modelos';
/**
 * Generated class for the GetMarcasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-marcas',
  templateUrl: 'get-marcas.html',
})
export class GetMarcasPage {
  url:string;
  data:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetMarcasPage');
    this.loadMarcas();
  }
  loadMarcas(){
    this.http.get('http://test.alimx.mx/WebService.asmx/GetMarcasJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017')
    .map(res=> res.json())
    .subscribe(data=>{
      this.data = data.ListadoMarcas;
    },err =>{
      console.log(err);
    });
  }
  itemSelected(item){
    this.navCtrl.push(GetModelosPage, {firstPassed: item}, {animate: true});   

  }
}
