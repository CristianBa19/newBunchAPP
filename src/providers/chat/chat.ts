import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
    firebuddychats = firebase.database().ref('/buddychats');
    buddy: any;
    buddymessages = [];
    constructor(public http: Http, public events: Events) {}

    initializebuddy(buddy) {
        console.log('initializebuddy buddy', buddy);
        this.buddy = buddy;
    }

    getDialogFlow(query:string) {
        console.warn('getDialogFlow query', query);
        const headers = new Headers({'Authorization': 'Bearer b81b31ae08324c4ab9a9dcd1bdd4d2df'});//.set('Authorization', );
        return this.http.get(`https://api.dialogflow.com/v1/query?v=20170712&lang=es&query=${query}&sessionId=12345`, {headers}).map(response => response);
            //.subscribe(data2=>{
            /*.subscribe(data => {
                return JSON.parse(data['_body']).result.fulfillment.messages[0].speech;                
            },err =>{
                console.error({err});
            });*/
    }

    getbuddymessages() {
        let temp;
        let buddyUid = this.buddy.uid || this.buddy[0].uid; //antes era: this.buddy.uid
        if (buddyUid != undefined) {
            this.firebuddychats.child(firebase.auth().currentUser.uid).child(buddyUid).on('value', (snapshot) => {
                this.buddymessages = [];
                temp = snapshot.val();
                for (var tempkey in temp) {
                    this.buddymessages.push(temp[tempkey]);
                }
                this.events.publish('newmessage');
            });
        }        
    }

    addnewmessage(msg) {        
        if (this.buddy) {
            var promise = new Promise((resolve, reject) => {
                this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
                    sentby: firebase.auth().currentUser.uid,
                    message: msg,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }).then(() => {
                    this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
                        sentby: firebase.auth().currentUser.uid,
                        message: msg,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).then(() => {
                        resolve(true);
                    })
                })
            })
            return promise;
        }
    }  
}
