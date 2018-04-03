import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from 'ionic-angular';


@Injectable()

export class LocalizationModel {
  public language: string = 'en';
  public datePickersNames = {
      month: []
  };
  constructor(
    private translate: TranslateService,
    public alertCtrl: AlertController
  ) {

  }

  public changeLanguage(code) {
    if(code != this.language){
      console.log('valid language');
      this.language = code;
      this.saveSettingToLocalStorage(code);
      this.translate.use(this.language);
      this.datePickersNames.month = this.setDatePikerNames();
    }
  }

  public setDefaultLanguage(){
    let language = localStorage.getItem('language');
    if(!!language){
      this.translate.use(language);
      this.language = language;
    } else {
      this.translate.setDefaultLang('en');
    }
      this.datePickersNames.month = this.setDatePikerNames();
  }

  public getLanguage() {
    return this.language;
  }
  // #temporary code
  public saveSettingToLocalStorage(code){
     localStorage.setItem('language', code);
     localStorage.setItem('languageWasChousen', 'true');
  }
    showModalInfo (message: string= '', duration: number = 1000, buttons: any = []) {
        let modal = this.alertCtrl.create({
            subTitle: message
        });
        if(buttons){
            let i;
            for(i = 0; i < buttons.length; i++ ) {
                modal.addButton(buttons[i]);
            }
        };
        modal.present();

        // #custom duration
        if (duration != null) {
            setTimeout(() => {
                modal.dismiss();
            }, duration);
        }
    }
    setDatePikerNames(){
      let monthNames = this.language == "en"? [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      return monthNames;
    }
    getDatesNames(){
      return this.datePickersNames;
    }
}
