import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { HomePage } from './../home/home';
import { Http, Headers } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';

@Component({
    selector: 'payment-submited-page2',
    templateUrl: 'payment-submited2.html',
})
export class PaymentSubmittedPage2 {

    private prevPage: any;
    data2: string;
    private poliza: string;
    private vehiculo: string;
    private vigencia: string;
    private primaTotal: string;
    private aseguradora: string;
    private url: string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing) {
        this.prevPage = this.navParams.get("prevPage");
    }
    // private fileTransfer: FileTransferObject = this.transfer.create();
    // goToProducts() {
    //     var trustHosts = true;
    //     var options = {};
    //     this.fileTransfer.download(this.url, 'W:\' + this.poliza).then((entry) => {
    //         console.log('download complete: ' + entry.toURL());
    //       }, (error) => {
    //         // handle error
    //       });
    //     this.navCtrl.push(HomePage, { prevPage: this.prevPage }, { animate: true });
    // }
    goBack() {
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
        var str = "";
        var strJ = "";
        var conta = 0;

        //console.log('este sera el url a consultar '+'http://core.alimx.mx/webservice.asmx/CotizacionEmisionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&data='+myJSON+'&movimiento=cotizacion');
        this.http.get('http://services.bunch.guru/WebService.asmx/getDatosPoliza?usuario=Bunch&password=BunCH2O18&poliza=' + localStorage.Poliza)
            .map(res2 => res2.json())
            .subscribe(data2 => {
                this.data2 = data2;
                str = JSON.stringify(this.data2);
                this.poliza= data2.Poliza;
                this.vehiculo= data2.auto;
                this.vigencia= data2.Vigencia;
                this.primaTotal= data2.PrimaTotal;
                this.url=  data2.url;
                this.aseguradora=localStorage.Aseguradora;
                console.log("esta es la response " + this.data2);
            }, err => {
                console.log(err);
            });
            var url= 'http://services.bunch.guru/WebService.asmx/envioCorreoCompra?email=' + localStorage.email + '&poliza='+ localStorage.Poliza +'&idvend=' + localStorage.idvend
            console.log(url);
            this.http.get('http://services.bunch.guru/WebService.asmx/envioCorreoCompra?email=' + localStorage.email + '&poliza='+ localStorage.Poliza +'&idvend=' + localStorage.idvend)
            .map(res2 => res2.json())
            .subscribe(data2 => {
                this.data2 = data2;
                console.log("esta es la response " + this.data2);
            }, err => {
                console.log(err);
            });
    }

    share(){
        this.socialSharing.share("prueba", "prueba", "", this.url).then(() => {
            // Sharing via email is possible
          }).catch(() => {
            // Sharing via email is not possible
          });
    }
    abrirPoliza(){
        window.open(encodeURI(this.url), '_system', 'location=yes'); 
    }
}
