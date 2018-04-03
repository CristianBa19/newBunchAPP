import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseService } from '/private';


/**
 * Generated class for the ChatNvoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-chat-nvo',
  templateUrl: 'chat-nvo.html',
})
export class ChatNvoPage {
  message:string='';
  username:string='';
  s;
  messages:object[]=[];

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
    this.username=this.navParams.get('username');
    this.s= db.list('/chat').valueChanges().subscribe(data => { 
      console.log(data);
      data.map (elem =>{
        this.messages=data;
        
      }) 
    });
  }

  sendMessage(){
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then(()=>{
      //message is sent
    })
  }

  ionViewDidLoad() {
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    });
    console.log('ionViewDidLoad ChatNvoPage');
  }

}
