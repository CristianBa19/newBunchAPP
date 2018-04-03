
import { ChatPage } from './../chat/chat';
import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { RequestsProvider } from '../../providers/requests/requests';

@Component({
  selector: 'page-texting',
  templateUrl: 'texting.html',
})
export class TextingPage {
    
    buddy: any;
    allmessages = [];
    myfriends;
    private prevPage: any;
    public chats: Array<{id: string, img: string, name: string, lastMessage: string, updated: string }>


    constructor(public zone: NgZone, public navCtrl: NavController, public events: Events, public requestservice: RequestsProvider, public navParams: NavParams, private _event: Events, public chatservice: ChatProvider) {        
        this.buddy = this.chatservice.buddy;
        this.chats = [
            { id: "0", img: "assets/icon/usuario-pendiente.png", name: "Miguel Hernández", lastMessage: "La anualidad 0 implica que no paga comisiones durante el año", updated: "14/06/16" },
            { id: "1", img: "assets/icon/usuario-rechazado.png", name: "Maricela Palma", lastMessage: "Ok gracias, ya tengo seguro", updated: "14/06/16" },
            { id: "2", img: "assets/icon/usuario-espera.png", name: "Daniel Benitez", lastMessage: "Hola Daniel, te recomiendo que no compres valores de mercado.", updated: "14/06/16" },
            { id: "3", img: "assets/icon/usuario-pendiente.png", name: "Eduardo Luna", lastMessage: "Prueba con el producto que te recomendé el otro día.", updated: "14/06/16" }
        ];        
        this.prevPage = this.navParams.get("prevPage");
        if (this.prevPage == "chat") {
            this._event.publish('chat:products');
        }        
        this.updateFriends();        
        this.events.subscribe('newmessage', () => {            
            this.allmessages = [];
            this.zone.run(() => {                
                this.allmessages = this.chatservice.buddymessages;
                console.log("los mensajes", this.allmessages);
            });
        });
    }

    public seeChat = (chat) => {
        this.navCtrl.push(ChatPage, chat, { animate: true });
    }

    updateFriends() {
        var cont = 0;
        this.requestservice.getmyfriends();
        this.myfriends = [];
        this.events.subscribe('friends', () => {
            this.myfriends = [];
            this.myfriends = this.requestservice.myfriends;
            console.log('this.myfriends', this.myfriends);
            
            for (let key of this.myfriends){                
                this.chats.push({
                    id: "2", 
                    img: "assets/icon/usuario-espera.png", 
                    name: this.myfriends[cont].displayName, 
                    lastMessage: "Hola Nuevo", 
                    updated: "14/06/16"
                });
                cont++;                                
                this.chatservice.initializebuddy(this.myfriends);
                this.chatservice.getbuddymessages();
            }
        });
    }

    addbuddy() {
        this.navCtrl.push('BuddiesPage');
    }

    public buddychat = (chat) => {        
        this.chatservice.initializebuddy(chat);
        this.navCtrl.push(ChatPage, chat, { animate: true });
    }
}
