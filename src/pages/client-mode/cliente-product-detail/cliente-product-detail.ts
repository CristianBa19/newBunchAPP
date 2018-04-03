import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AcquireProductPage } from '../../acquire-product/acquire-product';
import { ProductsPage } from '../../products/products';

@Component({
    selector: 'cliente-product-detail-page',
    templateUrl: 'cliente-product-detail.html',
})
export class ClienteProductDetailPage {
    private isAdTab = true;
    private adListOfOptions = [
        {
            mainText: localStorage.getItem("language") == "en"?"Title of the advertisement":"Título del anuncio",
            subText: localStorage.getItem("language") == "en"?"Credit card":"Tarjeta de crédito",
            haveMoreTo: true,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Custom message":"Mensaje personalizado",
            subText: localStorage.getItem("language") == "en"?"The best option to hire your card ...":"La mejor opción para contratar su tarjeta ...",
            haveMoreTo: true,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Provider":"Proveedor",
            subText: localStorage.getItem("language") == "en"?"CitiBanamex":"CitiBanamex",
            haveMoreTo: false,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Hosted by":"Alojado por",
            subText: localStorage.getItem("language") == "en"?"My Account":"Mi cuenta",
            haveMoreTo: false,
        }
    ];
    private productTopList = [
        {
            mainText: localStorage.getItem("language") == "en"?"Vertical":"Vertical",
            subText: localStorage.getItem("language") == "en"?"Car insurance":"Seguro de auto",
            haveMoreTo: false,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Product":"Producto",
            subText: localStorage.getItem("language") == "en"?"Car insurance / full coverage":"Seguro de coche / cobertura completa",
            haveMoreTo: false,
        },
    ];
    private productSuscriptionList = [
        {
            mainText: localStorage.getItem("language") == "en"?"Monthly income":"Ingreso mensual",
            subText: localStorage.getItem("language") == "en"?"$ 25,000 to $ 50,000 (MXN)":"$ 25,000 a $ 50,000 (MXN)",
            haveMoreTo: true,
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Mortgage credit":"Crédito hipotecario",
            subText: localStorage.getItem("language") == "en"?"Yes":"Sí",
            haveMoreTo: true,
        },
    ];
    private productRequirementsList =[
        {
            text:localStorage.getItem("language") == "en"?"Minimum Income Verifiable $ 10,000":"Ingreso Mínimo Verificable $ 10,000",
        },
        {
            text:localStorage.getItem("language") == "en"?"Circulation card":"Tarjeta de circulación",
        },
        {
            text:localStorage.getItem("language") == "en"?"Credit bureau":"Buró de Crédito",
        },
    ];
    private productsBenefitsList = [
        {
            text: localStorage.getItem("language") == "en"?"2 towing service":"2 servicios de remolques"
        },
    ];
    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    ionViewWillEnter(){
        document.getElementById("tab-t0-5").setAttribute("aria-selected", "true");
        if(localStorage.getItem("isFirstEnterToHomeScreeb") == "true") {
            this.navCtrl.push(ProductsPage, null, {animate: false});
        }
    }
    goToAcquireProduct(){
        this.navCtrl.push(AcquireProductPage, {prevPage:"cliProdDet"}, {animate: true});
    }
    goBack(){
        this.navCtrl.pop();
    }
}
