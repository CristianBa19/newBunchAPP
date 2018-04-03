import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, LoadingController } from 'ionic-angular';


@Injectable()

export class AlertService {

    constructor(
        private translate: TranslateService,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
    ) {}

    showPromptTextAlert(resentPlaceHolder, massage){
        let alert = this.alertCtrl.create({
            title: massage,
            inputs: [
                {
                    name: resentPlaceHolder.name,
                    value: resentPlaceHolder.name
                },
            ],
            buttons: [
                {
                    text: 'Ok',
                    role: 'null',
                    handler: data => {
                        resentPlaceHolder.name = data[resentPlaceHolder.name];
                    }
                }
            ]
        });
        alert.onDidDismiss(()=>{
           return
        });
        alert.present();
    }
    showPromptNumberAlert(resentPlaceHolder, massage){
        let alert = this.alertCtrl.create({
            title: massage,
            inputs: [
                {
                    name: resentPlaceHolder.name,
                    value: resentPlaceHolder.name,
                    type: 'number'
                },
            ],
            buttons: [
                {
                    text: 'Ok',
                    role: 'null',
                    handler: data => {
                        resentPlaceHolder.name = data[resentPlaceHolder.name];
                    }
                }
            ]
        });
        alert.onDidDismiss(()=>{
            return
        });
        alert.present();
    }
    showRadioAlert(activeItem, list, massage){
        let alert = this.alertCtrl.create({
            title: massage,
            buttons: [
                {
                    text: 'Ok',
                    role: 'null',
                    handler: data => {
                        activeItem.name = data;
                    }
                }
            ]
        });
        for(let i = 0; i< list.length ; i++) {
            alert.addInput({
                name: list[i],
                value: list[i],
                label: list[i],
                type: 'radio',
                checked: activeItem.name == list[i]?true:false
            });
        }
        alert.onDidDismiss(()=>{
            return
        });
        alert.present();
    }
    showAlert(value, mode, modelList = [], massage){
        if(value == 'textInput'){
            this.showPromptTextAlert(mode, massage);
        }
        if(value == 'numInput'){
            this.showPromptNumberAlert(mode, massage);
        }
        if(value == 'radio'){
            this.showRadioAlert(mode, modelList, massage);
        }
    }

    showLoading(){
        let loading = this.loadingCtrl.create({
            content: localStorage.getItem("language") == "en"?'Please wait...':'Por favor espera...'
        });
        loading.present();
        setTimeout(() => {
            loading.dismiss();
        }, 1000);
    }
}
