import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import { GetDescripcionPage } from '../get-descripcion/get-descripcion';

/**
 * Generated class for the GetModelosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-modelos',
  templateUrl: 'get-modelos.html',
})

export class GetModelosPage {
  url2:string;
  data:string;
  chars:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.chars= this.navParams.get('firstPassed').Marca;
    this.loadModelos(this.chars);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetModelosPage');
  }

  loadModelos(chars){
    this.url2=('http://test.alimx.mx/WebService.asmx/GetModelosJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+chars+'');
    this.http.get(this.url2)
    .map(res=> res.json())  
    .subscribe(data=>{
      this.data = data.ListadoDescripciones;
      console.log(data.ListadoDescripciones);
    },err =>{
      console.log(err);
    });
  }
  itemSelected(item){
    this.url2=('http://test.alimx.mx/WebService.asmx/GetDescripcionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.chars+'');
    console.log(this.url2);
    this.navCtrl.push(GetDescripcionPage, {firstPassed: item, secondPassed: this.url2, thirdPassed: this.chars}, {animate: true});   
  }
}
