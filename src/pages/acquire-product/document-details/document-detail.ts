import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertService } from '../../../_helpers/alert.service'
import { LocalizationModel } from '../../../_helpers/localizationModel'
/**
 * Generated class for the AdvertisementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'document-detail-page',
    templateUrl: 'document-detail.html',
})
export class DocumentDetailPage {

    datePickerNames:any;
    private isEnglish = localStorage.getItem("language") == "en";
    public datePicked: string ;
    private guard           = {name:'AMEX'};
    private guardList          = ['AMEX','Premium XXX-XXX-614'];
    private typeOfCard      = {name:'Débito'};
    private typeOfCardList      = ['Débito','Débito2','Débito3','Débito4','Débito5','Débito6','Débito7','Débito8'];
    private nameOfTheCard   = {name:'Miguel Ivan Hernández'};
    private noOfTheCard     = {name:'5555555555555555'};
    private checkDigit      = {name:'345'};
    constructor(public navCtrl: NavController, public navParams: NavParams, private alertSrv: AlertService,private localizationModal: LocalizationModel) {
        this.datePickerNames = this.localizationModal.getDatesNames();
    }
    showAlert(value, mode, modelList = [], massage=""){
        this.alertSrv.showAlert(value, mode, modelList, massage);
    }

    goBack(){
        this.navCtrl.pop();
    }
}
