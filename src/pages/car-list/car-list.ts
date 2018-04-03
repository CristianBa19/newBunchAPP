import { AcquireProductPage } from './../acquire-product/acquire-product';
import { TextingPage } from './../texting/texting';
import { AdvertisementPage } from './../advertisement/advertisement';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ChatNvoPage } from '../chat-nvo/chat-nvo';
import { AngularFireAuth } from 'angularfire2/auth';



/**
 * Generated class for the CarListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-car-list',
  templateUrl: 'car-list.html'
})
export class CarListPage {
    username:string='';
    pass:string='';
    mail:string='';
    pass2:string='';
    mail2:string='';

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, private angularFire: AngularFireAuth) {

  }

  showAlert(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  loginUser(){
      console.log("se creara la nueva sesión");
      if(/^[a-zA-Z-0-9]+$/.test(this.username)){
        this.navCtrl.push('ChatNvoPage', {
            username: this.username
        });
      }
      else{
          this.showAlert("error","no está bien el suername");
      }
  }
 
  registerUser(){
    this.angularFire.auth.createUserWithEmailAndPassword(this.mail, this.pass);
  }

  signUser(){
    this.angularFire.auth.signInWithEmailAndPassword(this.mail2,this.pass2)
    .then(data=>{
        console.log("esta es el email"+this.angularFire.auth.currentUser.email);
        console.log("esta es el idToken"+this.angularFire.auth.currentUser.getIdToken);
        console.log("esta es el Token"+this.angularFire.auth.currentUser.getToken);
    })
    .catch(error =>{
        console.log("error"+error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarListPage');
  }


}



