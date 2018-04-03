import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { GetBuscarPage } from '../get-buscar/get-buscar';
/**
 * Generated class for the GetDetallePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-detalle',
  templateUrl: 'get-detalle.html',
})
export class GetDetallePage {
  subdescripcion:string;
  descripcion:string;
  url:string;
  data:string;
  marca:string;
  anio:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.subdescripcion=this.navParams.get('firstPassed').SubDescripcion;
    this.url=this.navParams.get('secondPassed');
    this.marca=this.navParams.get('thirdPassed');
    this.anio=this.navParams.get('fourthPassed');
    this.descripcion= this.navParams.get('fifthPassed');   
    this.loadDetalle(this.subdescripcion, this.url);
  }

  loadDetalle(descripcion, url){
    this.http.get(this.url+this.subdescripcion)
    .map(res=> res.json())  
    .subscribe(data=>{
      this.data = data.ListadoDetalles;
      console.log(data.ListadoDetalles);
    },err =>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetDetallePage');
  }
  itemSelected(item){
    this.url=('http://test.alimx.mx/WebService.asmx/BuscarJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.marca+'&modelo='+this.anio+'&descripcion='+this.descripcion+'&subdescripcion='+this.subdescripcion+'&detalle=');
    this.navCtrl.push(GetBuscarPage, {firstPassed: item, secondPassed: this.url, thirdPassed:this.marca, fourthPassed:this.anio, fifthPassed:this.descripcion, sixthPassed:this.subdescripcion}, {animate: true});   
  }
}
