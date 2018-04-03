import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { AcquireProductPage } from '../acquire-product/acquire-product';
import { ViewChild, NgZone } from '@angular/core';
import { IonicPage, Content } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import firebase from 'firebase';
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;

  public chatBox: string;
  public type: string ="bitacora";

  public isClient: any;
  public chat = {}; 
  public mess: message;
  public conversations: Array<{ text: string, img: string, at: string, mine:boolean }>;
  private optionList:any =[];
  private containerTexts = [
    {
      mainText: localStorage.getItem("language") == "en"?"MATERIAL DAMAGE: ":"DAÑOS MATERIALES: ",
      subText: "5% V. COMERCIAL"
    },
    {
      mainText: localStorage.getItem("language") == "en"?"TOTAL THEFT: ":"ROBO TOTAL: ",
      subText: "10% V. COMERCIAL"
    },
    {
      mainText: localStorage.getItem("language") == "en"?"RC PEOPLE: ":"RC PERSONAS: ",
      subText: "3,000,000.00"
    },
    {
      mainText: localStorage.getItem("language") == "en"?"RC: ":"RC: ",
      subText: "800,000.00"
    },
    {
      mainText: localStorage.getItem("language") == "en"?"LEGAL DEFENSE: ":"DEFENSA LEGAL: ",
      subText: "AMPARADA"
    },
    {
      mainText: localStorage.getItem("language") == "en"?"MEDICAL EXPENSES: ":"GASTOS MÉDICOS: ",
      subText: "50,000.00"
    },
    {
      mainText: localStorage.getItem("language") == "en"?"ROAD OF ASSISTANCE: ":"ASISTENCIA VIAL: ",
      subText: "AMPARADA"
    },
  ];
  public optionItem = {
    nameOfProduct: "",
    subNameOfProduct: "",
    companyLogo: "",
    companyName: "",
    companySubName: "",
    itemValue: "",
    itemSubValue: "",
    containerTexts:[]
  };

  constructor(public chatservice: ChatProvider,
    public events: Events, public zone: NgZone, 
    public navCtrl: NavController, public navParams: NavParams, private _event: Events) {

    this.buddy = this.chatservice.buddy;
    //this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      //this.allmessages = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
      });
      console.log('this.allmessages', this.allmessages);
    })   

    let data = this.navParams.data;
    this.isClient = localStorage.getItem("isClient");

    this.chat = { 
      id: data.id,
      img: "assets/icon/usuario-chat-1.png",
      name: data.name,
      lastMessage: data.lastMessage,
      updated: data.updated 
    };


   this.conversations = [
     {text: "Hola, ¿por qué es necesario un seguro?", img:"assets/icon/usuario-chat-1.png", at:"01:25am", mine: false},
     {text: "Hola, ¿por qué es necesario un seguro?", img:"assets/icon/usuario-chat-2.png", at:"01:25am", mine: true},
   ]
    this.optionList = [
      {nameOfProduct:"Chevrolet Aveo 2010", subNameOfProduct:localStorage.getItem("language") == "en"?"Car insurance":"Seguro de Auto", companyLogo:"assets/icon/logo/logo-axa.png", companyName:localStorage.getItem("language") == "en"?"Wide":"Amplia", companySubName:localStorage.getItem("language") == "en"?"Coverage":"Covertura", itemValue:"$6,050", itemSubValue:"Anual", conteinerTexts:[
        {
          mainText: localStorage.getItem("language") == "en"?"MATERIAL DAMAGE: ":"DAÑOS MATERIALES: ",
          subText: "5% V. COMERCIAL"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"TOTAL THEFT: ":"ROBO TOTAL: ",
          subText: "10% V. COMERCIAL"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"RC PEOPLE: ":"RC PERSONAS: ",
          subText: "3,000,000.00"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"RC: ":"RC: ",
          subText: "800,000.00"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"LEGAL DEFENSE: ":"DEFENSA LEGAL: ",
          subText: "AMPARADA"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"MEDICAL EXPENSES: ":"GASTOS MÉDICOS: ",
          subText: "50,000.00"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"ROAD OF ASSISTANCE: ":"ASISTENCIA VIAL: ",
          subText: "AMPARADA"
        },
      ]},
      {nameOfProduct:"Nissan Tsuru 2010", subNameOfProduct:localStorage.getItem("language") == "en"?"Car insurance":"Seguro de Auto", companyLogo:"assets/icon/logo/logo-axa.png", companyName:localStorage.getItem("language") == "en"?"Wide":"Amplia", companySubName:localStorage.getItem("language") == "en"?"Coverage":"Covertura", itemValue:"$8,940", itemSubValue:"Anual", conteinerTexts:[
        {
          mainText: localStorage.getItem("language") == "en"?"MATERIAL DAMAGE: ":"DAÑOS MATERIALES: ",
          subText: "5% V. COMERCIAL"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"TOTAL THEFT: ":"ROBO TOTAL: ",
          subText: "10% V. COMERCIAL"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"RC PEOPLE: ":"RC PERSONAS: ",
          subText: "3,000,000.00"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"RC: ":"RC: ",
          subText: "800,000.00"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"LEGAL DEFENSE: ":"DEFENSA LEGAL: ",
          subText: "AMPARADA"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"MEDICAL EXPENSES: ":"GASTOS MÉDICOS: ",
          subText: "50,000.00"
        },
        {
          mainText: localStorage.getItem("language") == "en"?"ROAD OF ASSISTANCE: ":"ASISTENCIA VIAL: ",
          subText: "AMPARADA"
        },
      ]}
    ];
  }

  ionViewWillEnter(){
    this.type = "bitacora";
    this.isClient = localStorage.getItem("isClient");
  }

  goBack(){
    this.navCtrl.pop();
  }

  public send(text: string) {

    if(!text) return;
    let d = new Date();
    let date = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    let obj = {
      text,
      img:"assets/icon/usuario-chat-2.png",
      at: date,
      mine: true
    }
    console.log("data ", obj);
    this.chatBox = "";
    this.conversations.push(obj);

  }
  setType(value, obj = {}){
    this.type = value;
    value == "oportunidadesItem" ? this.setOportunidadesValue(obj) : "";
  }
  setOportunidadesValue(obj) {
    this.optionItem = {
      nameOfProduct: obj.nameOfProduct,
      subNameOfProduct: obj.subNameOfProduct,
      companyLogo: obj.companyLogo,
      companyName: obj.companyName,
      companySubName: obj.companySubName,
      itemValue: obj.itemValue,
      itemSubValue: obj.itemSubValue,
      containerTexts:obj.conteinerTexts
    }
  }
  goToAcquireProduct(){
    this.navCtrl.push(AcquireProductPage, {prevPage:"chat"}, {animate: true});
  }

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  ionViewDidLoad() {
    console.warn('ionViewDidLoad!');
    //this.allmessages.push({'sentby':'otro', 'message': 'que onda', 'timestamp': +new Date()});
    var t = this, query;
    setTimeout(function() {
      query = 'Cómo cancelo mi póliza?';
      t.allmessages.push({'sentby':'otro', 'message': query, 'timestamp': +new Date()});
      t.chatservice.getDialogFlow(query).subscribe(data => {
        t.newmessage = JSON.parse(data['_body']).result.fulfillment.messages[0].speech;          
      },err =>{
          console.error({err});
      });
    }, 10000);
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }  
}


interface message {
  img: string,
  message: string,
  time: string
}