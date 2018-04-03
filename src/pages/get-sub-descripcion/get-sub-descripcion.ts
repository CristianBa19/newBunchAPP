import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { GetDetallePage } from '../get-detalle/get-detalle';
/**
 * Generated class for the GetSubDescripcionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-sub-descripcion',
  templateUrl: 'get-sub-descripcion.html',
})
export class GetSubDescripcionPage {
  descripcion:string;
  url:string;
  data:string;
  marca:string;
  anio:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.descripcion= this.navParams.get('firstPassed').Descripcion;
    this.url=this.navParams.get('secondPassed');
    this.marca=this.navParams.get('thirdPassed');
    this.anio=this.navParams.get('fourthPassed');
    this.loadDetalle(this.descripcion, this.url);
  }

  loadDetalle(descripcion, url){
    this.http.get(this.url+this.descripcion)
    .map(res=> res.json())  
    .subscribe(data=>{
      this.data = data.ListadoSubDescripciones;
      console.log(data.ListadoSubDescripciones);
    },err =>{
      console.log(err);
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GetSubDescripcionPage');
  }

  itemSelected(item){
    this.url=('http://test.alimx.mx/WebService.asmx/GetDetalleJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.marca+'&modelo='+this.anio+'&descripcion='+this.descripcion+'&subdescripcion=');
    this.navCtrl.push(GetDetallePage, {firstPassed: item, secondPassed: this.url, thirdPassed:this.marca, fourthPassed:this.anio, fifthPassed:this.descripcion}, {animate: true});   
  }
}
