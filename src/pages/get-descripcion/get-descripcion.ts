import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { GetSubDescripcionPage } from '../get-sub-descripcion/get-sub-descripcion';
/**
 * Generated class for the GetDescripcionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-descripcion',
  templateUrl: 'get-descripcion.html',
})
export class GetDescripcionPage {
  url2:string;
  data:string;
  chars:string;
  anio:string;
  marca:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.anio= this.navParams.get('firstPassed').Modelo;
    this.chars=this.navParams.get('secondPassed');
    this.marca=this.navParams.get('thirdPassed');
    this.loadDetalle(this.anio,this.chars);
  }

  loadDetalle(anio, chars){
    
    this.http.get(this.chars+'&modelo='+anio)
    .map(res=> res.json())  
    .subscribe(data=>{
      this.data = data.ListadoDescripciones;
      console.log(data.ListadoDescripciones);
    },err =>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetDescripcionPage');
  }

  itemSelected(item){
    this.url2=('http://test.alimx.mx/WebService.asmx/GetSubDescripcionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.marca+'&modelo='+this.anio+'&descripcion=');
    console.log("EN DESCRPCIONES"+this.url2);
    this.navCtrl.push(GetSubDescripcionPage, {firstPassed: item, secondPassed: this.url2, thirdPassed:this.marca, fourthPassed:this.anio}, {animate: true});   
  }
}
