import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AcquireProductPage } from '../acquire-product/acquire-product';
import { ProductsPage } from '../products/products';


/**
 * Generated class for the AdvertisementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'ad-detail-page',
    templateUrl: 'ad-detail.html',
})
export class AdDetailPage {
    private isAdTab = true;
    private adListOfOptions = [
        {
            mainText: localStorage.getItem("language") == "en"?"Título del anuncio":"Título del anuncio",
            subText: localStorage.getItem("language") == "en"?"Tarjeta de crédito":"Tarjeta de crédito",
            haveMoreTo: true,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Mensaje personalizado":"Mensaje personalizado",
            subText: localStorage.getItem("language") == "en"?"La mejor opción para contratar tu tarjeta...":"La mejor opción para contratar tu tarjeta ...",
            haveMoreTo: true,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Proveedor":"Proveedor",
            subText: localStorage.getItem("language") == "en"?"CitiBanamex":"CitiBanamex",
            haveMoreTo: false,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Sponsored by":"Patrocinado por",
            subText: localStorage.getItem("language") == "en"?"MisTarjetas.com":"MisTarjetas.com",
            haveMoreTo: false,
        }
    ];
    private productTopList = [
        {
            mainText: localStorage.getItem("language") == "en"?"Vertical":"Vertical",
            subText: localStorage.getItem("language") == "en"?"Car Insurance":"Seguro de auto",
            haveMoreTo: false,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Product":"Producto",
            subText: localStorage.getItem("language") == "en"?"Car Insurance / Full Coverage":"Seguro de automóvil / cobertura completa",
            haveMoreTo: false,
        },
    ];
    private productSuscriptionList = [
        {
            mainText: localStorage.getItem("language") == "en"?"Monthly Income":"Ingreso mensual",
            subText: localStorage.getItem("language") == "en"?"$25,000 a $50,000 (MXN)":"$ 25,000 a $ 50,000 (MXN)",
            haveMoreTo: true,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Mortgage Credit":"Crédito Hipotecario",
            subText: localStorage.getItem("language") == "en"?"Yes":"Sí",
            haveMoreTo: true,
        },
    ];
    private productRequirementsList =[
        {
            text:localStorage.getItem("language") == "en"?"$10,000 Minimum Verificable Income":"Ingreso Mínimo Verificable de $ 10,000",
        },
        {
            text:localStorage.getItem("language") == "en"?"Circulation card":"Tarjeta de circulación",
        },
        {
            text:localStorage.getItem("language") == "en"?"Credit Bureau":"Buró de Crédito",
        },
    ];
    private productsBenefitsList = [
        {
            text: localStorage.getItem("language") == "en"?"2 towing services":"2 servicio de remolque"
        },
    ];
    constructor(public navCtrl: NavController, public navParams: NavParams) {}
    ionViewWillEnter(){
        if(localStorage.getItem("isFirstEnterToHomeScreeb") == "true") {
            this.navCtrl.push(ProductsPage, null, {animate: false});
        }
    }
    changeTab(){
        this.isAdTab?this.isAdTab = false : this.isAdTab = true;
    }
    goToAcquireProduct(){
        this.navCtrl.push(AcquireProductPage, null, {animate: true});
    }
    goBack(){
        this.navCtrl.pop();
    }
}
