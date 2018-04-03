import { MyApp } from './../../app/app.component';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the GetBuscarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-buscar',
  templateUrl: 'get-buscar.html',
})
export class GetBuscarPage {
  detalle:string;
  subdescripcion:string;
  descripcion:string;
  url:string;
  data:string;
  data2:string;
  marca:string;
  anio:string;
  displayPrimaTotal:any;
  displayAseguradora:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.detalle=this.navParams.get('firstPassed').Detalle;
    this.url=this.navParams.get('secondPassed');
    this.marca=this.navParams.get('thirdPassed');
    this.anio=this.navParams.get('fourthPassed');
    this.descripcion= this.navParams.get('fifthPassed'); 
    this.subdescripcion=this.navParams.get('sixthPassed').SubDescripcion;
         
    this.loadDetalle(this.subdescripcion, this.url);
  }
  
  loadCotizacion(aseguradora, clave, descripcionAseguradora, marca, anio, descripcion, subdescripcion, detalle){
    var str="";
    var strJ="";  
    var conta=0;
    
    var myJSON='{"Aseguradora":'+aseguradora+',"Cliente":{"TipoPersona":null,"Nombre":null,"ApellidoPat":null,"ApellidoMat":null,"RFC":null,"FechaNacimiento":"19/11/1988","Ocupacion":null,"CURP":null,"Direccion":{"Calle":null,"NoExt":null,"NoInt":null,"Colonia":null,"CodPostal":"04100","Poblacion":null,"Ciudad":null,"Pais":null},"Edad":28,"Genero":"Masculino","Telefono":null,"Email":null},"Vehiculo":{"Uso":"PARTICULAR","Marca":"'+marca+'","Modelo":"'+anio+'","NoMotor":"","NoSerie":"","NoPlacas":"","Descripcion":'+descripcionAseguradora+',"CodMarca":"","CodDescripcion":"","CodUso":"","Clave":'+clave+',"Servicio":"PARTICULAR"},"Coberturas":[],"Paquete":"AMPLIA","Descuento":null,"PeriodicidadDePago":0,"Cotizacion":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"CotID":null,"VerID":null,"CotIncID":null,"VerIncID":null,"Resultado":null},"Emision":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"Terminal":null,"Documento":null,"Poliza":null,"Resultado":null},"Pago":{"MedioPago":null,"NombreTarjeta":null,"Banco":null,"NoTarjeta":null,"MesExp":null,"AnioExp":null,"CodigoSeguridad":null,"NoClabe":null,"Carrier":0},"CodigoError":null,"urlRedireccion":null}';
      //console.log('este sera el url a consultar '+'http://core.alimx.mx/webservice.asmx/CotizacionEmisionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&data='+myJSON+'&movimiento=cotizacion');
      this.http.get('http://core.alimx.mx/webservice.asmx/CotizacionEmisionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&data='+myJSON+'&movimiento=cotizacion')
      .map(res2=> res2.json().Cotizacion.PrimaTotal)  
      .subscribe(data2=>{
        this.data2 = data2;
        str = JSON.stringify(this.data2);
        this.displayPrimaTotal = str.replace('"','');
        this.displayPrimaTotal = this.displayPrimaTotal.replace('"','');
        this.displayAseguradora=aseguradora;

        var node = document.createElement('ion-list');
        var textnode = document.createTextNode("se tiene a la aseguradora: "+aseguradora +"con la prima total de: "+this.displayPrimaTotal);
        node.appendChild(textnode);
        document.getElementById('myList').appendChild(node);
        console.log("esta es la response "+this.displayPrimaTotal);
      },err =>{
        console.log(err);
      });
  }

  public items:any[] = [];
  
 
  loadDetalle(descripcion, url){
    var clave="";
    var aseguradora="";
    var descripcionAseguradora="";
    var cont=0;
    //console.log("ES TE ES EL URL 0"+this.url+this.detalle);
    this.http.get(this.url+this.detalle)
    .map(res=> res.json())  
    .subscribe(data=>{
      this.data = data.Catalogo;
      //console.log(data.Catalogo);
      //console.log(data.Catalogo[0].CatDescripciones[0].clave);
      //clave = JSON.stringify(data.Catalogo[0].CatDescripciones[0].clave);
      for(let result of this.data){
        aseguradora=JSON.stringify(data.Catalogo[cont].Aseguradora);
        clave=JSON.stringify(data.Catalogo[cont].CatDescripciones[0].clave);
        descripcionAseguradora=JSON.stringify(data.Catalogo[cont].CatDescripciones[0].Descripcion);
        cont++;
        console.log("con el contador "+cont+" tenemos la aseguradora: "+aseguradora+" con la clave: "+clave+" con la descripcion: "+descripcionAseguradora);
        this.loadCotizacion(aseguradora, clave, descripcionAseguradora, this.marca, this.anio, this.descripcion, this.subdescripcion, this.detalle);
      }
    },err =>{
      console.log(err);
    });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad GetBuscarPage');
  }

}
