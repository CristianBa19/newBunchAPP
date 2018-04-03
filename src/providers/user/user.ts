import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {
    firedata = firebase.database().ref('/chatusers');
    constructor(public http: Http, public afireauth: AngularFireAuth) {}

    //Checamos si el usuario ya existe (por email), esto debido
    //a que queremos poder avisarle al usuario que ya se encuentra registrado
    //y asi se evita tener que rellenar todos los datos antes de darse cuenta que ya existia    
    userAlreadyExists(email:string) {
        return new Promise(resolve => {
            this.afireauth.auth.fetchProvidersForEmail(email)
            .then(data => {
                if (data.length === 0) {
                    resolve(false); //nunca ha sido registrado (no existe)
                } else {
                    resolve(true); //ya estaba registrado (si existe)
                }                
            })
            .catch(() => {
                //En caso de error no queremos detener el flujo del sign-up
                //por lo que respondo false, en caso de que si existiera no hay problema porque
                //de todas maneras se checara al usarse el metodo adduser el cual contiene
                //createUserWithEmailAndPassword mismo que responde si el usuario ya existia con ese email                
                resolve(false);
            });
        });
    }

    getallusers() {
        var promise = new Promise((resolve, reject) => {
            this.firedata.orderByChild('uid').once('value', (snapshot) => {
                let userdata = snapshot.val();
                let temparr = [];
                for (var key in userdata) {
                    if (key != firebase.auth().currentUser.uid) {
                        temparr.push(userdata[key]);
                    }
                }
                resolve(temparr);
            }).catch((err) => {
                reject(err);
            })
        })
        return promise;
    }
    adduser(newuser) {
        var promise = new Promise((resolve, reject) => {
            console.log({newuser});
            this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
                this.afireauth.auth.currentUser.updateProfile({
                    displayName: newuser.displayName,
                    photoURL: ''
                }).then(() => {
                    this.firedata.child(this.afireauth.auth.currentUser.uid).set({
                        uid: this.afireauth.auth.currentUser.uid,
                        displayName: newuser.displayName,
                        //photoURL: 'give a dummy placeholder url here'
                    }).then(() => {
                        resolve({ success: true });
                    }).catch((err) => {                        
                        reject(err);
                    })
                }).catch((err) => {                    
                    reject(err);
                })
            }).catch((err) => {                
                reject(err);
            })
        })
        return promise;
    }

}
